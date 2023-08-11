import { expect } from 'chai'
import UploadFile from '../src/ftp'

describe('Upload File', function() {
  this.timeout(10000)

  it('can upload test file using FTP', async function() {
    const config = {
      user: 'anonymous',
      password: 'password',
      host: 'speedtest.tele2.net',
      port: '21',
      secure: 'false',
      src: 'test/test.txt',
      dest: 'upload/test.txt'
    }

    await UploadFile(config)
  })

  it('does fail with nonexistent file', async function() {
    const config = {
      user: 'anonymous',
      password: 'password',
      host: 'speedtest.tele2.net',
      port: '21',
      secure: 'false',
      src: 'wrongDir/test.txt',
      dest: 'upload/test.txt'
    }

    let caughtError

    try {
      await UploadFile(config)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).to.be.an('error')
  })

  it('does fail with directory permissions failure', async function() {
    const config = {
      user: 'anonymous',
      password: 'password',
      host: 'speedtest.tele2.net',
      port: '21',
      secure: 'false',
      src: 'test/test.txt',
      dest: 'wrongDir/test.txt'
    }

    let caughtError

    try {
      await UploadFile(config)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).to.be.an('error')
  })
})
