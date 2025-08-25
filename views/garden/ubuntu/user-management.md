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
