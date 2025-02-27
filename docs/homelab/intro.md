---
sidebar_position: 1
title: ZSLab Wiki
created: 2023-12-05 04:12:17
modified: 2025-02-26 14:28:42
---
# ZSLab Wiki

This is the homepage of my Home Lab (ZSLab). This wiki was born because I want to have a better documentation of my home lab, and to share my knowledge with others.

:::tip

Note that this wiki will never be "up to date", as I am constantly playing with new toys and changing the way I do things.

:::

## 📖 Table of Contents

- [Hardware](./hardware/intro)
- [VMs](./vm/intro)
- [Docker](./docker/intro)

## 🌟 The beginning 

It all started with "I want to backup my photos", so I bought a Synology DS920+.

## 🌐 Networking 

For hardware used, see [Hardware](./hardware/intro).

### Software 

The home network uses a soft router running [OPNsense](https://opnsense.org/) and a [Proxmox](https://www.proxmox.com/) server for virtualization. Within OPNsense, I run [AdGuard](https://adguardhome.org/) as a network filter and [Unbound](https://www.nlnetlabs.nl/projects/unbound/about/) as a DNS server. On the same machine, I run [Omada Controller](https://www.tp-link.com/us/business-networking/omada-sdn-controller/) as an SDN controller for my wired network. 

### VLANs 

VLANs are defined in OPNsense and used to separate the network into different zones.

### Intrusion Detection 

<!-- TODO: Update this -->
[Suricata](https://suricata.io/) is used to detect intrusions and anomalies.

## 🔒 Security 

### Traefik 

Traefik allows me easily access applications on the internal network through my registered domain name.

### Tailscale 

Tailscale connects all the devices in my home lab and allows me to access them from anywhere.

### Cloudflare 

Cloudflare protects my home lab from the outside world.

### OAuth 2.0

OAuth is connected to Traefik to force authentication for specific applications.


## 🤖 Automation Through Ansible 

I use Ansible to automate the setup of my home lab. They are managed on GitHub.


## 📝 Stuff to do

- [ ] Document existing network

## 🔍 Stuff to Explore

- [ ] Remove port fowarding to Traefik by using Cloudflare tunnels
      [Recommended Setup for Traefik using Cloudflare Tunnels : r/Traefik](https://www.reddit.com/r/Traefik/comments/13fjlsk/recommended_setup_for_traefik_using_cloudflare/)
 	- [ ] Enable Cloudflare Tunnel Authentication for monitoring applications
- [ ] Deploy portainer to monitor docker containers
- [ ] Add AdGuard or PiHole on Proxmox with Edge Router
- [ ] [WireGuard mesh network using OPNsense · Tailscale Docs](https://tailscale.com/kb/1097/install-opnsense) Tailscale WireGuard mesh network using OPNsense
- [ ] [Traefik Tailscale Documentation - Traefik](https://doc.traefik.io/traefik/master/https/tailscale/) Provision TLS certificates for your internal Tailscale services.
- [ ] [Exploring the Tailscale-Traefik Integration | Traefik Labs](https://traefik.io/blog/exploring-the-tailscale-traefik-proxy-integration/)
- [ ] [Recently reorganized network into VLANs : r/homelab](https://www.reddit.com/r/homelab/comments/lrq4py/comment/gonfcqo/?utm_source=share&utm_medium=web2x&context=3) look into Hashicorp tools
- [ ] Plex update list to tell users what new media there is (update notice)
- [ ] Setup Duplicity to backup Synology to OneDrive Encrypted #important
