import { expect } from 'chai'
import UploadFile from '../src/ftp'

const defaultConfig = {
  user: 'anonymous',
  password: 'password',
  host: 'speedtest.tele2.net',
  port: '21',
  secure: 'false',
  verbose: 'false'
}

describe('Upload File', function () {
  this.timeout(10000)

  it('can upload test file using FTP', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/test.txt',
      dest: 'upload/test.txt',
      glob: 'false'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(1)
  })

  it('does fail with nonexistent file', async function () {
    const config = {
      ...defaultConfig,
      src: 'wrongDir/test.txt',
      dest: 'upload/test.txt',
      glob: 'false'
    }

    let caughtError

    try {
      await UploadFile(config)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).to.be.an('error')
  })

  it('does fail with directory permissions failure', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/test.txt',
      dest: 'wrongDir/test.txt',
      glob: 'false'
    }

    let caughtError

    try {
      await UploadFile(config)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).to.be.an('error')
  })

  it('can upload test file using FTP with dynamic pattern matching one file', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/test.*',
      dest: 'upload',
      glob: 'true'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(1)
  })

  it('can upload test file using FTP with dynamic pattern matching multiple files', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/*.txt',
      dest: 'upload',
      glob: 'true'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(2)
  })

  it('does fail with directory permissions failure with dynamic pattern', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/test.txt',
      dest: 'wrongDir',
      glob: 'false'
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
