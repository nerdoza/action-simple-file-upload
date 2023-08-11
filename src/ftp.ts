import * as ftp from 'basic-ftp'
import { parse, posix } from 'path'

export interface Options {
  user: string,
  password: string,
  host: string,
  port: string,
  src: string,
  dest: string
}

export default async function UploadFile(options: Options) {
  const ftpClient = new ftp.Client()
  const parsedSource = parse(options.src)
  const composedSource = posix.join(parsedSource.dir, parsedSource.base)
  const parsedDest = parse(options.dest)

  await ftpClient.access({
    host: options.host,
    port: parseInt(options.port, 10),
    user: options.user,
    password: options.password
  })

  try {
    await ftpClient.ensureDir(parsedDest.dir)
    await ftpClient.uploadFrom(composedSource, parsedDest.base)
  } finally {
    ftpClient.close()
  }
}