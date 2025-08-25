---
title: Handy Commands
eleventyNavigation:
  key: Handy Commands
  parent: Ubuntu Server   
---
### Change Keyboard
```bash
sudo loadkeys us
sudo loadkeys cz
```

### Reboot Ubuntu Server
```bash
sudo reboot
```

### Power off Ubuntu Server
```bash
sudo shutdown -h now
sudo shutdown -h +10 # schedule shutdown in 10 minutes
```

### Adjust Font Size in the Console
```bash
sudo dpkg-reconfigure console-setup
```
Then
- Choose "UTF-8"
- Select "Guess optimal character set"
- Pick "Terminus" font
- Select a larger size like "16x32" or "24x48"
- Reboot and the console font will be much larger while keeping the Retina resolution.

### Import SSH Key from GitHub
```bash
curl -L https://github.com/<your_github_username>.keys > $HOME/.ssh/authorized_keys
```