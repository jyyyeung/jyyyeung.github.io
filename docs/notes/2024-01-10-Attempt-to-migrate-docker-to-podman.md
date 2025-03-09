---
title: Attempt to migrate docker to podman
date: 2024-01-10 08:55:35
modified: 2024-02-03 15:27:49
tags:
- docker
- podman
---

- [Podman vs Docker](https://www.smarthomebeginner.com/podman-vs-docker/)
- [Docker to Podman Migration Guide](https://www.smarthomebeginner.com/docker-to-podman-migration-guide/)

---
```bash
sudo apt install podman
pip3 install --user podman-compose==1.0.3
```

```bash 
mkdir -p ~/.config/containers 
cp /etc/containers/registries.conf ~/.config/containers/
```

Add docker as registry  

```yaml
# ~/.config/containers/registries.conf
unqualified-search-registries = ["docker.io"]
```


Enable Containers to Run After Logout
```sh
sudo loginctl enable-linger <user>
```
