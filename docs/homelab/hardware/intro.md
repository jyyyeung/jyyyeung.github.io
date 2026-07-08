---
title: Device List
sidebar_position: 1
---

# Device List

List of current hardware on network that includes network equipment, computer and mobile devices and configuration details.

## Computers and Mobile Devices

### Computers and Servers

| Device Name           | CPU                         | RAM    | Disk    | OS              | Hostname                |
| --------------------- | --------------------------- | ------ | ------- | --------------- | ----------------------- |
| Synology NAS          | Intel Celeron J4125 (4)     | 20 GB  | 29.1 TB | Synology DSM    | [Panda](./panda.md)     |
| Intel NUC11PAHi5      | Intel i5-1135G7 (8)         | 64 GiB | 512 GB  | Proxmox VE      | [Sparrow](./sparrow.md) |
| Minisforum MS-01      | Intel i9-12900H (20)        | 96 GiB | 2 TB    | Proxmox VE      | [Phoenix](./phoenix.md) |
| Minisforum UM890 Pro  | AMD Ryzen 9 PRO 8945HS (16) | 64 GiB | 2 TB    | Proxmox VE      | [Duck](./duck.md)       |
| Maiyunda M1 Mini Plus | Intel N100 (4)              | 32 GiB | 1 TB    | Proxmox VE      | [Unicorn](./unicorn.md) |
| NucBox M6             | AMD Ryzen 5 6600H (12)      | 64 GiB | 1 TB    | Proxmox VE      | [Bat](./bat.md)         |
| Raspberry Pi 4        | ?                           | ?      | ?       | Raspberry Pi OS | [Turtle](./turtle.md)   |
| Orange Pi ?           | ?                           | ?      | ?       | ?               | ?                       |


### Laptops

| Device Name | CPU      | RAM | Disk   | OS    | Hostname |
| ----------- | -------- | --- | ------ | ----- | -------- |
| MacBook Air | Apple M1 | 16  | 512 GB | MacOS | cannon   |
| Mac Mini    | Apple M2 | 16  | 2 TB   | MacOS | shadow   |

## Network infrastructure

Standalone Proxmox host — **not** in the zs-lab cluster. Runs OPNsense (soft router) and Omada controller.

| Device Name | CPU                 | RAM   | Disk   | OS         | Hostname                    |
| ----------- | ------------------- | ----- | ------ | ---------- | --------------------------- |
| (custom)    | Intel Celeron J4125 | 8 GiB | 128 GB | Proxmox VE | [Red Panda](./red-panda.md) |

### LAN Devices

| Device Name         | # Ports | Type              | Hostname          |
| ------------------- | ------- | ----------------- | ----------------- |
| TP-Link TL-SE2109PB | 8 + 1   | Switch (with PoE) | [Zeus](./zeus.md) |
| TP-Link TL-SG2024   | 24      | Switch            | Apollo            |

### Router Details

| Device Name | Host                    | Firewall        | DHCP |
| ----------- | ----------------------- | --------------- | ---- |
| OPNsense    | VM on [Red Panda](./red-panda.md) | Yes (OPNsense) | Yes  |

## Images

## Documentation References

- [Device List - HomeLab Documentation](https://docs.james-hackett.ie/hardware/device-list/)
