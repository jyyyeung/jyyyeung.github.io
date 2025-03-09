---
title: Setting up AdventureLog
created: 2025-02-26 14:32:03
modified: 2025-02-26 14:32:03
tags:
- adventurelog
- docker
- traefik
---

I decided to setup [AdventureLog](../homelab/apps/AdventureLog.md) on my homelab server, using docker compose with swarm, and exposing with traefik. 

## Error between server and web communication 

### Error

```log
TypeError: fetch failed
    at node:internal/deps/undici/undici:12625:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: Error: connect ECONNREFUSED 10.0.3.71:8000
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16) {
    errno: -111,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '10.0.3.71',
    port: 8000
  }
}
```

### Solution

Set `hostname` in the server container, and reference it in the `PUBLIC_SERVER_URL` environment variable in the web container.

```yaml
services:
  web:
    environment:
      PUBLIC_SERVER_URL: http://adventurelog-server:8000
  # ...

  server:
    hostname: adventurelog-server
  # ...
```

## Final docker compose file

```yaml
# docker-compose.yaml
---
services:
  web:
    image: ghcr.io/seanmorley15/adventurelog-frontend:latest
    restart: unless-stopped
    environment:
      PUBLIC_SERVER_URL: http://adventurelog-server:8000 # Should be the service name of the backend with port 8000, even if you change the port in the backend service
      BODY_SIZE_LIMIT: 100000
    depends_on:
      - adventurelog_server
    networks:
      - t3_proxy
      - adventurelog_network
    deploy:
      placement:
        constraints:
          - node.role == manager
      labels:
        traefik.enable: "true"
        traefik.http.routers.adventurelog-web.rule: Host(`adventurelog.${DOMAIN}`) && !(PathPrefix(`/media`) || PathPrefix(`/admin`) || PathPrefix(`/static`) || PathPrefix(`/accounts`))
        traefik.http.routers.adventurelog-web.entrypoints: websecure
        traefik.http.routers.adventurelog-web.service: adventurelog-web
        traefik.http.services.adventurelog-web.loadbalancer.server.port: 3000

  db:
    image: postgis/postgis:15-3.3
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${ADVENTURELOG_DB_NAME}
      POSTGRES_USER: ${ADVENTURELOG_DB_USER}
      POSTGRES_PASSWORD: ${ADVENTURELOG_DB_PASSWORD}
    volumes:
      - $LOCALDIR/adventurelog/db:/var/lib/postgresql/data/
    deploy:
      placement:
        constraints:
          - node.role == manager
    networks:
      - adventurelog_network

  server:
    hostname: adventurelog-server
    image: ghcr.io/seanmorley15/adventurelog-backend:latest
    restart: unless-stopped
    environment:
      PGHOST: adventurelog_db
      PGDATABASE: ${ADVENTURELOG_DB_NAME}
      PGUSER: ${ADVENTURELOG_DB_USER}
      PGPASSWORD: ${ADVENTURELOG_DB_PASSWORD}
      SECRET_KEY: ${ADVENTURELOG_SECRET_KEY}
      DJANGO_ADMIN_USERNAME: admin
      DJANGO_ADMIN_PASSWORD: ${ADVENTURELOG_ADMIN_PASSWORD}
      DJANGO_ADMIN_EMAIL: ${ADVENTURELOG_ADMIN_EMAIL}
      PUBLIC_URL: https://adventurelog.${DOMAIN} # Match the outward port, used for the creation of image urls
      CSRF_TRUSTED_ORIGINS: https://adventurelog.${DOMAIN} # Comma separated list of trusted origins for CSRF
      DEBUG: "False"
      FRONTEND_URL: https://adventurelog.${DOMAIN} # Used for email generation. This should be the url of the frontend
    networks:
      - t3_proxy
      - adventurelog_network
    depends_on:
      - adventurelog_db
    volumes:
      - $LOCALDIR/adventurelog/media:/code/media/
    deploy:
      placement:
        constraints:
          - node.role == manager
      labels:
        traefik.enable: "true"
        traefik.http.routers.adventurelog-server.entrypoints: websecure
        traefik.http.routers.adventurelog-server.rule: Host(`adventurelog.${DOMAIN}`) && (PathPrefix(`/media`) || PathPrefix(`/admin`) || PathPrefix(`/static`) || PathPrefix(`/accounts`))
        # traefik.http.routers.adventurelog-server.tls: "true"
        traefik.http.routers.adventurelog-server.service: adventurelog-server
        traefik.http.services.adventurelog-server.loadbalancer.server.port: 80

networks:
  adventurelog_network:
    internal: true
  t3_proxy: # This is the traefik network, not the adventurelog network
    external: true
```

