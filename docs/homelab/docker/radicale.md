---
title: radicale
created: 2024-01-01 16:12:12
modified: 2024-01-01 16:13:51
---
```yaml
radicale:
 <<: *common-keys-core # See EXTENSION FIELDS at the top
 # image: tomsquest/docker-radicale
 image: cryptkiddie2/radicale-infcloud
 container_name: radicale
 ports:
  - $RADICALE_PORT:5232
 init: true
 # read_only: true
 # user: $PUID:$PGID
 security_opt:
  - no-new-privileges:true
 environment:
  TZ: $TZ
  TAKE_FILE_OWNERSHIP: false
  # UID: $PUID
  # GID: $PGID
  # <<: *default-tz-puid-pgid
 cap_drop:
  - ALL
 cap_add:
  - SETUID
  - SETGID
  # - CHOWN
  - KILL
 healthcheck:
  test: curl -f http://127.0.0.1:5232 || exit 1
  interval: 30s
  retries: 3
 volumes:
  - docker-radicale-calendars:/data
  - docker-radicale-config:/config:ro
  - $DOCKERDIR/radicale/auth:/etc/radicale/users
 labels:
  - traefik.enable=true
  - traefik.http.routers.radicale-rtr.entrypoints=web
  - "traefik.http.routers.radicale-rtr.rule=Host(`radicale.$DOMAIN`)"
```
