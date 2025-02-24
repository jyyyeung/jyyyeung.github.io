---
title: Plex not accessible through local IP with tailscale + traefik + cloudflared
created: 2023-12-21 13:06:15
modified: 2024-02-03 15:31:08
type: error
---

```bash
tailscale set --advertise-routes=192.168.3.0/24
```

Then the server will be pingable in local network 

```bash
ping 192.168.3.204 -p 32400
```

and access is successful using local IP 
