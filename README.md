# GitHub Action Simple File Transfer

This action performs a simple single file transfer using FTP.

## Usage
```yml
- name: Upload bundle
  uses: bayssmekanique/action-simple-file-upload@v1
  with:
    user: ${{ secrets.USER }}
    password: ${{ secrets.PASSWORD }}
    host: ${{ secrets.HOST }}
    file: ./dist/bundle-${{ steps.check.outputs.version }}.zip
```

## Inputs

### `user`

**Required** The FTP user name. (recommended to store in Secrets)

### `password`

**Required** The FTP password. (recommended to store in Secrets)

### `host`

**Required** The hostname or IP address of the FTP server.

### `port`

**Optional** The FTP port of the server. (Default: `21`)

### `file`

**Required** The path to the file to upload relative to the project root.

### `dest`

**Optional** The path to the directory on the remote server to place the file. (Default: `./`)

## Copyright and License
© 2020 Zachary Cardoza under the [MIT license](LICENSE.md).