---
title: Backup and Restore netbox database
created: 2023-12-20 19:55:06
modified: 2024-02-03 15:28:08
tags: [netbox, backup, database]
---

```bash
cd <path_to>/netbox-docker

# Stop all containers
docker compose down

# Only start the DB
docker compose up -d postgres

# Take a DB backup
docker compose exec -T postgres sh -c 'pg_dump -cU $POSTGRES_USER $POSTGRES_DB' | gzip > db_dump.sql.gz

# Stop the database
docker compose down

# Restore the database
docker compose up -d postgres
gunzip -c db_dump.sql.gz | docker compose exec -T postgres sh -c 'psql -U $POSTGRES_USER $POSTGRES_DB'

docker compose exec postgres sh -c 'psql -U $POSTGRES_USER $POSTGRES_DB'
ALTER USER netbox WITH PASSWORD '<YOUR_DB_PASSWORD>';
ALTER DATABASE netbox OWNER TO netbox;
# Once complete, enter `\q` to exit the PostgreSQL shell.

# Start all other containers
docker compose up
```

## Resources

- [Updating · netbox-community/netbox-docker Wiki · GitHub](https://github.com/netbox-community/netbox-docker/wiki/Updating#postgresql-update)
- [Troubleshooting · netbox-community/netbox-docker Wiki · GitHub](https://github.com/netbox-community/netbox-docker/wiki/Troubleshooting#database-operations)
- [1. PostgreSQL - NetBox Documentation](https://docs.netbox.dev/en/stable/installation/1-postgresql/#database-creation)
- [How can I change a PostgreSQL user password? - Stack Overflow](https://stackoverflow.com/a/12721095)
