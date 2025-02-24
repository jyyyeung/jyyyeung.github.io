---
title: Firewall Rules
created: 2024-01-01 09:10:15
modified: 2024-02-03 15:29:43
---

Firewall rules based on [[VLANs]]

## NAT Port Forwarding 

  

| Interface       | Proto   | Address | Ports | Address     | Ports                                                                                       | IP                                                                                      | Ports                                                                                       | Description           |
| --------------- | ------- | ------- | ----- | ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------- |
| LAN             | TCP     | *       | *     | LAN address | 80, 8443                                                                                    | *                                                                                       | *                                                                                           | Anti-Lockout Rule     |
| SERVER WAN WAN2 | TCP/UDP | *       | *     | WAN address | Plex_Ports  [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports)               | Plex_App  [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_App)               | Plex_Ports  [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports)               | NAT 32400 Plex        |
| SERVER WAN WAN2 | TCP/UDP | *       | *     | WAN address | SynologyNAS_Ports  [](https://192.168.100.1:8443/ui/firewall/alias/index/SynologyNAS_Ports) | PandaNAS  [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)               | SynologyNAS_Ports  [](https://192.168.100.1:8443/ui/firewall/alias/index/SynologyNAS_Ports) | NAT Synology NAS port |
| SERVER WAN WAN2 | TCP     | *       | *     | WAN address | 443 (HTTPS)                                                                                 | SparrowDockerVM  [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM) | 443 (HTTPS)                                                                                 | HTTPS NAT to Docker   |
| SERVER WAN WAN2 | TCP     | *       | *     | WAN address | 80 (HTTP)                                                                                   | SparrowDockerVM  [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM) | 80 (HTTP)                                                                                   | HTTP NAT to Docker    |

## Floating

| **Protocol** | **Source** | **Port** | **Destination**                                                                        | **Port**                                                                                   | \#interfaces | **Description**                                  |
| ------------ | ---------- | -------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------ | ------------------------------------------------ |
| IPv4 TCP     | *          | *        | *                                                                                      | 443 (HTTPS)                                                                                | 3            | Tailscale P2P                                    |
| IPv4 UDP     | *          | *        | PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | 41641                                                                                      | 3            | Direct WireGuard tunnels within internal network |
| IPv4 TCP/UDP | *          | *        | Plex_App [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_App)               | Plex_Ports [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports)               | 3            | NAT 32400 Plex                                   |
| IPv4 TCP     | *          | *        | SparrowDockerVM [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM) | 443 (HTTPS)                                                                                | 3            | HTTPS NAT to Docker                              |
| IPv4 TCP     | *          | *        | SparrowDockerVM [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM) | 80 (HTTP)                                                                                  | 3            | HTTP NAT to Docker                               |
| IPv4 TCP/UDP | *          | *        | PandaNAS [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)               | SynologyNAS_Ports [](https://192.168.100.1:8443/ui/firewall/alias/index/SynologyNAS_Ports) | 3            | NAT Synology NAS port                            |

## APP 
| **Protocol** | **Source** | **Port** | **Destination** | **Port**    | **Gateway** | **Schedule** | \#interfaces    | **Description** |
| ------------------ | ---------- | -------- | --------------- | ----------- | ----------- | ------------ | --- | --------------- |


## DMZ 

| **Protocol** | **Source** | **Port** | **Destination**    | **Port** | **Description**               |
| ------------ | ---------- | -------- | ------------------ | -------- | ----------------------------- |
| IPv4 TCP/UDP | DMZ net    | \*       | DMZ address        | 53 (DNS) | Allow access to DNS           |
| IPv4 \*      | DMZ net    | \*       | ! PrivateNetworks  | \*       | Allow access only to Internet |


## Guest 
| **Protocol** | **Source** | **Port** | **Destination**                                                                          | **Port** | **Gateway** | **Schedule** | **Description**                                                          |
| ------------ | ---------- | -------- | ---------------------------------------------------------------------------------------- | -------- | ----------- | ------------ | ------------------------------------------------------------------------ |
| IPv4 TCP/UDP | GUEST net  | *        | GUEST address                                                                            | 53 (DNS) | *           | *            | Allow access to DNS on the GUEST interface                               |
| IPv4 *       | GUEST net  | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *        | *           | *            | Block access to other internal networks but allow access to the Internet |

## Home

| **Protocol** | **Source**                                                           | **Port** | **Destination**                                                                          | **Port**                                                                     | **Description**                               |
| ------------ | -------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| IPv4 ICMP    | Cannon                                                               | *        | SERVER net                                                                               | *                                                                            | Allow ICMPv4 from Cannon to SERVER            |
| IPv4 TCP/UDP | HOME net                                                             | *        | LAN address                                                                              | 53 (DNS)                                                                     | Allow access to DNS                           |
| IPv4 TCP/UDP | HOME net                                                             | *        | HOME address                                                                             | 53 (DNS)                                                                     | Allow access to DNS (Need more research)      |
| IPv4 TCP/UDP | HOME net                                                             | *        | HOME address                                                                             | 5351                                                                         | Allow send to 5351                            |
| IPv4 UDP     | HOME net                                                             | *        | HOME address                                                                             | 5353                                                                         | Allow access to multicast DNS                 |
| IPv4 UDP     | HOME net                                                             | *        | HOME address                                                                             | 1900                                                                         | Allow access to UPNP                          |
| IPv4 TCP/UDP | HOME net                                                             | *        | PandaNAS [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)                 | *                                                                            | Allow HOME net to access NAS                  |
| IPv4 TCP/UDP | HOME net                                                             | *        | PVE_hosts [](https://192.168.100.1:8443/ui/firewall/alias/index/PVE_hosts)               | *                                                                            | Allow HOME net to access NUC                  |
| IPv4 TCP/UDP | HOME net                                                             | *        | SparrowDockerVM [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM)   | *                                                                            | Allow HOME net to access NUC                  |
| IPv4 TCP/UDP | HOME net                                                             | *        | Docker_IPs [](https://192.168.100.1:8443/ui/firewall/alias/index/Docker_IPs)             | Plex_Ports [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports) | Allow HOME net to Plex through Docker IP      |
| IPv4 TCP/UDP | Cannon [](https://192.168.100.1:8443/ui/firewall/alias/index/Cannon) | *        | LAN net                                                                                  | *                                                                            | Allow Cannon to access LAN                    |
| IPv4 TCP/UDP | Cannon [](https://192.168.100.1:8443/ui/firewall/alias/index/Cannon) | *        | k3s_cluster [](https://192.168.100.1:8443/ui/firewall/alias/index/k3s_cluster)           | *                                                                            | Allow Cannon to access k3s cluster            |
| IPv4 TCP/UDP | HOME net                                                             | *        | Printers [](https://192.168.100.1:8443/ui/firewall/alias/index/Printers)                 | *                                                                            | Allow HOME net to access Printers             |
| IPv4 TCP/UDP | HOME net                                                             | *        | HomeAssistant [](https://192.168.100.1:8443/ui/firewall/alias/index/HomeAssistant)       | *                                                                            | Allow HOME net to access Home Assistant       |
| IPv4 TCP/UDP | HOME net                                                             | *        | IOT net                                                                                  | *                                                                            | Allow HOME net to access IoT Devices          |
| IPv4 UDP     | HOME net                                                             | *        | 192.168.27.255                                                                           | 19967                                                                        | Allow HOME net to query Broadcast port of KTV |
| IPv4 UDP     | KTV [](https://192.168.100.1:8443/ui/firewall/alias/index/KTV)       | *        | 192.168.27.255                                                                           | 19967                                                                        | Allow HOME net to query Broadcast port of KTV |
| IPv4 UDP     | HOME net                                                             | *        | KTV [](https://192.168.100.1:8443/ui/firewall/alias/index/KTV)                           | *                                                                            | Allow HOME net to KTV                         |
| IPv4 IGMP    | HOME net                                                             | *        | multicast_addr [](https://192.168.100.1:8443/ui/firewall/alias/index/multicast_addr)     | *                                                                            | Allow HOME to multicast                       |
| IPv4 TCP/UDP | HOME net                                                             | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *                                                                            | Allow access only to internet                 |

## IoT 

| **Protocol** | **Source**                                                             | **Port** | **Destination**                                                                          | **Port**                                                                     | **Description**                               |
| ------------ | ---------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| IPv4 TCP/UDP | IOT net                                                                | *        | IOT address                                                                              | 53 (DNS)                                                                     | Allow access to DNS                           |
| IPv4 TCP/UDP | IOT net                                                                | *        | LAN address                                                                              | 53 (DNS)                                                                     | Allow access to DNS                           |
| IPv4 TCP/UDP | IOT net                                                                | *        | Plex_App [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_App)                 | Plex_Ports [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports) | Allow IOT net to Plex                         |
| IPv4 TCP/UDP | LR_LGTV [](https://192.168.100.1:8443/ui/firewall/alias/index/LR_LGTV) | *        | Docker_IPs [](https://192.168.100.1:8443/ui/firewall/alias/index/Docker_IPs)             | Plex_Ports [](https://192.168.100.1:8443/ui/firewall/alias/index/Plex_Ports) | Allow LGTV Plex through Docker IP             |
| IPv4 UDP     | LR_LGTV [](https://192.168.100.1:8443/ui/firewall/alias/index/LR_LGTV) | *        | IOT address                                                                              | 5353                                                                         | Allow TV access to multicast DNS              |
| IPv4 UDP     | IOT net                                                                | *        | multicast_addr [](https://192.168.100.1:8443/ui/firewall/alias/index/multicast_addr)     | *                                                                            | Allow IOT to multicast                        |
| IPv4 UDP     | LR_LGTV [](https://192.168.100.1:8443/ui/firewall/alias/index/LR_LGTV) | *        | HOME net                                                                                 | 30000 - 65535                                                                | Allow TV to talk to HOME for AirPlay          |
| IPv4 UDP     | KTV [](https://192.168.100.1:8443/ui/firewall/alias/index/KTV)         | *        | HOME net                                                                                 | 19967                                                                        | Allow KTV back to HOME                        |
| IPv4 UDP     | HOME net                                                               | *        | 192.168.228.255                                                                          | 19967                                                                        | Allow HOME net to query Broadcast port of KTV |
| IPv4 UDP     | KTV [](https://192.168.100.1:8443/ui/firewall/alias/index/KTV)         | *        | 192.168.228.255                                                                          | 19967                                                                        | Allow KTV to Broadcast                        |
| IPv4 *       | IOT net                                                                | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *                                                                            | Allow access only to Internet                 |

## Lab

| **Protocol** | **Source** | **Port** | **Destination**                                                                          | **Port** | **Description**               |
| ------------ | ---------- | -------- | ---------------------------------------------------------------------------------------- | -------- | ----------------------------- |
| IPv4 TCP/UDP | LAB net    | *        | LAB address                                                                              | 53 (DNS) | Allow access to DNS           |
| IPv4 *       | LAB net    | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *        | Allow access only to Internet |


## LAN 

| **Protocol** | **Source**                                                                         | **Port** | **Destination**                                                                          | **Port** | **Description**                                                          |
| ------------ | ---------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------ |
| IPv4 TCP     | 192.168.100.1                                                                      | 53 (DNS) | 192.168.100.1                                                                            | 5335     | Allow AdGuard Home DNS to query Unbound DNS                              |
| IPv4 TCP/UDP | LAN net                                                                            | *        | LAN address                                                                              | 53 (DNS) | Allow access to DNS on the LAN interface                                 |
| IPv4 ICMP    | LAN net                                                                            | *        | *                                                                                        | *        | Allow ICMPv4 from LAN to all networks                                    |
| IPv4 TCP/UDP | 192.168.100.2/24                                                                   | *        | PandaNAS [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)                 | *        | Allow Proxmox to access NAS                                              |
| IPv4 *       | LAN net                                                                            | *        | SERVER net                                                                               | *        | Allow LAN to Server                                                      |
| IPv4 TCP     | CloudflareIPs [](https://192.168.100.1:8443/ui/firewall/alias/index/CloudflareIPs) | *        | PVE_hosts [](https://192.168.100.1:8443/ui/firewall/alias/index/PVE_hosts)               | *        | Allow Cloudflare IPs to Server PVC Hosts                                 |
| IPv4 *       | LAN net                                                                            | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *        | Block access to other internal networks but allow access to the Internet |

## Loopback 

None

## Server 

| **Protocol** | **Source**                                                                             | **Port** | **Destination**                                                                          | **Port**    | **Description**                                         |
| ------------ | -------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| IPv4 TCP/UDP | SERVER net                                                                             | *        | LAN address                                                                              | 53 (DNS)    | Allow Access to DNS                                     |
| IPv4 TCP/UDP | SERVER net                                                                             | *        | SERVER address                                                                           | 53 (DNS)    | Allow Access to local DNS                               |
| IPv4 TCP/UDP | PandaNAS [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)               | *        | PVE_hosts [](https://192.168.100.1:8443/ui/firewall/alias/index/PVE_hosts)               | *           | Allow NAS Access to NUC                                 |
| IPv4 TCP/UDP | PVE_hosts [](https://192.168.100.1:8443/ui/firewall/alias/index/PVE_hosts)             | *        | PandaNAS [](https://192.168.100.1:8443/ui/firewall/alias/index/PandaNAS)                 | *           | Allow NUC Access to NAS                                 |
| IPv4 TCP/UDP | docker_swarm [](https://192.168.100.1:8443/ui/firewall/alias/index/docker_swarm)       | *        | docker_swarm [](https://192.168.100.1:8443/ui/firewall/alias/index/docker_swarm)         | *           | Allow all connections within docker swarm subnet        |
| IPv4 TCP/UDP | HomeAssistant [](https://192.168.100.1:8443/ui/firewall/alias/index/HomeAssistant)     | *        | Printers [](https://192.168.100.1:8443/ui/firewall/alias/index/Printers)                 | 631         | Allow Home Assistant to Printer IPP                     |
| IPv4 TCP/UDP | HomeAssistant [](https://192.168.100.1:8443/ui/firewall/alias/index/HomeAssistant)     | *        | IOT net                                                                                  | *           | Allow Home Assistant to IoT                             |
| IPv4 TCP/UDP | HomeAssistant [](https://192.168.100.1:8443/ui/firewall/alias/index/HomeAssistant)     | *        | LAN address                                                                              | 3000 (HBCI) | Allow Home Assistant to AdGuard Home                    |
| IPv4 TCP/UDP | HomeAssistant [](https://192.168.100.1:8443/ui/firewall/alias/index/HomeAssistant)     | *        | OmadaController [](https://192.168.100.1:8443/ui/firewall/alias/index/OmadaController)   | 8043        | Allow Home Assistant to Omada Controller                |
| IPv4 TCP/UDP | SERVER net                                                                             | *        | SparrowDockerVM [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM)   | 10051       | Allow access to Zabbix Server Port                      |
| IPv4 TCP/UDP | SparrowDockerVM [](https://192.168.100.1:8443/ui/firewall/alias/index/SparrowDockerVM) | *        | SERVER net                                                                               | 10051       | Allow Zabbix Server to Zabbix Agent Port 10051          |
| IPv4 ICMP    | SERVER net                                                                             | *        | PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks)   | *           | Allow SERVER to response to Ping within PrivateNetworks |
| IPv4 TCP/UDP | SERVER net                                                                             | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *           | Allow Access to Internet                                |

## TS 

| **Protocol** | **Source** | **Port** | **Destination**                                                                          | **Port** | **Description**                |
| ------------ | ---------- | -------- | ---------------------------------------------------------------------------------------- | -------- | ------------------------------ |
| IPv4 UDP     | TS net     | *        | TS address                                                                               | 53 (DNS) | Allow TS net to access TS DNS  |
| IPv4 UDP     | TS net     | *        | 100.104.184.104                                                                          | 53 (DNS) | Allow TS net to access TS DNS  |
| IPv4 UDP     | TS net     | *        | TS net                                                                                   | 53 (DNS) | Allow TS net to access TS DNS  |
| IPv4 UDP     | TS net     | *        | *                                                                                        | 53 (DNS) | Allow TS net to access TS DNS  |
| IPv4 UDP     | *          | *        | *                                                                                        | *        | Allow TS net to access TS any  |
| IPv4 *       | TS net     | *        | ! PrivateNetworks [](https://192.168.100.1:8443/ui/firewall/alias/index/PrivateNetworks) | *        | Allow External internet access |

## WAN 
None
## WAN2
None