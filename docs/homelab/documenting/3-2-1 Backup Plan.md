---
title: 3-2-1 Backup Plan
date: 2024-01-15 15:38:14
modified: 2024-01-17 09:37:04
---
## 3 Copies of data 
> - Keeping multiple copies of your data—at least three.

- [Primary] Synology NAS 
	- Types of data (where NAS is primary storage) 
		- User Files [~1 TB]
			- [1st] OneDrive (Cloud Sync) 
			- [2nd] NAS B2 Encrypted Upload
		- Configuration Files 
			- [1st] Snapshot
				- Proxmox (9:00pm) -> NAS (where snapshots are taken)
				- 
			- [2nd] 
		- Device Backups 
			- [1st] 
			- [2nd]
		- Family Photos & Videos [~1.5 TB]
			- [1st] Blackblaze B2 [tbc] (encrypted, oneway upload) 
			- [2nd] NAS B2 Encrypted Upload
			- [3rd] Hard Disk [not updated] (offline) (oneway transfer)
		- Downloadable Media 
			- Not that important, maybe OneDrive only 
- [Primary] OneDrive 
	- [1st] Cloud Sync to Synology 
	- [2nd] NAS B2 Upload
- [Primary] Personal Devices (laptops, PC, etc.)
	- [1st]
		- Mac - Synology Active Backup for Business (hourly) -> ActiveBackupforBusiness
			- Snapshots (Daily at 5am)
		- Windows - Synology ABB / Veeam / ?
		- Linux - Rsync Cron (daily at 10pm) -> NetBackup
			- Snapshots (Daily at 5:30am)
	- [2nd] NAS B2 Encrypted Upload
- [Primary] Servers 
	- [1st] Synology ABB (daily) / rclone ? 
	- [2nd] NAS B2 Encrypted Upload
	- \* Ansible w/ GitHub?

## 2 Locations 
> - Storing copies of your data in geographically separate locations.

- Locally 
- On Cloud
## 1 Off-site 

> - Keeping at least one copy off-site for quick recoveries.

:::note

To save storage space, don't back-up data that can be redownloaded

Source: https://www.reddit.com/r/homelab/comments/1676csh/comment/jyo2ewr/?utm_source=share&utm_medium=web2x&context=3

:::

## Note 
:::note

DSM Update is at 4:30 AM

:::

## References 

- [What's the diff 3-2-1 vs 3-2-1-1-0 vs 4-3-2?](https://www.backblaze.com/blog/whats-the-diff-3-2-1-vs-3-2-1-1-0-vs-4-3-2/)
- [The 3-2-1 Backup Strategy](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/)
