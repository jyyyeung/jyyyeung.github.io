# 🔥 Phoenix

## Specs

- OS: Proxmox VE 8.3.1 (kernel 6.8.12-17-pve, Debian 12 bookworm)
- Host: Minisforum MS-01
- CPU: Intel Core i9-12900H (6P+8E, 14C/20T) @ up to 5.0 GHz
- GPU: Intel Alder Lake-P integrated graphics (`i915`)
- Memory: 96 GiB
- Disk: 2 TB NVMe (Crucial CT2000P3PSSD8)
- Hostname: Phoenix
- IP: `192.168.3.207`

## Network

| Interface     | Chip             | Speed (observed) | Notes        |
| ------------- | ---------------- | ---------------- | ------------ |
| `enp2s0f0np0` | Intel X710 10GbE | —                | SFP+, down   |
| `enp2s0f1np1` | Intel X710 10GbE | —                | SFP+, down   |
| `enp87s0`     | Intel I226-V     | 1 Gbps           | Primary link |
| `enp88s0`     | Intel I226-LM    | —                | Down         |
| `wlp89s0`     | MediaTek MT7922  | —                | WiFi, down   |

Also: `tailscale0`

Bridges: `vmbr0`, `vmbr0.3` (server VLAN), `vmbr0.100`, `vmbr150`, `vmbr30`

## Role

Largest RAM Proxmox node. Primary host for stateful VMs — Postgres, Immich DB, Paperless, Influx, vector DBs. Dual 10GbE SFP+ ports available when optics/cabling are in place.
