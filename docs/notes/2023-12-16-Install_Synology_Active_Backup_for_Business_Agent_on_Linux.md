---
title: Install Synology Active Backup for Business Agent on Linux
created: 2023-12-16 13:37:48
modified: 2024-02-03 15:28:22
tags:
- backup
- linux
- synology
---

## Error Permission Denied 

```shell-session
root@nuc11pahi5:~# sudo ./install.run 
Verifying archive integrity...  100%   MD5 checksums are OK. All good.
Uncompressing Active Backup for Business Agent  100%  
./install.run: 1: eval: ./install.sh: Permission denied
```

Solution Found Here: [Active Backup for Business - Linux agent | Synology Community](https://community.synology.com/enu/forum/20/post/139107?reply=440637)

```bash
mkdir /root/.tmp
TMPDIR=/root/.tmp/ ./install.run
rm -rf /root/.tmp
```
