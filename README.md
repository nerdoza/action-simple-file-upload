# GitHub Action Simple File Transfer

This action performs a simple single file transfer using FTP.

## Usage
```yml
- name: Upload bundle
  uses: bayssmekanique/action-simple-file-upload@v1
  with:
    user: ${{ secrets.FTP_USER }}
    password: ${{ secrets.FTP_PASSWORD }}
    host: ${{ secrets.FTP_HOST }}
    src: dist/bundle.zip
    dest: archive/app/releaseBundle.zip
```

## Inputs

### `user`

**Required** The FTP user name. (recommended to store in Secrets)

### `password`

**Required** The FTP password. (recommended to store in Secrets)

### `host`

**Required** The hostname or IP address of the FTP server (without the `ftp://` prefix).

### `port`

**Optional** The FTP port of the server. (Default: `21`)

### `secure`

**Optional** Should use FTPS? Options are `true` to use FTPS over TLS, `false` to use unsecured FTP, and `implicit` to force the legacy implicit FTPS implementation. (Default: `false`)

### `src`

**Required** The path to the file to upload.

### `glob`

**Optional** If set to `true` will allow using a glob expression like `*.txt` in `src`, thus allowing to upload multiple files. (Default: `false`)

### `dest`

**Required** Destination path on FTP remote server. (can change file name)
If `dest` ends with a `/` a directory name is assumed and the source filename is kept.

## Copyright and License
© 2022 Zachary Cardoza under the [MIT license](LICENSE.md).
