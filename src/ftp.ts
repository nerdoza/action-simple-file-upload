import FTPDeploy, { FTPConfig } from 'ftp-deploy'

export interface Options {
  user: string,
  password: string,
  host: string,
  port: string,
  file: string,
  dest: string
}

export default async function UploadFile(options: Options) {
  const ftpDeploy = new FTPDeploy()

  const config = {
      user: options.user,
      password: options.password,
      host: options.host,
      port: options.port,
      localRoot: './',
      remoteRoot: options.dest,
      exclude: ['*/**/*'],
      include: [options.file],
      deleteRemote: false,
      forcePasv: true
  } as FTPConfig

  return ftpDeploy.deploy(config)
}