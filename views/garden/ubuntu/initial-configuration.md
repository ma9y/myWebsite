---
title: Initial Configuration
eleventyNavigation:
  key: Initial Configuration
  parent: Ubuntu Server   
---
### Check Network Interfaces
```bash
ip link show
```
**Note:** If your Wi-Fi card is recognized, you’ll see wlan0 (or wlp2s0, wlp3s0, etc.). If you don’t see a Wi-Fi device at all, you’ll need to install the driver.

### Wi-Fi Driver for MacBook Pro (Retina, 13-inch, Mid 2014) 
MacBook Pro mid-2014 has a Broadcom BCM43xx chip, which needs a proprietary driver. Without it, Ubuntu won’t even show a Wi-Fi interface.

```bash
sudo apt install bcmwl-kernel-source
sudo reboot
```
```bash
ip link show
```
You should see your Wi-Fi device now, e.g. `wlan0` or `wlp2s0`, `wlp3s0`, etc...

### Install NetworkManager
```bash
sudo apt install network-manager -y
```

### Enable and Start Network Manager
```bash
sudo systemctl enable NetworkManager
sudo systemctl start NetworkManager
```

```bash
systemctl status NetworkManager
```
It should show as active (running).

### Tell Netplan to use NetworkManager
```bash
network:
  version: 2
  renderer: NetworkManager
```
Link:
- [Official Documentation](https://netplan.readthedocs.io/en/stable/examples/#how-to-use-networkmanager-as-a-renderer)

### Apply Netplan
```bash
sudo netplan generate
sudo netplan apply
```

### Check Device Status
```bash
nmcli device status
```

### Connect to Wi-Fi
```bash
sudo nmtui
```
Then:
- Go to Activate a connection → Wi-Fi
- Select your SSID
- Enter your password
- Save & exit
This will create a persistent Wi-Fi config.

### Check Wi-Fi Connection
```bash
nmcli device status
```

### Disable systemd-networkd
```bash
sudo systemctl stop systemd-networkd
sudo systemctl disable systemd-networkd
```

### Static IP address (in NetworkManager)
```bash
# Set static IPv4 address + subnet
sudo nmcli con mod "connection_name" ipv4.addresses 206.168.5.27/27

# Set default gateway (your router)
sudo nmcli con mod "connection_name" ipv4.gateway 206.168.5.1

# Set DNS servers (router + Google as backup)
sudo nmcli con mod "connection_name" ipv4.dns "206.168.5.1 8.8.8.8"

# Disable DHCP, enable manual
sudo nmcli con mod "connection_name" ipv4.method manual

# Restart the connection to apply changes
sudo nmcli con down "connection_name" && sudo nmcli con up "connection_name"
```
**Note:** Replace `connection_name` with NetworkManager connection profile name for Wi-Fi. You can figure out this name by running:

```bash
nmcli con show
```

### Quick checks
```bash
ip a show wlp3s0        # should show 206.168.5.27/27 (no "dynamic")
ip route                # should show: default via 206.168.5.1 dev wlp3s0
ping -c 3 8.8.8.8       # basic connectivity
ping -c 3 google.com    # DNS resolution works
```