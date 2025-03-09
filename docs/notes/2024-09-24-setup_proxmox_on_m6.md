---
title: Install Proxmox on GMK M6
tags:
- proxmox
- gmk-m6
---

## Install from Ventoy

[How to boot system from USB using GRUB](https://szymonkrajewski.pl/how-to-boot-system-from-usb-using-grub/)

## Fix installation black screen

[Quick HowTo using the Proxmox ISO on an NVIDIA GPU](https://www.reddit.com/r/Proxmox/comments/nyez25/quick_howto_using_the_proxmox_iso_on_an_nvidia_gpu/)

1. Install using Terminal mode
2. Set the `nomodeset` kernel parameter

## Connect to Proxmox via SSH

Run post installation scripts to setup Proxmox

[Proxmox VE Post Install](https://tteck.github.io/Proxmox/#proxmox-ve-post-install)

```bash
bash -c "$(wget -qLO - https://github.com/tteck/Proxmox/raw/main/misc/post-pve-install.sh)"
```

## Update network

1. Update OPNSense to allow the new IP address under the firewall rules

```bash
# /etc/hosts
127.0.0.1 localhost.localdomain localhost
192.168.3.206 bat.home.arpa bat

# The following lines are desirable for IPv6 capable hosts

::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```

```bash
# /etc/network/interfaces
auto lo
iface lo inet loopback

iface eno1 inet manual

auto vmbr0.3
iface vmbr0.3 inet static
  address 192.168.3.206/24
  gateway 192.168.3.1


auto vmbr0
iface vmbr0 inet manual
  bridge-ports eno1
  bridge-stp off
  bridge-fd 0
  bridge-vlan-aware yes
  bridge-vids 2-4094

iface enp1s0 inet manual

iface wlp3s0 inet manual

source /etc/network/interfaces.d/*
```

```bash
# /etc/resolv.conf
search sheepyy039.lan
nameserver 192.168.3.1
nameserver 192.168.100.1
nameserver 8.8.4.4
```

## Install Nvidia Drivers

> I guess that if enable GPU passthrough, the Proxmox Welcome Screen will not be shown. Therefore, network is setup before working on GPU passthrough.

- [https://www.youtube.com/watch?v=iWwdf66JpxE&t=356s](https://www.youtube.com/watch?v=iWwdf66JpxE&t=356s)
- [https://post.smzdm.com/p/aqq52rqx/](https://post.smzdm.com/p/aqq52rqx/)
- [https://forum.proxmox.com/threads/have-anyone-susscesfully-passthroughed-the-igpu-amd-radeon-680m-to-vm.119178/page-2](https://forum.proxmox.com/threads/have-anyone-susscesfully-passthroughed-the-igpu-amd-radeon-680m-to-vm.119178/page-2)

```bash
# /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on video=vesafb:off,efifb:off pcie_aces_override=downstream,multifunction nomodeset amd_iommu=on iommu=pt"
```

```bash
update-grub
reboot
```

```bash
# /etc/modprobe.d/pve-blacklist.conf
# This file contains a list of modules which are not supported by Proxmox VE

# nvidiafb see bugreport https://bugzilla.proxmox.com/show_bug.cgi?id=701
blacklist nvidiafb
#blacklist amdgpu
#blacklist i915
#blacklist snd_hda_intel
#options vfio_iommu_type1 allow_unsafe_interrupts=1
```

## Setup Proxmox Cluster

1. View Join Cluster information from existing Proxmox nodes
2. Paste the copied information to the new node
