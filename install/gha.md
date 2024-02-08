---
title: GitHub Actions
description: Install Lando on GitHub Actions
---

# GitHub Actions

## Basic Usage

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
```

## Advanced Usage

**Version examples:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version: stable | edge | dev | latest | 3 | 3.14.0 | 3.11 | pm-preview
```

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version: https://url.to.my.lando.cli
```

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version: /path/to/my/lando/cli
```

**Version spec and config file example:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version: ">2"
    config-file: config.yaml
```

**Version file and config list example:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version-file: .tool-versions
    config: |
      core.engine=docker-colima
      core.telemetry=false
      plugins.@lando/php=/home/runner/work/php/php
```

**Version file and config list example:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version-file: .tool-versions
    config: |
      core.engine=docker-colima
      core.telemetry=false
      plugins.@lando/php=/home/runner/work/php/php
```

> **NOTE:** The above config is meant purely for illustration.

**Setup example:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    lando-version: 3-dev
    setup: auto | off | disable | lando setup --orchestrator 2.21.0 -y
```

**Everything, everywhere, all at once example:**

```yaml
- name: Setup Lando
  uses: lando/setup-lando@v2
  with:
    architecture: x64
    config: |
      core.engine=docker-colima
      core.telemetry=false
      plugins.@lando/php=/home/runner/work/php/php
    config-file: config.yaml
    debug: true
    dependency-check: error|warn|false
    lando-version: 3.14.0
    lando-version-file: .tool-versions
    os: macOS
    telemetry: false
    token: ${{ github.token }}
    setup: lando setup --orchestrator 2.22.0 --plugins @pirog/my-plugin -y
```

## Inputs

All inputs are optional. If you do nothing the latest `stable` Lando will be installed.

| Name | Description | Default | Example |
|---|---|---|---|
| `lando-version` | The version of Lando to install. If set this has primacy over `lando-version-file`. | `stable` | `3.14.0` |
| `lando-version-file` | A file that contains the version of Lando to install. | `.lando-version` | `.tool-versions` |
| `config` | A list of `.` delimited config. If set these have primacy over values in `config-file` | `null` | `engineConfig.port=2376` |
| `config-file` | The path to a Lando global config file to use. | `null` | `/config/lando-global.yml` |
| `setup` | The lando setup command to run. | `lando setup -y` | `lando setup --skip-common-plugins --plugin @lando/core@~/path/to/core -y` |

* Note that `setup` is only available in Lando 3.21+

## Outputs

```yaml
outputs:
  lando-path:
    description: "The path to the installed version of Lando."
    value: ${{ steps.setup-lando.outputs.lando-path }}
```

