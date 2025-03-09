---
title: Backup Linux device to Synology NAS through rsync
created: 2023-12-20 16:19:03
modified: 2024-02-03 15:26:27
tags:
- linux
- rsync
---
# NAS 

```bash
rsync -av -e "ssh -p <RSYNC_SSH_PORT>" <SOURCE_PATH> <DSM_USER>@<SYNOLOGY_IP>::<DESTINATION_PATH>
```
