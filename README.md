# GitHub Action Simple File Transfer

This action performs a simple single file transfer using FTP.

## Usage
```yml
- name: Send Notification
  uses: bayssmekanique/action-simple-slack-notifier@v1
  if: always()
  with:
    token: ${{ secrets.SLACK_BOT_TOKEN }}
    status: ${{ job.status }}
    version: ${{ steps.check.outputs.version }}
    platform: Windows
```

*Output:*

![Full Example Image](.github/img/full.png)

## Copyright and License
© 2020 Zachary Cardoza under the [MIT license](LICENSE.md).