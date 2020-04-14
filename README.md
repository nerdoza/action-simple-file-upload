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
    src: ./dist/bundle-${{ steps.check.outputs.version }}.zip
    dest: archive/${{ steps.check.outputs.version }}/bundle.zip
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

### `src`

**Required** The path to the file to upload.

### `dest`

**Required** Destination file path on FTP remote server. (can change file name)

## Copyright and License
© 2020 Zachary Cardoza under the [MIT license](LICENSE.md).