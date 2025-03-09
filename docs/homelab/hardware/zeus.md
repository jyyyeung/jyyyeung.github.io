---
title: "Zeus"
description: "A TP-Link TL-SE2109PB switch with 8 ports and 1 SFP+ port."
tags:
  - network
  - switch
---

# Zeus

## 📝 Description

Zeus is a TP-Link TL-SE2109PB switch with 8 ports and 1 SFP+ port.

## 🔍 Specs

- 8 x 10/100/1000Mbps RJ45 ports
- 1 x SFP+ port (10Gbps)
- 1 x Console port (RS-232)
- 1 x Management port (RJ45)

## 🔍 Ports

### 10/100/1000Mbps RJ45 Ports

| Port | Description                           | Regular Negotiation  | PoE |
| ---- | ------------------------------------- | -------------------- | --- |
| 1    | Uplink to [Red Panda](./red-panda.md) | 2500Mbps Full Duplex | No  |
| 2    | Omada EAP610 (AP)                     | 1000Mbps             | Yes |
| 3    | [Apollo](./apollo)                    | 1000Mbps             | Yes |
| 4    | Room 2                                | 1000Mbps             | Yes |
| 5    | Room 3                                | 1000Mbps             | Yes |
| 6    | ?                                     | ?                    | No  |
| 7    | ?                                     | ?                    | No  |
| 8    | [Panda](./panda.md)                   | 1000Mbps Full Duplex | No  |

### SFP+ Port

| Port | Description |
| ---- | ----------- |
| 1    | SFP+        |


## 🔍 Configuration

| VLAN | VLAN Description | Member Ports | Tagged Ports | Untagged Ports |
| ---- | ---------------- | ------------ | ------------ | -------------- |
| 1    | Default          | 1-7,9        | 1-7,9        |                |
| 3    | Server           | 1,3,8        | 1,3          | 8              |
| 27   | Home             | 1-6,8        | 1-6,8        |                |
| 33   | App              | 1,3          | 1,3          |                |
| 100  | Lan              | 1,3,8        | 3,8          | 1              |
| 224  | Guest            | 1-6          | 1-6          |                |
| 228  | IoT              | 1-7          | 1-7          |                |

## 🔍 Notes

- The SFP+ port is not used for anything.
- VLAN 1 must not include port 8 because untagged port 8 is used for the uplink to the [Red Panda](./red-panda.md), which should be in VLAN 3.

# References

- [TP-Link TL-SE2109PB](https://www.tp-link.com.cn/product_2787.html)
