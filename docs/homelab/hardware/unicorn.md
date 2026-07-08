# 🦄 Unicorn

## Specs

- OS: Proxmox VE (kernel 7.0.6-2-pve, Debian 13 trixie)
- Host: Maiyunda M1 Mini Plus
- CPU: Intel N100 (4C/4T) @ up to 3.4 GHz
- GPU: Intel Alder Lake-N UHD Graphics (`i915`)
- Memory: 32 GiB
- Disk: 1 TB NVMe (Samsung MZVLQ1T0HBLB-00BTW)
- Hostname: Unicorn
- IP: `192.168.3.209`

## Network

| Interface | Chip         | Speed (observed) | Notes        |
| --------- | ------------ | ---------------- | ------------ |
| `nic0`    | Intel I226-V | 100 Mbps         | Primary link |
| `nic1`    | Intel I226-V | —                | Down         |
| `nic2`    | Intel I226-V | —                | Down         |
| `nic3`    | Intel I226-V | —                | Down         |

Bridges: `vmbr0`, `vmbr0.3` (server VLAN), `vmbr150`, `vmbr30`

Four 2.5GbE ports — useful for VLAN bridges, firewall VM, or Tailscale subnet router. `nic0` at 100 Mbps likely indicates cable/switch/autoneg; worth verifying on a 2.5G-capable port.

## Role

Low-power Proxmox cluster node. Suited for edge/network VMs (OPNsense, VLAN routing) and lightweight always-on services — not for LLM inference or heavy workloads.
