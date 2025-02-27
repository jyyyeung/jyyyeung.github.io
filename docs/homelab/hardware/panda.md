# 🐼 Panda

## Specs

- OS: Synology DSM 7.2-42642 Update 1
- CPU: Intel Celeron J4125 @ 2.00GHz
- CPU Cores: 4 
- RAM: 20 GiB

## Storage 

- Total Capacity: 29.1TB
- RAID Type: Synology Hybrid RAID (SHR) (With data protection for 1-drive fault tolerance)

| Drive ID | Vendor  | Model        | Model Number        | Type          | Size |
| -------- | ------- | ------------ | ------------------- | ------------- | ---- |
| 1        | Seagate | IronWolf Pro | ST16000NE000-2RW103 | 3.5" SATA HDD | 16TB |
| 2        | Seagate | IronWolf     | ST16000VN001-2YU101 | 3.5" SATA HDD | 16TB |
| 3        | Seagate | IronWolf     | ST8000VN004-3CP101  | 3.5" SATA HDD | 8TB  |
| 4        | Seagate | IronWolf     | ST8000VN004-3CP101  | 3.5" SATA HDD | 8TB  |


## Useful Links

- [Search Compatible Drives](https://www.synology.com/en-global/compatibility?search_by=drives&model=DS920%2B&category=hdds_no_ssd_trim)
- [Datasheet](https://global.download.synology.com/download/Document/Hardware/DataSheet/DiskStation/20-year/DS920+/cht/Synology_DS920_Plus_Data_Sheet_cht.pdf)

## Issue and Todos 

- [ ] Fix auto update failing problem
- [X] [Check Network negotiation always going from 1000Mbps to 100Mbps issue](../issues/20250227-nas-network-negotiation-issue.md)
- [ ] Verify disk failure detection and notification
