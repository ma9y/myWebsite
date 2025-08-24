---
title: Initial Issues
eleventyNavigation:
  key: Initial issues
  parent: Ubuntu Server   
---
### Enabling Wifi on Mac with Broadcom wifi chipset
```bash
sudo apt install network-manager -y
nmcli device status
```
- If you see a device like wlan0 or wlp2s0 and it says connected, you’re already on Wi-Fi.
- If it says unavailable or you don’t see a Wi-Fi device at all, you’ll need to install the Broadcom driver.

Your MacBook Pro mid-2014 almost certainly has a Broadcom BCM43xx chip, which needs a proprietary driver. Without it, Ubuntu won’t even show a Wi-Fi interface.

```bash
sudo apt install bcmwl-kernel-source
nmcli device status
```

```bash
sudo nmtui
```
Then:
- Go to Activate a connection → Wi-Fi
- Select your SSID
- Enter your password
- Save & exit

This will create a persistent Wi-Fi config.

### Font size in the console
```bash
sudo dpkg-reconfigure console-setup
```
- Choose UTF-8
- Pick Terminus font
- Select a larger size like 16x32 or 24x48
- Reboot and the console font will be much larger while keeping the Retina resolution.

### Correctly power off Ubuntu
```bash
sudo shutdown -h now
sudo shutdown -h +10 # schedule shutdown in 10 minutes
```

### Reboot Ubuntu
```bash
reboot
```

### Change keyboard
```bash
sudo loadkeys us
sudo loadkeys cz
```

### Import your SSH key from GitHub
```bash
curl -L https://github.com/<your_github_username>.keys > $HOME/.ssh/authorized_keys
```

### Static IP address
Edit your Netplan config. Usually in `/etc/netplan/01-netcfg.yaml` or `/etc/netplan/50-cloud-init.yaml`:
```bash
cd /etc/netplan
sudo nano 50-cloud-init.yaml
```

```bash
network:
  version: 2
  renderer: networkd
  wifis:
    wlp3s0:
      dhcp4: false
      dhcp6: false
      # Static IP address for this machine
      # 198.51.100.27 is an EXAMPLE address (RFC 5737), replace with your own
      # The "/27" means a subnet mask of 255.255.255.224
      # ┌───────────────────────── Subnet /27 details ──────────────────────────┐
      # Network address : 198.51.100.0
      # First usable    : 198.51.100.1   ← typically your gateway (router)
      # Last usable     : 198.51.100.30
      # Broadcast       : 198.51.100.31
      # Total addresses : 32 (30 usable for hosts)
      # └───────────────────────────────────────────────────────────────────────┘
      addresses: [198.51.100.27/27]

      nameservers:
        # First nameserver is usually your local gateway (router)
        # Second is a public resolver (here, Google’s 8.8.8.8)
        addresses: [198.51.100.1, 8.8.8.8]

      access-points:
        # Replace with your Wi-Fi SSID and password
        "YourWiFiSSID":
          password: "YourWiFiPassword"

      routes:
        # Default route: tells the system where to send all non-local traffic
        # "via" should be your gateway’s IP (router on your subnet)
        - to: default
          via: 198.51.100.1
```

```bash
sudo netplan generate
sudo netplan apply
```



