import * as core from '@actions/core'
import UploadFile from './ftp'

async function run (): Promise<void> {
  try {
    const user = core.getInput('user')
    const password = core.getInput('password')
    const host = core.getInput('host')
    const port = core.getInput('port') || '21'
    const src = core.getInput('src')
    const dest = core.getInput('dest') || './'

    await UploadFile({user, password, host, port, src, dest})
    core.debug('Upload Successful')
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      core.error(error.message)
    } else {
      core.error('Unknown error')
    }
    process.exit(1)
  }
}

void run()
