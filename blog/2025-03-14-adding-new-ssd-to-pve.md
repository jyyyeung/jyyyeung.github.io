# Adding a new SSD to PVE

My Proxmox host has two SSD slots, and I have only been using one. The existing SSD has 1TB of storage, but usage is already at 80%. Thus, I decided to buy a new 2TB SSD to extend the existing lvm.

<!-- truncate -->

## Prerequisites

- A new SSD 
- Installation Tools 

## 01 Install SSD 

Installing the SSD is straightforward.
1. remove the case
2. Stick thermal (silicon) tape if provided 
	1. if you only have one, prioritise the top side with metallic sticker
3. Insert into slot and screw it into place

## 02 Setup 

**Find name (path, actually) of new disk** 

Simply click on to *Disks* in the GUI to find, or use the following

```bash
sudo fdisk -l
```

**Format the disk and create partition**
```bash
sudo cfdisk /dev/sda # replace /dev/sda with disk path
```
1. Replace `/dev/sda` with your disk path 
2. Follow the following in the TUI (use arrows and enter to navigate)
	1. New -> Primary -> Specify size in MB  
	2. Write  
	3. Quit  

**Create volume from new partition**

```bash
sudo pvcreate /dev/sda1
```

- Where `/dev/sda1` is your partition name
	- It is commonly prefixed with your disk name, so enter your disk path and press `<tab>` might work 

**Add new volume to existing LVM** 

```bash
sudo vgextend pve /dev/sda1
```

- Where `pve` is your LVM name 
	- Find in PVE GUI: *Disks* > *LVM*
- `/dev/sda1` is the new partition name

## 03 Expand storage size of VMs

I like to use the following command to expand my VMs, execute in the PVE console, not the device console. 

```bash
qm resize 100 scsi0 32G
```

![](assets/Pasted%20image%2020250314180012.png)

1. Replace `100` with the VM ID
2. Replace `scsi0` with target hard disk 
3. Replace `32G` with the target size (NOTE: not the size to expand, the final size after the expansion)

Then, from the console of the **target VM**, expand the partition to use the newly added storage space. The method varies across distributions and initialisation methods. 

- Ubuntu (setup from cloud-init): 
	- `sudo apt-get install cloud-initramfs-growroot`
	- `sudo reboot`
	- Ref: [How to increase size of an ubuntu cloud image - Super User](https://superuser.com/a/1050106)
- Ubuntu: 
	- [How to Extend the Default Ubuntu LVM Partition](https://packetpushers.net/blog/ubuntu-extend-your-default-lvm-space/)

## References 

- [Adding new disk to already created lvm-thin volume? \| Proxmox Support Forum](https://forum.proxmox.com/threads/adding-new-disk-to-already-created-lvm-thin-volume.123108/post-535648)