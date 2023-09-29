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

**Required** The path to the file(s) to upload. If `src` is a static path, a single file is uploaded. If `src` is a dynamic pattern (see (fast-glob)[https://github.com/mrmlnc/fast-glob#faq]), all matching files are uploaded relative to the base directory of the pattern.

### `dest`

**Required** Destination path on FTP remote server. If `src` is a static path, `dest` must be a full file path including the destination file name. If `src` is a dynamic pattern, `dest` must be a directory (which will be created if it does not already exist).

### `verbose`

**Optional** Enable verbose logging. (Default: `false`)

## Copyright and License
© 2022 Zachary Cardoza under the [MIT license](LICENSE.md).
