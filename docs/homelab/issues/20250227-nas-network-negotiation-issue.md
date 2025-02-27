---
title: "NAS Network Negotiation Issue"
description: "A Synology NAS is unable to negotiate a 1000Mbps connection."
tags:
  - network
  - synology
  - issue/hardware
  - status/resolved
---

# 📡 NAS Network Negotiation Issue

## 📝 Description

- Synology NAS: [Panda](../hardware/panda.md)
- Network Switch: [Zeus](./zeus.md)

## 🔍 Symptoms

![Synology NAS Screenshot](./assets/20250227-nas-network-negotiation-issue.png)

The NAS negotiates a 100Mbps connection, but I know for a fact that it should be able to negotiate a 1000Mbps connection.

1. 1000Mbps can be achieved every time when I reconnect the network cable, but it falls back to 100Mbps after a while.
2. I tried both NAS LAN ports, and it shows the same issue.
3. I also tried a different network cable, but the issue persists, the current cable is LAN 6.

## 🔍 Investigation

### Check Switch Specs 

It is connected to the network via [Zeus](./zeus.md) Port 8. 

All other ports are able to auto-negotiate 1000Mbps. Therefore, the issue must be on the NAS side.

### Update Switch Config (Possible Solution)

I updated the switch port to stop PoE this afternoon, and reconnected the cable. The negotiation was at 1000Mbps after reconnection. I checked again at night and the negotiation is still 1000Mbps.

