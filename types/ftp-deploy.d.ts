declare module 'ftp-deploy' {
  type FTPConfig = {
    user: string
    password: string
    host: string
    port: string
    localRoot: string
    remoteRoot: string
    include: string[]
    exclude: string[]
    deleteRemote: boolean
    forcePasv: boolean
  }

  type DeployReport = Array<string[]>

  type DeploySuccess = {
    type: 'success'
    report: DeployReport
  }

  type DeployFailure = {
    type: 'failure'
    error: Error
  }

  type DeployStatus = DeploySuccess | DeployFailure

 export default class FTPDeploy {
    deploy: (config: FTPConfig) => Promise<DeployStatus> 
  }

  export { FTPConfig }
}