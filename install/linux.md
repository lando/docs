---
title: Linux
description: Install Lando on Linux
---

# Linux

## Package (recommended)

1. Install the [Docker Community Edition](https://docs.docker.com/engine/install/) for your Linux version. Visit [https://get.docker.com](https://get.docker.com/) for the "quick & easy install" script. **(at least version 19.03.1-ce)**
2. Download the latest `.deb`, `.pacman` or `.rpm` package from [GitHub](https://github.com/lando/lando/releases)
3. Double click on the package and install via your distributions "Software Center" or equivalent.
4. Make sure you look at the caveats below and follow them appropriately

::: tip Install from source for other Linux distros
If your Linux distro does not support our `.deb`, `.pacman` or `.rpm` packages you can [install from source](/install/source)
:::

## via CLI

Make sure you have `wget` installed.

### Debian

```bash
wget https://files.lando.dev/installer/lando-x64-stable.deb
sudo dpkg -i lando-x64-stable.deb
```

### Fedora

```bash
wget https://files.lando.dev/installer/lando-x64-stable.rpm
sudo dnf install lando-x64-stable.rpm
```

### Arch

```bash
wget https://files.lando.dev/installer/lando-x64-stable.pacman
sudo pacman -U lando-x64-stable.pacman
```

Make sure you look at the caveats below and follow them appropriately as well.

## Caveats

#### `docker-ce`

We set `docker-ce` as a hard dependency for our packages. This means if you have docker installed a different way it is likely installing the package will fail. You *may* be able to get around this if your package utility allows dependency ignorance

```bash
dpkg -i --ignore-depends=docker-ce lando-stable.deb
```

After installing lando this way, you may need to edit the `/var/lib/dpkg/status` file and remove `docker-ce` from the lando package dependency list in order for future `apt` related commands to work. Great care should be taken while editting this file!!!.

We are currently considering whether to support alternate means of installing Docker such as with [moby-engine](https://github.com/lando/lando/issues/1294)

#### Arch

Lando is also available on the AUR as [lando-git](https://aur.archlinux.org/packages/lando-git/), meaning it's built directly from source.

#### Additional Setup

Because each Linux distribution handles things differently, these considerations may or may not apply to you:

* If your distro uses a `docker` group, make sure your user is a member of it:

  ```
  sudo usermod -aG docker $USER
  ```

  You will need to log out for this change to take effect. Sometimes a reboot is necessary. See [this](https://docs.docker.com/engine/install/linux-postinstall/) for more details.

* If your distro uses SystemD, make sure that both `docker.service` and `docker.socket` daemons are running.

* If you are using Manjaro or another Arch-based distro, you may need to enable the [AUR repository](https://aur.archlinux.org/packages/) for dependencies.
