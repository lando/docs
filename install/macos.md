---
title: macOS
description: Install Lando on macOS
---

# macOS

## DMG (recommended)

1.  Download the latest `.dmg` package from [GitHub](https://github.com/lando/lando/releases)
2.  Mount the DMG by double-clicking it
3.  Double-click on the `LandoInstaller.pkg`
4.  Go through the setup workflow
5.  Enter your username and password when prompted

::: tip Choose the correct DMG for your chip architecture
If you have a new Apple Silicon based Mac then choose the `arm64`. Use the `x64` DMG for the older Intel chip Macs.

**Note that Apple Silicon support is still a work in progress and YMMV.**
:::

## HomeBrew

::: warning We do not maintain this!
Please note that the versions of Lando and Docker installed via Homebrew are community-maintained and may not be the latest version as provided by the `.dmg` package from [GitHub](https://github.com/lando/lando/releases). **This also means that `brew` may install an unsupported version of Docker for you.**

See: <https://github.com/Homebrew/homebrew-cask/blob/master/Casks/l/lando.rb>
:::

1. Ensure homebrew is installed and up-to-date.
2. Add the lando cask: `brew install --cask lando`
