---
title: IP Ranges
created: 2025-02-15 16:22:48
modified: 2025-02-15 16:41:22
tags:
- networking
- ip-ranges
---

## VLAN 3 

- Regular VMs [192.168.3.65/28]
- Kubernetes Reserved [192.168.3.96/27]
- Kubernetes Master [192.168.3.128/27]
- Kubernetes Worker [192.168.3.160/27]
- Proxmox Hosts [192.168.3.201 +]
## VLAN 100

- Regular Management Devices (Hardware) [192.168.100.1/26]
- Other management [192.168.100.64/26]
- DHCP [192.168.100.128/25]

:::tip

For a Proxmox VM to sit on VLAN 100, you don't have to set the "VLAN Tag", because this VLAN is not tagged in switch, I think...

:::
