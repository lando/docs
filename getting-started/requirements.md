---
title: Requirements
description: System requirements to run Lando on your machine
---

# Requirements


## System Requirements

Lando is designed to work on a wide range of computers. Here are some basic guidelines to ensure your Lando experience is as smooth as possible.

### Operating System

*   macOS 11 or later
*   Windows 10 Home or Pro version 21H2 or higher with the [WSL 2 feature enabled](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
*   Linux with kernel version 4.x or higher

### Docker Engine Requirements

Please also verify you meet the requirements needed to run our Docker engine backend. Note that the macOS and Windows Lando installer will install Docker for you if needed.

*   Docker Engine for Linux [requirements](https://docs.docker.com/engine/install/)
*   Docker Desktop for Mac [requirements](https://docs.docker.com/desktop/install/mac-install/#system-requirements)
*   Docker Desktop for Windows [requirements](https://docs.docker.com/desktop/install/windows-install/#system-requirements/)

## Hardware Requirements

::: warning Not for the faint of heart!
Note that Lando is basically a PaaS running on your computer and as such we don't recommend you use it [UNLESS YOU'VE GOT POWER!!!](https://www.youtube.com/watch?v=NowdrL6fvb4).
:::

### Minimum requirements

You _can_ run Lando using the below but your experience may be less than ideal.

*   2-core **x86-compat** processor
*   4GB+ RAM
*   25GB+ of available disk space

### Preferred

We've found the below or better to deliver the best experience.

*   8-core processor
*   16GB+ RAM
*   100GB+ of available disk space

## Preflight Checks

1.  Verify that your system meets the [minimum system and hardware requirements](#system-requirements) to run Lando.
2.  Verify that you are connected to the internet.
3.  Verify that you have administrative access to your machine.

### Optional checks

1.  If you already have Docker installed it needs to be set to factory defaults.
2.  If you are also running VirtualBox on Windows check out [this](./../help/win-also-vb.md).
