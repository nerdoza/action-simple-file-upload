import * as ftp from 'basic-ftp'
import { join, parse, posix } from 'path'
import { glob, isDynamicPattern } from 'fast-glob'

export interface Options {
  user: string
  password: string
  host: string
  port: string
  secure: string
  src: string
  dest: string
  verbose: string
}

async function getFileSources (src: string) {
  return (await glob(src)).map(src => {
    const parsedSource = parse(src)
    return posix.join(parsedSource.dir, parsedSource.base)
  })
}

export default async function (options: Options) {
  const shouldBeVerbose = options.verbose === 'true'
  const srcIsDynamic = isDynamicPattern(options.src)
  const fileSources = await getFileSources(options.src)
  const ftpClient = new ftp.Client()
  const secure = options.secure === 'true' || (options.secure === 'implicit' ? 'implicit' : false)

  if (fileSources.length === 0) {
    if (!srcIsDynamic) {
      throw new Error(`No files found matching ${options.src}`)
    } else if (shouldBeVerbose) {
      console.error(`No files found matching ${options.src}`)
    }
  }

  await ftpClient.access({
    host: options.host,
    port: parseInt(options.port, 10),
    user: options.user,
    password: options.password,
    secure
  })

  const ensureDir = async (path: string) => {
    try {
      await ftpClient.ensureDir(path)
    } catch (error) {
      if (shouldBeVerbose) {
        console.error(`Could not create directory '${path}'`)
      }
      throw error
    }
  }

  try {
    for (const fileSource of fileSources) {
      const parsedFileSource = parse(fileSource)
      const parsedFileDest = parse(options.dest)
      const remoteDir = srcIsDynamic
        ? join(options.dest, parsedFileSource.dir.replace(parse(options.src).dir, ''))
        : parsedFileDest.dir

      if (shouldBeVerbose) {
        console.log(`Ensuring directory '${remoteDir}' exists`)
      }
      await ftpClient.cd('/')
      await ensureDir(remoteDir)

      const remoteFile = srcIsDynamic
        ? join(remoteDir, parsedFileSource.base)
        : join(remoteDir, parsedFileDest.base)

      if (shouldBeVerbose) {
        console.log(`Uploading '${fileSource}' to '${remoteFile}'`)
      }
      await ftpClient.uploadFrom(fileSource, remoteFile)
    }

    return fileSources
  } finally {
    ftpClient.close()
  }
}
