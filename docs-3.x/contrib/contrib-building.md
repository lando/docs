---
description: Learn how to build and package Lando from source.
---

# Building

You can easily build Lando from source with our helpful `yarn` scripts. Make sure you've cloned the [correct repository](https://github.com/lando/cli)!

::: warning Cross compiling is not currently supported!
Due to an upstream restriction imposed on us by [pkg](https://github.com/zeit/pkg), we cannot currently cross compile.
:::

```bash
# Build the Lando CLI binary
yarn run build:cli
# Navigate to the prebuilt binaries
cd dist/@lando
```
