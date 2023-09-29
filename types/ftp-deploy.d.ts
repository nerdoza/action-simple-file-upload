declare module 'ftp-deploy' {
  interface FTPConfig {
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

  type DeployReport = string[][]

  interface DeploySuccess {
    type: 'success'
    report: DeployReport
  }

  interface DeployFailure {
    type: 'failure'
    error: Error
  }

  type DeployStatus = DeploySuccess | DeployFailure

  export default class FTPDeploy {
    deploy: (config: FTPConfig) => Promise<DeployStatus>
  }

  export type { FTPConfig }
}
