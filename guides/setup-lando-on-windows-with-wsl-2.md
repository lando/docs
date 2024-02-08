---
title: Setup Lando on Windows with WSL2
description: Configure Lando to run on your Windows WSL2 system for better performance when developing on Windows.
guide: true

authors:
  - name: Team Lando
    pic: https://gravatar.com/avatar/c335f31e62b453f747f39a84240b3bbd
    link: https://twitter.com/devwithlando
updated:
  timestamp: 1594391902000

mailchimp:
  # action is required
  action: https://dev.us12.list-manage.com/subscribe/post?u=59874b4d6910fa65e724a4648&amp;id=613837077f
  # everything else is optional
  title: Want similar content?
  byline: Signup and we will send you a weekly blog digest of similar content to keep you satiated.
  button: Sign me up!
---

# Setup Lando on Windows with WSL2

Developing on Windows used to cause web developers agony and pain, but with the introduction of WSL, this is no longer quite so. WSL2 provides a near-native Linux experience for developing web applications on Windows computers.

Longtime Mac or Windows Lando users will be familiar with the performance difficulties associated with file system access when using Docker in a non-linux host environment. Traditionally, running Docker on Mac or Windows requires a virtual machine environment. Sharing files across the boundary between your native OS and the Linux OS running within this virtual environment creates significant performance issues.

WSL2 manages to bypass the majority of this performance penalty by never mounting your source code on a non-Linux filesystem. Here is the best (highest performance) way to setup Docker (and Lando) on a Windows 10 machine in 2021:

## Prerequisites

**1. Uninstall Pre-existing Docker + WSL2 Backend**
You will want to make sure that, if you have an existing Docker or WSL setup, you are **not** using the Docker + WSL2 backend. If you have this setup, [you're going to have a bad time](https://www.youtube.com/watch?v=ynxPshq8ERo). It is very sad, very frustrating, so if you are here, do yourself a favor and uninstall the Docker Desktop WSL2 backend.

**2. Make Sure Your Machine Supports Virtualization**
You also need to ensure your machine supports virtualization (Vt-d, etc.). If you're not sure, you can [check this in Task Manager](https://shaileshjha.com/how-to-find-out-if-intel-vt-x-or-amd-v-virtualization-technology-is-supported-in-windows-10-windows-8-windows-vista-or-windows-7-machine/). You don't need to have Windows 10 Pro like the traditional Lando on Windows setup, as WSL doesn't require it.

## Get WSL2 rolling

The first thing we need to do is enable WSL2. To do so...

1. Open the start menu and search for "Turn Windows features on or off".
2. In the resulting window, check 'Windows Subsystem for Linux' and 'Virtual Machine Platform' and then click 'ok'. This starts the system installed for WSL and will ask us to restart after it downloads the stuff it needs. This really only gives you the WSL1 setup. To get WSL2...
3. Download a kernel update to get WSL2 going. see the [Microsoft docs on installing the kernel update](https://learn.microsoft.com/en-us/windows/wsl/install-manual).
4. After you install the kernel update, launch a powershell and run `wsl --set-default-version 2` to default to WSL 2.
5. Head to the Microsoft store and install a Linux distro. I am going to choose [Ubuntu 18.04 LTS](https://apps.microsoft.com/detail/9N9TNGVNDL3Q?hl=en-us&gl=US), since it is the most common distro for Lando users and our handy [Hyperdrive](https://github.com/lando/hyperdrive) supports it.

## Jump into Hyperspace

After installing the latest LTS Ubuntu, using Hyperdrive makes the rest extremely easy. We simply launch a bash shell in the WSL instance, follow the user setup process, and then follow the Hyperdrive instructions in your terminal.

## Rules to keep your setup easy and happy

1. **Never** run a Lando app from within the default directory that WSL drops you into (`/mnt/c/Users/whateveruser`). This is the Windows filesystem mounted into your WSL instance, and it suffers from the filesystem performance issues that this setup avoids, therefore making going through the trouble of setting this up pointless.
2. You have to start Docker every time you start up the WSL2 instance. Running `lando start` should automatically start Docker, but if you need to initialize Docker for non-Lando purposes, try running `sudo service docker start`. This is because the WSL2 distros have no init system, so Docker doesn't auto start.
3. VS Code is the absolute easiest editor to use with this setup. Microsoft has some extensions that make working with your WSL filesystem very easy. Vim/Neovim also work great, but using an editor like PHPStorm currently requires some extra setup if you want decent performance.

## Day to day development

You'll want to do all of your shell activity from within the WSL system, and you treat it like a separate Linux development box. You can run `code .` from the directory of any project you're working on and it will lauch VS Code, properly setup to develop within WSL. If you launch the terminal within WSL, it is going to work just like you expect and open the session within the WSL system.

## Some caveats

Performance is generally very good with this approach, however, stability can at times leave something to be be desired. Occassional freezes under heavy load are fairly commonplace, and seem to be resolved by rebooting the system. All things considered, the reduction in CPU load, battery drain, and the accompanied increase in the speed of every single action you take (accessing site pages, running any CLI commands) more than outweighs the disruption of these occasional issues for most users. Hopefully stability will continue to increase with time.

## Configure host IP

If you are running Lando inside WSL you have to override the `LANDO_HOST_IP` to use Xdebug because by default Lando uses the WSL IP which can switch between reboots of WSL.
Also, you have to differentiate between running your IDE (e.g. PHPStorm) in Windows or inside WSL.

### 1. Add this lines to `~/.bashrc` inside WSL2 :
a) For IDE in Windows:
```bash
// ~/.bashrc
# Set correct dev host to Windows
export LANDO_HOST_NAME_DEV=host.wsl.internal
export LANDO_HOST_GATEWAY_DEV=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}')
#optional: sudo sed -i "/$LANDO_HOST_NAME_DEV/d" /etc/hosts && sudo sh -c "echo $LANDO_HOST_GATEWAY_DEV $LANDO_HOST_NAME_DEV >> /etc/hosts"
```
The name `host.wsl.internal` can be chosen individually, as it should only be used inside Lando.
On every bash restart you can optionally update the current IP of the `nameserver` in your WSL hosts, if you want to use it outside docker, too.

**Attention:**
Unfortunately the `LANDO_HOST_GATEWAY_DEV` won't be static, so if the IP address of wsl has changed you need to do a `lando rebuild`, to update the config for `extra_hosts` of step 3!

b) For IDE inside WSL:
```bash
// ~/.bashrc
# Set correct dev host to WSL
export LANDO_HOST_NAME_DEV=host.docker.internal
# optional: export LANDO_HOST_GATEWAY_DEV=host-gateway
```
The definition of `LANDO_HOST_GATEWAY_DEV` should not be necessary because in step 3 the fallback `host-gateway` is defined for `extra_hosts`!

### 2. Edit `~/.lando/config.yml` inside WSL2
```yml
// ~/.lando/config.yml
appEnv:
  LANDO_HOST_IP: $LANDO_HOST_NAME_DEV
```

### 3. Add the following to your `.lando.yml`:
```yml
// .lando.yml
services:
    appserver:
        overrides:
            extra_hosts:
                - ${LANDO_HOST_NAME_DEV:-host}:${LANDO_HOST_GATEWAY_DEV:-host-gateway}
```
This setting is very useful for team members, which are not using WSL.
There the fallbacks `host` and `host-gateway` are used, because `LANDO_HOST_NAME_DEV` and `LANDO_HOST_GATEWAY_DEV` are not set, and you don't need to have different project settings.
