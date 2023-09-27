import * as ftp from 'basic-ftp'
import { parse, posix } from 'path'
import { glob } from 'fast-glob'

export interface Options {
  user: string,
  password: string,
  host: string,
  port: string,
  secure: string,
  src: string,
  glob: string,
  dest: string,
}

async function getFiles (options: Options) {
  if (options.glob === 'true') {
    const globbedFiles = await glob(options.src)
    const files = globbedFiles.map(filename => parse(filename)).map(path => posix.join(path.dir, path.base))
    if (files.length == 0) {
      throw new Error("glob didn't match any files to upload")
    }
    return files
  } else {
    const parsedSource = parse(options.src)
    return [posix.join(parsedSource.dir, parsedSource.base)]
  }
}

export default async function(options: Options) {
  const ftpClient = new ftp.Client()
  const sources = await getFiles(options)
  const parsedDest = parse(options.dest)
  const secure = options.secure === 'true' || (options.secure === 'implicit' ? 'implicit' : false)

  await ftpClient.access({
    host: options.host,
    port: parseInt(options.port, 10),
    user: options.user,
    password: options.password,
    secure
  })

  try {
    await ftpClient.ensureDir(parsedDest.dir)
    for (const source of sources) {
      await ftpClient.uploadFrom(source, parsedDest.base)
    }

    return sources
  } finally {
    ftpClient.close()
  }
}
