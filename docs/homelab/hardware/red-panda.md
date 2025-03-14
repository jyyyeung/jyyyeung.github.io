# 🀄 Red Panda

![Red Panda Neofetch](./assets/red-panda-neofetch.png)

## Specs

- OS: Proxmox VE
- CPU: Intel Celeron J4125 (4) @ 2.700GHz
- GPU: Intel GeminiLake [UHD Graphics 600]
- Memory: 8GiB
- Hostname: Red Panda

## Machines 

### 101 Omada LXC 

- Memory: 2048MiB
- Cores: 2
- Storage: 10GiB
- Swap: 1024MiB
- Network: bridge vmbr0 with static IP 192.168.100.4/24

### 102 Opnsense

- Memory: 8.0GiB
- Cores: 4 (1 socket, 4 cores) [x86-64-v2-AES]
- Storage: 40GiB
- Network: 
  - net0: bridge: vmbr0
  - net1: bridge: vmbr1
  - net2: bridge: vmbr2
- Backup: Configuration backed up to GitHub 

## Network Configuration

```bash
# /etc/network/interfaces
# network interface settings; autogenerated
# Please do NOT modify this file directly, unless you know what
# you're doing.
#
# If you want to manage parts of the network configuration manually,
# please utilize the 'source' or 'source-directory' directives to do
# so.
# PVE will preserve these directives, but will NOT read its network
# configuration from sourced files, so do not attempt to move any of
# the PVE managed interfaces into external files!

auto lo
iface lo inet loopback

auto enp1s0
iface enp1s0 inet manual
#Management Port

auto enp2s0
iface enp2s0 inet manual
#LAN out to switch

auto eno1
iface eno1 inet manual
#WAN IP 1 from modem

auto enp4s0
iface enp4s0 inet manual
#WAN IP 2 from modem

auto vmbr0
iface vmbr0 inet static
        address 192.168.100.2/24
        gateway 192.168.100.1
        bridge-ports enp1s0 enp2s0
        bridge-stp off
        bridge-fd 0
#Management Port + LAN

auto vmbr1
iface vmbr1 inet manual
        bridge-ports eno1
        bridge-stp off
        bridge-fd 0
#WAN Bridge for IP 1

auto vmbr2
iface vmbr2 inet manual
        bridge-ports enp4s0
        bridge-stp off
        bridge-fd 0
#WAN Bridge for IP 2

source /etc/network/interfaces.d/*
```
