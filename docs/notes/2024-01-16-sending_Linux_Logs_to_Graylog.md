---
title: sending Linux Logs to Graylog
created: 2024-01-16 16:24:56
modified: 2024-01-16 17:55:34
tags:
- graylog
- filebeat
---
## Graylog Sidecar with Filebeat 
- [Graylog Sidecar with Filebeat](https://go2docs.graylog.org/5-2/getting_in_log_data/graylog_sidecar.html)
- [Graylog Sidecar](https://pub.nethence.com/logging/graylog-sidecar)

## Beats 
To receive input from Graylog Sidecar, I need Beats to read from the Beats collector. 
1. Update Graylog docker compose YAML file to open port for Beats 
2. Install beats
	1. It turns out that there are different "beats" (applications) for different log types 
		   https://www.elastic.co/guide/en/beats/libbeat/current/beats-reference.html
		   1. Log files and journals -> Filebeat

Install graylog sidecar 
```bash
wget https://packages.graylog2.org/repo/packages/graylog-sidecar-repository_1-5_all.deb
sudo dpkg -i graylog-sidecar-repository_1-5_all.deb
sudo apt update && sudo apt install graylog-sidecar            
```

Edit the configuration (see [Configuration](https://go2docs.graylog.org/5-2/getting_in_log_data/graylog_sidecar.html#Sidecar) ) and activate the sidecar as a system service:

```bash
sudo vi /etc/graylog/sidecar/sidecar.yml
sudo graylog-sidecar -service install
# Ubuntu 16.04 and later with systemd
sudo systemctl enable graylog-sidecar
sudo systemctl start graylog-sidecar
```

## Filebeat install

install repo for filebeat ([https://www.elastic.co/guide/en/beats/filebeat/8.7/setup-repositories.html#_apt](https://www.elastic.co/guide/en/beats/filebeat/8.7/setup-repositories.html#_apt))

```bash
apt install gnupg1
mkdir -p /etc/apt/keyrings
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /etc/apt/keyrings/elastic-8.x.gpg
sudo apt install apt-transport-https
echo "deb [signed-by=/etc/apt/keyrings/elastic-8.x.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list
sudo apt update && sudo apt install filebeat
systemctl status filebeat # enabled by default
```

no need to enable that one – it will get handled by the sidecar

```bash
sudo systemctl disable filebeat
```
