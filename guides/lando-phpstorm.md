---
title: Lando + PhpStorm + Xdebug
description: Learn how to configure xdebug in Lando using PhpStorm.
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

[PhpStorm](https://www.jetbrains.com/phpstorm/) is a popular code IDE for PHP
and Drupal development. This video tutorial shows you how to set up PhpStorm with Xdebug.

If you’ve got a local php installation (for example php 7.1 installed with homebrew on macOS) that listens on port 9000 you may need to change the containers php.ini port specification to another port (i.e. `xdebug.remote_port=9001`) and tell phpstorm to listen on that port. See also [Debugging Drupal 8 with PHPstorm and Lando on your Mac](https://www.austinprogressivecalendar.com/blog/debugging-drupal8-phpstorm-and-lando-your-mac).

### Xdebug 3.x (PHP 7.3+)
With Xdebug 3.x, the setting `xdebug.remote_port` has been deprecated, and the setting `xdebug.client_port` should be used instead.
Also, the default xdebug port changed from `9000` to `9003`. Xdebug 3 is now the default version for PHP 7.3 and above.

https://xdebug.org/docs/upgrade_guide#changed-xdebug.remote_port

## Debugging CLI Commands

By default, our Drupal recipes come with Drush out of the box and also the Symfony recipe has a console tooling, which can be debugged with the following config. In order to debug any Drush/Symfony or CLI command using Xdebug with
PhpStorm or a similar IDE, you will need to set two additional environment variables `PHP_IDE_CONFIG` + `XDEBUG_SESSION_START` and configure the
path mapping in your IDE accordingly.

```yaml
services:
  appserver:
    overrides:
      environment:
        # Support debugging CLI with XDEBUG.
        PHP_IDE_CONFIG: "serverName=appserver"
        XDEBUG_SESSION_START: lando
```

You are free to assign any name to "serverName" as long as it matches the server you define in the IDE settings.
In the example above we set the variable to `appserver` and created a path mapping for the server accordingly:

![screenshot](/images/drush-xdebug-phpstorm.png)

Depending on how you have configured Xdebug to be triggered (xdebug.start_with_request is off by default)
you will need to tell Xdebug to start debugging the request. You can do this by either setting that global
option or by setting the following environment variable before running your request:

```
export XDEBUG_SESSION="PHPSTORM"
```

## Toggling Xdebug
For performance reasons, it can be a negative to always have Xdebug enabled. Best option is to install/build
Xdebug extension but leave Xdebug disabled (as is the case with `pantheon` framework with `config: xdebug: false`.
One option to do so is to use tooling such as:

```yaml
tooling:
  xdebug-on:
    service: appserver
    description: Enable xdebug for nginx.
    cmd:
      - rm /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini -f
      - docker-php-ext-enable xdebug
      - pkill -o -USR2 php-fpm
      - echo "Xdebug enabled"
    user: root
  xdebug-off:
    service: appserver
    description: Disable xdebug for nginx.
    cmd:
      - rm /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini -f
      - pkill -o -USR2 php-fpm
      - echo "Xdebug disabled"
    user: root
  ```
