---
title: From Source
description: Install Lando from source
---

# From Source

To install from source you need to first make sure you've manually installed the below dependencies:

* [the latest stable version of docker](https://docs.docker.com/engine/installation/) for your operating system, set to its **factory defaults**.
* [the latest node 18](https://nodejs.org/en/download/)

Once you've completed the above then do the following:

```sh
# Clone the Lando source
git clone https://github.com/lando/cli.git lando-cli

# Install its dependencies
cd lando-cli && npm install

# ON WINDOWS:
# Find the current path with command prompt: cd or powershell: pwd
# Add C:\path\from\above\bin to PATH
# See: https://www.computerhope.com/issues/ch000549.htm
# Remember to relaunch your terminal so the PATH changes take effect
lando.js
# Or invoke directly
node "C:\path\from\above\bin\lando.js"

# ON POSIX:
# Set up a symlink
# NOTE: we use lando.dev as a convention but you can name it whatever
# This allows you to run stable lando and source lando side by side
sudo mkdir -p /usr/local/bin
sudo ln -s $(pwd)/bin/lando.js /usr/local/bin/lando.dev

# Run lando from source
lando.dev
```

