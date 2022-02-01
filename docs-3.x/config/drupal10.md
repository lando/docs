---
description: Use Drupal 10 on Lando for local development; powered by Docker and Docker Compose, config PHP version, swap db backends or webserver, use Composer, Drush, Xdebug and custom config files, oh and also import and exports databases.
---

# Drupal 10

Drupal is a free and open source content-management framework written in PHP and distributed under the GNU General Public License. Drupal provides a back-end framework for at least 2.3% of all web sites worldwide – ranging from personal blogs to corporate, political, and government sites.

Lando offers a configurable [recipe](./../config/recipes.md) for developing [Drupal 10](https://drupal.org/) apps.

::: warning This is a new recipe!
This is a relatively new recipe. As such this recipe should be considered **beta** quality.
:::

[[toc]]

## Getting Started

Before you get started with this recipe we assume that you have:

1. [Installed Lando](./../basics/installation.md) and gotten familiar with [its basics](./../basics/)
2. [Initialized](./../basics/init.md) a [Landofile](./../config/lando.md) for your codebase for use with this recipe
3. Read about the various [services](./../config/services.md), [tooling](./../config/tooling.md), [events](./../config/events.md) and [routing](./../config/proxy.md) Lando offers.

However, because you are a developer and developers never ever [RTFM](https://en.wikipedia.org/wiki/RTFM) you can also run the following commands to try out this recipe with a vanilla install of Drupal 10.

```bash
# Initialize a drupal10 recipe using the latest Drupal 10 version
lando init \
  --source remote \
  --remote-url https://ftp.drupal.org/files/projects/drupal-10.0.x-dev.tar.gz \
  --remote-options="--strip-components 1" \
  --recipe drupal10 \
  --webroot . \
  --name my-first-drupal10-app

# Start it up
lando start

# List information about this app.
lando info
```

## Configuration

While Lando [recipes](./../config/recipes.md) set sane defaults so they work out of the box they are also [configurable](./../config/recipes.md#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](./../config/lando.md). If you are unsure about where this goes or what this means we *highly recommend* scanning the [recipes documentation](./../config/recipes.md) to get a good handle on how the magicks work.

```yaml
recipe: drupal10
config:
  php: '8.1'
  composer_version: '2.0.7'
  via: apache:2.4
  webroot: .
  database: mysql:5.7
  drush: false
  xdebug: false
  config:
    database: SEE BELOW
    php: SEE BELOW
    server: SEE BELOW
    vhosts: SEE BELOW
```

Note that if the above config options are not enough all Lando recipes can be further [extended and overriden](./../config/recipes.md#extending-and-overriding-recipes).

### Choosing a PHP version

You can set PHP to any version that is available in our [PHP service](./php.md). However, you should consult the [PHP requirements](https://www.drupal.org/docs/system-requirements/php-requirements) to make sure that version is actually supported by Drupal 10 itself.

Here is the [recipe config](./../config/recipes.md#config) to set the Drupal 10 recipe to use PHP version `7.4`

```yaml
recipe: drupal10
config:
  php: '7.4'
```

### Choosing a composer version

You can set `composer_version` to any version that is available in our [PHP service](./php.md#installing-composer).

```yaml
recipe: drupal10
config:
  composer_version: '2-latest'
```

### Choosing a webserver

By default this recipe will be served by the default version of our [apache](./apache.md) service but you can also switch this to use [`nginx`](./nginx.md). We *highly recommend* you check out both the [apache](./apache.md) and [nginx](./nginx.md) services before you change the default `via`.

#### With Apache (default)

```yaml
recipe: drupal10
config:
  via: apache
```

#### With nginx

```yaml
recipe: drupal10
config:
  via: nginx
```

### Choosing a database backend

By default this recipe will use the default version of our [mysql](./mysql.md) service as the database backend but you can also switch this to use [`mariadb`](./mariadb.md) or ['postgres'](./postgres.md) instead. Note that you can also specify a version *as long as it is a version available for use with lando* for either `mysql`, `mariadb` or `postgres`.

If you are unsure about how to configure the `database` we *highly recommend* you check out the [mysql](./mysql.md), [mariadb](./mariadb.md)and ['postgres'](./postgres.md) services before you change the default.

Also note that like the configuration of the PHP version you should consult the [Database server requirements](https://www.drupal.org/docs/system-requirements/database-server-requirements) to make sure the `database` and `version` you select is actually supported by Drupal 10 itself.

#### Using MySQL (default)

```yaml
recipe: drupal10
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: drupal10
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: drupal10
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: drupal10
config:
  database: mariadb:10.4
```

### Using Drush

As of Drupal 9 and Drush 10 it is preferred you use [a site-local install of Drush](https://www.drush.org/latest/install/). For that reason Lando **will not** globally install a version of Drush for Drupal 10 sites.

You can site-local install Drush by requiring it in your projects `composer.json` file.

```bash
lando composer require drush/drush
```

Once you do, Lando will be able to use Drush normally.

#### Build steps

Once Drush is listed in your `composer.json` it is also recommended to configure a [build step](./../config/services.md#build-steps) to automatically install Drush before your app starts up. This ensures the `drush` command is available after `lando start` and during any other build steps or events.

**Automatically composer install before my app starts**

```yaml
recipe: drupal10
services:
  appserver:
    build:
      - composer install
```

If you find that Lando is not using your Drush as expected, which can happen if you've modified Composer to install in a different directory than its normal `vendor` you can take advantage of Lando's [tooling overrides](./../config/tooling.md#overriding) and specify an absolute path to your Drush.

```yaml
tooling:
  drush:
    cmd: /path/to/my/drush
```

#### Default URL Setup

You may see `http://default` show up in many Drush commands you run.

```bash
lando drush uli
// http://default/user/reset/1/1548025070/Px6PbLyJ_2laXqoDe6OukHXaX-cXExo4ErfrKbkqsE4/login
```

This happens because it is actually a difficult problem for Lando to 100% know the canonical URL or service that is serving your application. However you can set up your environment so that commands like `lando drush uli` return the proper URL.

```yaml
tooling:
  drush:
    service: appserver
    env:
      DRUSH_OPTIONS_URI: "https://mysite.lndo.site"
```

### Using Xdebug

This is just a passthrough option to the [Xdebug setting](./php.md#toggling-xdebug) that exists on all our [PHP services](./php.md). The `tl;dr` is `xdebug: true` enables and configures the PHP Xdebug extension and `xdebug: false` disables it.

```yaml
recipe: drupal10
config:
  xdebug: true|false
```

However, for more information we recommend you consult the [PHP service documentation](./php.md).


### Using custom config files

You may need to override our [default Drupal 10 config](https://github.com/lando/drupal/tree/main/recipes/drupal10) with your own.

If you do this you must use files that exist inside your application and express them relative to your project root as below.

Note that the default files may change based on how you set both `ssl` and `via`. Also note that the `vhosts` and `server` config will be either for `apache` or `nginx` depending on how you set `via`. We *highly recommend* you check out both the [apache](./apache.md#configuration) and [nginx](./nginx.md#configuration) if you plan to use a custom `vhosts` or `server` config.

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory in the below example but you can call it whatever you want such as `.lando`.

```bash
./
|-- config
   |-- default.conf
   |-- my-custom.cnf
   |-- php.ini
   |-- server.conf
|-- index.php
|-- .lando.yml
```

**Landofile using custom drupal10 config**

```yaml
recipe: drupal10
config:
  config:
    database: config/my-custom.cnf
    php: config/php.ini
    server: config/server.conf
    vhosts: config/default.conf
```

## Connecting to your database

Lando will automatically set up a database with a user and password and also set an environment variables called [`LANDO INFO`](./../guides/lando-info.md) that contains useful information about how your application can access other Lando services.

Here is the default database connection information for a Drupal 10 site. Note that the `host` is not `localhost` but `database`.

```yaml
database: drupal10
username: drupal10
password: drupal10
host: database
# for mysql
port: 3306
# for postgres
# port: 5432
```

You can get also get the above information, and more, by using the [`lando info`](./../cli/info.md) command.

## Importing Your Database

Once you've started up your Drupal 10 site you will need to pull in your database and files before you can really start to dev all the dev. Pulling your files is as easy as downloading an archive and extracting it to the correct location. Importing a database can be done using our helpful `lando db-import` command.

```bash
# Grab your database dump
curl -fsSL -o database.sql.gz "https://url.to.my.db/database.sql.gz"

# Import the database
# NOTE: db-import can handle uncompressed, gzipped or zipped files
# Due to restrictions in how Docker handles file sharing your database
# dump MUST exist somewhere inside of your app directory.
lando db-import database.sql.gz
```

You can learn more about the `db-import` command [over here](./../guides/db-import.md)

## Tooling

By default each Lando Drupal 10 recipe will also ship with helpful dev utilities.

This means you can use things like `drush`, `composer` and `php` commands via Lando and avoid mucking up your actual computer trying to manage PHP versions and tooling.

```bash
lando composer          Runs composer commands
lando db-export [file]  Exports database from a service into a file
lando db-import <file>  Imports a dump file into database service
lando drush             Runs drush commands
lando mysql             Drops into a MySQL shell on a database service
lando php               Runs PHP commands
```

**Usage examples**

```bash
# Doing a Drush site install
lando drush si --db-url=mysql://drupal10:drupal10@database/drupal10 -y

# Run Composer tests
lando composer test

# Drop into a MySQL shell
lando mysql

# Check the app's installed PHP extensions
lando php -m
```

You can also run `lando` from inside your app directory for a complete list of commands which is always advisable as your list of commands may not 100% be the same as the above. For example if you set `database: postgres` you will get `lando psql` instead of `lando mysql`.

<RelatedGuides tag="Drupal"/>
