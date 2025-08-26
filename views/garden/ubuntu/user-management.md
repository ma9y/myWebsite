---
title: User Management
eleventyNavigation:
  key: User Management
  parent: Ubuntu Server   
---
### Creating Users
```bash
sudo useradd -d /home/testuser -m testuser
```
where
- `-d` - creates user's home directory
- `/home/testuser` - specifies user's home directory
- `-m` - creates user's home directory automatically
- `testuser` - specifies username

```bash
sudo adduser testuser2
```
**Note:** More convenient compared to`useradd` but not available in all distributions.

### Removing/Disabling Users
```bash
userdel testuser2
```
**Note:** It will delete the user but it does not remove content of user's home directory.

```bash
userdel -r testuser2
```
**Note:** Removes the user including their home directory.

### Change User's Password 
```bash
sudo passwd testuser
```

### /etc/passwd 
- each line corresponds to one user
- info in columns that are separated by `:`
  - column 1: `username`
  - column 2: `x` (= password is encrypted and stored in `/etc/passwd`)
  - column 3: `UID` (user id)
  - column 4: `GID` (group id)
  - column 5: `First & Last Name` (note: column is nicknamed to `GECOS`)
  - column 6: `home directory`
  - column 7: `user's shell` (e.g. `/bin/bash`)

**Note:** 
- You can run `man passwd` for more details
- User's shell defaults to `/bin/bash` if created with the `adduser` and to `/bin/sh` if created with `useradd`
- `/etc/passwd` is visible to everybody
- Changing user's shell to something invalid prevents that user from logging in

### /etc/shadow
- each line corresponds to one user
- info in columns that are separated by `:`
  - column 1: `username`
  - column 2: `password hash` (if `*` then no hash, the user is locked out, e.g. `root`)
  - column 3: `date` (date of last password change)
  - column 4: `minimum number of days` (before next password change is allowed)
  - column 5: `maximum number of days` (between password changes)
  - column 6: `number of days` (before the password expiration, user is warned)
  - column 7: `number of days` (after the password expiration when when an account is disabled)
  - column 8: `number of days` (till the account is disabled, empty inless disabled day is set)

**Note:** 
- You can run `man shadow` for more details
- `/etc/shadow` is visible to users with `root` privileges
- Prepending an exclamation mark to 2nd column locks out the user (they cannot log in). You can do it by running:

```bash
suddo passwd -l username # insert an exclamation mark right before password hash
```

```bash
sudo passwd -S usernam # removes an exclamation mark from leading position
```

### /etc/skel
Files that are contained in `/etc/skel` are copied into the home directory for all new users. Feel free to add any files here

```bash
ls -la /etc/skel # adding -a displays also hidden files in this folder
```

### Switch User
```bash
su - username
```
Then
- You will be asked for usename's password

```bash
sudo su - username
```
Then
- You will be aksed for your own password to confirm root privileges.

```bash
sudo su - # switching to ROOT account
```
Then
- You will be aksed for your own password to confirm root privileges.

### View Groups
Every file or directory has both user and group that takes ownership of it (one-to-one ownership).
```bash
ls -l
```
Wher output contains
- username on 3rd position and group name on 4th position

```bash
cat /etc/group
```
Returns list of all groups in the system with the following columns:
- group name
- password (not really used due to security risks)
- GID (group ID)
- list of users that are group members

### Create Groups
```bash
sudo groupadd admins # creates new group admins
```
```bash
sudo groupdel admins # deletes existing group admins
```

### Add an User to the Secondary Group(s)
```bash
sudo usermod -aG admins userX # adds userX into group Admins
```
Where
- `-a` - append; add an user to the secondary group(s)
- `G` - list of suplementary groups

### Change User's Primary Group
```bash
sudo usermod -g groupname username
```

### Change User's Home Directory and Username
```bash
sudo usermod -d /home/frank2 frank1 -m # changes home directory for frank1 to /home/frank2
sudo usermod -l frank2 frank1 # changes username for frank1 to frank2
```

### Remove an User from the Group
```bash
sudo gpasswd usrname groupname
```

### Locking & Unlocking User Accounts
```bash
sudo passwd -l username # locks out an user by placing ! before password hash in /etc/passwd
sudo passwd -u username # unlocks an user by removing ! from /etc/passwd
```
**Note:** User can still access the server via SSH login.

### Password Information
```bash
sudo chage -l usernam # returns info from /etc/shadow
```
```bash
sudo chage -d 0 username 
# set number of days till password expiration to 0
# password change will be required upon next login
```
```bash
sudo chage -M 90 username # max number of days between paasword changes
sudo chage -m 5 username # min number of days between paasword changes
```

### Password Policies - Pluggable Authentication Module (PAM)
```bash
sudo apt install libpam-cracklib  
```

### Manage Admin Access with sudo
By default members fo SUDO group can use `sudo` without any restrictions.

```bash
sudo usermod -aG sudo username # adds username into sudo group
```

### /etc/sudoers
```bash
sudo visudo # opens configuration file /etc/sudoers that governs sudo access
```

```bash
username    ALL=(ALL:ALL) ALL # grants sudo access to username
%groupname  ALL=(ALL:ALL) ALL # grants sudo access to mebers of groupname
```
Where
- 1st ALL - user can use sudo from any terminal
- 2nd ALL - user can impersonate any other user
- 3rd ALL - user can impersonate any other group
- 4th ALL - user can use all commands

```bash
frank ALL=(ALL:ALL) /sbin/reboot, /sbin/shutdown # can only execute 2 commands as sudo 
frank ALL= /usr/bin/apt # can execute apt commands, cannot impersonate any user/groul (ALL:ALL removed completely)
```

### View Permissions on Files & Directories
```bash
ls -l # returns permissions in first column
```
Where
- 1st charecter defines object type (`-` is file, `d` is directory, `l` is link)
- Then READ/WRITE/EXECUTE permissions follow for User, Group and Other (always set of three characters), e.g:
  - `rwx` Object has read, write and execute permission
  - `r-x` Object has read enabled, write disabled and execute enabled
  - `r--` Object has read enabled, write disabled and execute disabled
  - `---` Object has no permission enabled

### Changing File Permissions
```bash
sudo chmod o-r work.txt # removes bit "r" (read) from Other
sudo chmod g+r work.txt # adds bit "r" (read) to owning Group
sudo chmod o-rw work.txt # removes bit "r" and "w" from Other
```

You can use octal point values:
- read: `4`
- write: `2`
- execute: `1`

```bash
sudo chmode 640 work.txt
```
Where
- Ownning User gets R+W (4+2=6)
- Owning Group gets R (4)
- Other gets no permissions

### Changing Directory Permissions
```bash
chmod 640 -R testfolder
```
Where
- `R` applies changes also to all files and directories underneath the directory

### Changing the Ownership of the Objects
```bash
sudo chown username work.txt # changes the ownership of file to username
```
```bash
sudo chown username:groupname work.txt # changes the ownership of file to username and groupname
```
```bash
sudo chown -R username testfolder # changes the ownership of testfolder and all its content to username
```
```bash
sudo chgrp sale file.txt # # changes the ownership of file to group sales
```

