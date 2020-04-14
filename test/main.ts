import { expect } from 'chai'
import UploadFile from '../src/ftp'

// tslint:disable: no-unused-expression

describe('Upload File', function() {
  this.timeout(10000)

  it('can upload test file to Tele2', async function() {
    const config = {
      user: 'anonymous',
      password: 'password',
      host: 'speedtest.tele2.net',
      port: '21',
      src: 'test/test.txt',
      dest: 'upload/test.txt'
    }

    const result = await UploadFile(config)
    expect(result).to.exist
  })

})
