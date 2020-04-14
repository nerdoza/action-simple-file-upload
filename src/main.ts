import * as core from '@actions/core'
import UploadFile from './ftp'

async function run (): Promise < void > {
  try {
    const user = core.getInput('user')
    const password = core.getInput('password')
    const host = core.getInput('host')
    const port = core.getInput('port') || '21'
    const file = core.getInput('file')
    const dest = core.getInput('dest') || './'


    const result = await UploadFile({user, password, host, port, file, dest})
    if (result.type === 'failure') {
      throw result
    }

    console.log(result)
    core.debug('Upload Successful')
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
    process.exit(1)
  }
}

void run()
