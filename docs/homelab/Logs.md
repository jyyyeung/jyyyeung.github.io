---
tags: [proxmox]
title: Logs
created: 2024-02-03 15:39:22
modified: 2024-02-03 15:45:06
---

## 03 Feb 2024

When moving Plex directory from NFS to local, using `rsync` is faster than `cp` and allows easy `--exclude` directory. 
The command I used: 
```bash 

```

---
When resizing #proxmox VM disk size, after increasing the disk size from the proxmox GUI, one can boot into the Ubuntu Desktop Live iso and use `gparted` to easily increase the size of the partition. 

---
- [ ] #task Backup method for Plex local config directory to Synology NAS 
- [ ] #task Move Plex to Turtle, integrated with Ansible 
- [ ] #task Look into Terraform #new 
- [ ] #task Fix Plex Remote Access Speed #fix 