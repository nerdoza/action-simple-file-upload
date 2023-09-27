import { expect } from 'chai'
import UploadFile from '../src/ftp'
import assert from 'node:assert'

const username = 'anonymous'
const password = 'password'
const host = 'speedtest.tele2.net'

describe('Upload File', function() {
  this.timeout(10000)

  it('can upload test file using FTP', async function() {
    const config = {
      user: username,
      password: password,
      host: host,
      port: '21',
      secure: 'false',
      src: 'test/test.txt',
      dest: 'upload/test.txt',
      glob: 'false',
    }

    const sources = await UploadFile(config)
    assert.equal(sources.length, 1)
  })

  it('does fail with nonexistent file', async function() {
    const config = {
      user: username,
      password: password,
      host: host,
      secure: 'false',
      src: 'wrongDir/test.txt',
      dest: 'upload/test.txt',
      glob: 'false',
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
      user: username,
      password: password,
      host: host,
      port: '21',
      secure: 'false',
      src: 'test/test.txt',
      dest: 'wrongDir/test.txt',
      glob: 'false',
    }

    let caughtError

    try {
      await UploadFile(config)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).to.be.an('error')
  })

  it('can upload test file using FTP and glob (one file)', async function() {
    const config = {
      user: username,
      password: password,
      host: host,
      port: '21',
      secure: 'false',
      src: 'test/*.txt',
      dest: 'upload/test.txt',
      glob: 'true',
    }

    const sources = await UploadFile(config)
    assert.equal(sources.length, 1)
  })

  it('can upload test file using FTP and glob (multiple files)', async function() {
    const config = {
      user: username,
      password: password,
      host: host,
      port: '21',
      secure: 'false',
      src: 'test/*',
      dest: 'upload/',
      glob: 'true',
    }

    const sources = await UploadFile(config)
    assert.equal(sources.length, 2)
  })
})
