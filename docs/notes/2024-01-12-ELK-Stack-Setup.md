---
tags: [kibana]
title: ELK Stack Setup
created: 2024-01-12 14:32:03
modified: 2024-02-03 15:30:30
---

## Generate Service Token for Kibana

### kibana

```sh
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```
