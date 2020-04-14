import { expect } from 'chai'
import UploadFile from '../src/ftp'

// tslint:disable: no-unused-expression

describe('Upload', function() {
  this.timeout(10000)

  it('can upload test file Tele2', async function() {
    const config = {
      user: 'anonymous',
      password: 'password',
      host: 'speedtest.tele2.net',
      port: '21',
      file: 'test.txt',
      dest: 'upload'
    }

    const result = await UploadFile(config)
    expect(result).to.exist
  })

  it('can upload test file tp Rebex', async function() {
    const config = {
      user: 'demo',
      password: 'password',
      host: 'test.rebex.net',
      port: '21',
      file: './test.txt',
      dest: ''
    }

    const result = await UploadFile(config)
    expect(result).to.exist
  })

})
