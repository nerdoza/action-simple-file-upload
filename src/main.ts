import * as core from '@actions/core'
import uploadFile from './ftp'

async function run (): Promise<void> {
  try {
    const user = core.getInput('user')
    const password = core.getInput('password')
    const host = core.getInput('host')
    const port = core.getInput('port') || '21'
    const secure = core.getInput('secure') || 'false'
    const src = core.getInput('src')
    const dest = core.getInput('dest') || './'

    await uploadFile({user, password, host, port, secure, src, dest})
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
