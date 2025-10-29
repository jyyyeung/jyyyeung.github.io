---
slug: migrating-vaultwarden-db
title: Migrating Vaultwarden DB from SQLite to Postgres in Docker Swarm
authors: jyyyeung
---
# Migrating Vaultwarden DB from SQLite to Postgres in Docker Swarm 


In the world of data management, migrating from one database system to another can often be a daunting task. This blog post will guide you through the process of migrating your Vaultwarden instance from SQLite to PostgreSQL using **pgloader**, a powerful tool that simplifies this transition in a single command. 

<!-- truncate -->

Before diving into the migration steps, it's crucial to ensure that your database is backed up and that you're prepared for the transition. We will leverage a Synology NAS for data storage, ensuring an organized approach with dedicated folders for both the original SQLite database and the new PostgreSQL database. 

By following the outlined steps, you will not only create a robust PostgreSQL setup but also ensure that your Vaultwarden instance operates seamlessly with enhanced performance and scalability. Let's get started on this transformative journey!

## Before you start 
1. Backup your DB
2. (recommended) Check the following
	1. [Using the PostgreSQL Backend · dani-garcia/vaultwarden Wiki · GitHub](https://github.com/dani-garcia/vaultwarden/wiki/Using-the-PostgreSQL-Backend)
	2. [hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres)
	3. [GitHub - dimitri/pgloader: Migrate to PostgreSQL in a single command!](https://github.com/dimitri/pgloader)

## My Volume Information 
All data is stored in a Synology NAS (`192.168.3.200`) and connected through NFS. 

- `/volume1/docker/vaulwarden`
	- a general location for all vaultwarden data, including the original sqlite DB file 
- `/volume1/docker/db/vaultwarden`
	- a new folder created to store the new postgres db data, for easy separation and backup 
## Steps 

1. Create a new Postgres docker compose service
2. Create a `DATABASE_URL` env variable in the `vaultwarden/server` service 
3. Run both services (or the entire stack)
4. Ensure connection from the vaultwarden instance to the database (check vaultwarden logs) and that database tables and schema are setup in the database by the vaultwarden instance
5. Stop the vaultwarden server instance 
6. Create a new `bitwarden.load` file in your host machine

```bash
# bitwarden.load
load database
     from sqlite:///path/to/your/db.sqlite3
     into postgresql://vaultwarden:another_very_secure-passw0rd!!@bitwarden_vaultwarden-db:5432/vaultwarden
     WITH data only, include no drop, reset sequences
     EXCLUDING TABLE NAMES LIKE '__diesel_schema_migrations'
     ALTER SCHEMA 'bitwarden' RENAME TO 'public'
;
```

> [!note]
> Since I am running both services in a stack called `bitwarden`, the hostname of the database will be prefixed with `bitwarden_`. Thus, hostname i used was `bitwarden_vaultwarden-db`.

7. Then, Run the following command in your host (remember to update the values) [GitHub - dimitri/pgloader: Migrate to PostgreSQL in a single command!](https://github.com/dimitri/pgloader)

```bash
docker run --rm -it -v "./:/data" -v "/path/to
/your/db.sqlite3:/data/db.sqlite3" --network=bitwarden  ghcr.io/dimitri/pgloader:latest pgloader /data/bitwarden.load
	```



## Final Docker Compose File 

```bash
# Env File 
BITWARDEN_ADMIN_TOKEN=a_very_secure-passw0rd!!
BW_POSTGRES_USER=vaultwarden
BW_POSTGRES_PASSWORD=another_very_secure-passw0rd!!
BW_POSTGRES_DB=vaulwarden
```

```yaml
volumes:
	docker-bitwarden:
		driver_opts:
			type: nfs
			o: addr=192.168.3.200,nolock,hard,rw
			device: :/volume1/docker/vaultwarden
	vaultwarden-db: # New location for postgres db
		driver_opts:
			type: nfs
			o: addr=192.168.3.200,nolock,soft,rw
			device: :/volume1/docker/db/vaultwarden
	  
services:
	bitwarden:
		container_name: bitwarden
		image: vaultwarden/server:latest
		healthcheck:
			test: ["CMD", "curl", "-f", "http://localhost:80/"]
			interval: 10s
			timeout: 5s
			retries: 3
			start_period: 90s
		networks:
			- t3_proxy
			- bitwarden
		security_opt:
			- no-new-privileges:true
		restart: always
		ports:
			- $BITWARDEN_PORT:80 # webUI port	
		environment:
			TZ: $TZ
			PUID: $PUID
			PGID: $PGID
			ADMIN_TOKEN: $BITWARDEN_ADMIN_TOKEN
			SIGNUPS_ALLOWED: "false"
			WEBSOCKET_ENABLED: "true"
	
			# Database
			BW_POSTGRES_USER: $BW_POSTGRES_USER
			BW_POSTGRES_PASSWORD: $BW_POSTGRES_PASSWORD
			BW_POSTGRES_DB: $BW_POSTGRES_DB
			DATABASE_URL: postgresql://$BW_POSTGRES_USER:$BW_POSTGRES_PASSWORD@vaultwarden-db:5432/$BW_POSTGRES_DB
		volumes:
			- docker-bitwarden:/data
		deploy:
			mode: replicated
			replicas: 1

	vaultwarden-db:	
		image: postgres:16
		hostname: vaultwarden-db
		container_name: vaultwarden-db
		restart: on-failure	
		init: true
		networks:
			- bitwarden
		volumes:
			- vaultwarden-db:/var/lib/postgresql/data
		environment:
			POSTGRES_USER: $BW_POSTGRES_USER
			POSTGRES_PASSWORD: $BW_POSTGRES_PASSWORD
			POSTGRES_DB: $BW_POSTGRES_DB
		deploy:
			mode: replicated
			replicas: 1

networks:
	t3_proxy: # Traefik Reverse Proxy
		external: true
	bitwarden:
		internal: true
```