# 🦆 Duck

## Specs

- OS: Proxmox VE (kernel 7.0.6-2-pve, Debian 13 trixie)
- Host: Minisforum UM890 Pro
- CPU: AMD Ryzen 9 PRO 8945HS (8C/16T) @ up to 5.26 GHz
- GPU: AMD Radeon 780M (RDNA 3, Phoenix3, `amdgpu`)
- Memory: 64 GiB
- Disk: 2 TB NVMe (Crucial CT2000E100SSD8)
- Hostname: Duck
- IP: `192.168.3.208`

## Network

| Interface | Chip            | Speed (observed) | Notes        |
| --------- | --------------- | ---------------- | ------------ |
| `nic0`    | Realtek RTL8125 | 1 Gbps           | Primary link |
| `nic1`    | Realtek RTL8125 | —                | Down         |
| `wlp4s0`  | MediaTek MT7922 | —                | WiFi, down   |

Bridges: `vmbr0`, `vmbr0.3` (server VLAN), `vmbr150`, `vmbr30`

## Role

Proxmox cluster node. Strongest Linux-side GPU in the fleet (780M) — candidate for ROCm/Ollama inference, GPU transcode, and heavier VM workloads. Prefer this host over **sparrow** for new 2 TB VM disks.
