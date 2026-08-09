# Homepage

ZSLab runs two [gethomepage](https://gethomepage.dev) instances:

| Surface | URL | Auth |
|---------|-----|------|
| User catalog | `https://sheepyy039.xyz` | Authentik group `household` (+ `admins`) |
| Admin cockpit | `https://admin.home.sheepyy039.xyz` | Authentik group `admins` |

Config lives in `ansible-homelab`:

- `roles/docker/files/homepage/`
- `roles/docker/files/homepage-admin/`

Design: `docs/superpowers/specs/2026-08-09-homepage-dual-dashboard-design.md` in the ansible repo.

Alerts stay in Grafana; admin Homepage only deep-links there.
