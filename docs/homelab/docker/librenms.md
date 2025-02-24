---
title: librenms
created: 2023-12-09 10:36:23
modified: 2023-12-09 10:37:30
---
Following [[教學] 用 Docker 來架設 LibreNMS 架設網路服務監控系統 - 清新下午茶](https://blog.jks.coffee/setup-librenms-using-docker/) 

```yaml
  librenms:
    <<: *common-keys-apps
    image: jarischaefer/docker-librenms
    ports:
      - $LIBRENMS_PORT:80
    volumes:
      - $DOCKERDIR/librenms/logs:/opt/librenms/logs
      - $DOCKERDIR/librenms/rrd:/opt/librenms/rrd
    environment:
      APP_KEY: $LIBRENMS_APP_KEY
      DB_HOST: librenms-db
      DB_USER: $LIBRENMS_DB_USER
      DB_PASS: $LIBRENMS_DB_PASSWORD
      DB_NAME: $LIBRENMS_DB
      POLLERS: 16
      BASE_URL: https://librenms.$DOMAIN
      TZ: $TZ
    depends_on:
      - librenms-db
    # label:
      # traefik.enable: true
  librenms-db:
    <<: *common-keys-core
    image: mariadb:10.5
    container_name: librenms_db
    volumes:
      - $DOCKERDIR/librenms/db:/var/lib/mysql
    environment:
      TZ: $TZ
      MYSQL_ROOT_PASSWORD: $LIBRENMS_DB_ROOT_PASSWORD
      MYSQL_USER: $LIBRENMS_DB_USER
      MYSQL_PASSWORD: $LIBRENMS_DB_PASSWORD
      MYSQL_DATABASE: $LIBRENMS_DB
```

```log
In Connection.php line 795:

  SQLSTATE[42S02]: Base table or view not found: 1146 Table 'librenms.cache_l
  ocks' doesn't exist (Connection: mysql, SQL: update `cache_locks` set `owne
  r` = 08hrIBd89nNWv6aD, `expiration` = 1702092963 where `key` = laravel_cach
  e_framework/command-migrate and (`owner` = 08hrIBd89nNWv6aD or `expiration`
   <= 1702089363))


In Connection.php line 601:

  SQLSTATE[42S02]: Base table or view not found: 1146 Table 'librenms.cache_l
  ocks' doesn't exist
```

:::danger

You stopped here

:::
