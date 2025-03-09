---
tags:
- networking
- vlan
---
# VLANs 

## VLAN 137 - Guest 

> Creating a separate VLAN for guests can prevent them from accessing your main devices and sensitive data. This ensures their devices are isolated from your primary network, enhancing security.

- WiFi access for everyone in the house that doesn't need to know how stuff works. #hmmm
- DNS and time servers forced onto local servers for ad blocking etc.
- DHCP Enabled 

## VLAN 27 - Home 

- Can not access SSH/web interfaces of these services, just their ports applicable to the service.

## VLAN 39 - DMZ 

- Only VLAN that can accept external connections on port 443
- holds the external facing reverse proxy and has a double firewall

## VLAN 228 - IoT

> Many Internet of Things (IoT) devices have questionable security. By placing them on a separate VLAN, you can limit their potential to access other devices or data in your network in case they are compromised.

> inter-VLAN access only as required
> https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv5bdim/?utm_source=share&utm_medium=web2x&context=3

for all the crap that needs Internet access but that I don't want sending messages home to their overlord (tv, roku, smart speakers, washing machine probably)

- Consider wireless and wired IoT in different VLANs? 
### Setup 

- Only has access to DNS Resolution 
	- PiHole? 
- Layer Isolation on the Wireless AP
	- so devices can not talk to one another 
## VLAN X - Wireguard

connection for wireguard tunnel

> wireguard VPN. Access to MGMT vlan only.
> https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv5bdim/?utm_source=share&utm_medium=web2x&context=3

## VLAN 100 - Management  

Consider no internet access? 

### Services

- Proxmox GUI
- switch management  
- other infrastructure control guis 

## VLAN X - Home Lab/Development Environment
> If you're into technology experiments or development, a VLAN for your lab equipment can provide a controlled environment to test without affecting your primary network.
> https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv9gf7k/?utm_source=share&utm_medium=web2x&context=3


## VLAN X - Media Devices 
> Devices like smart TVs, streaming devices, and gaming consoles can generate a lot of network traffic. Putting them on a separate VLAN can help prevent them from slowing down other critical devices.
> https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv9gf7k/?utm_source=share&utm_medium=web2x&context=3

---

## Notes 

> Take two devices, ask "should these be able to talk to each other?" If the answer is no put them in separate VLANs.
> https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv51oyb/?utm_source=share&utm_medium=web2x&context=3
## Resources 
- https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv55tfx/?utm_source=share&utm_medium=web2x&context=3
- https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv4wn10/?utm_source=share&utm_medium=web2x&context=3
- https://www.reddit.com/r/homelab/comments/15ke7et/comment/jv51oyb/?utm_source=share&utm_medium=web2x&context=3
