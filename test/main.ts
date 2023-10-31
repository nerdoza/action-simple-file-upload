import { expect } from 'chai'
import UploadFile from '../src/ftp'

const TEST_ALLOWS_MKDIR = false

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
      src: 'test/fixtures/index.html',
      dest: 'upload/index.html'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(1)
  })

  it('can upload renamed test file using FTP', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/fixtures/index.html',
      dest: 'upload/root.html'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(1)
  })

  it('does fail with nonexistent file', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/fixtures/secrets.txt',
      dest: 'upload/secrets.txt'
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
      src: 'test/fixtures/index.html',
      dest: 'wrongDir/index.html'
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
      src: 'test/fixtures/index.*',
      dest: 'upload'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(1)
  })

  it('can upload test file using FTP with dynamic pattern matching multiple files', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/fixtures/*',
      dest: 'upload'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(4)
  })

  it('can upload test file using FTP with dynamic pattern matching multiple files using recursive pattern', async function () {
    if (!TEST_ALLOWS_MKDIR) {
      this.skip() // If directory creation is not allowed, skip this test
    }

    const config = {
      ...defaultConfig,
      src: 'test/fixtures/**/*',
      dest: 'upload'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(3)
  })

  it('can upload test file using FTP with dynamic pattern matching multiple files using bracket', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/fixtures/*.{txt,png}',
      dest: 'upload'
    }

    const uploadedFiles = await UploadFile(config)
    expect(uploadedFiles).to.be.an('array')
    expect(uploadedFiles).to.have.lengthOf(2)
  })

  it('does fail with directory permissions failure with dynamic pattern', async function () {
    const config = {
      ...defaultConfig,
      src: 'test/test.txt',
      dest: 'wrongDir'
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
