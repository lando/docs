---
title: Lando Services
description: An example adding the mailhog service to a Lando recipe.

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

# Lando Services

Another way you can extend Lando recipes is by adding additional [services](https://docs.lando.dev/core/v3/services.html). If you need to add a second database to your app, a node container for theming, or any number of use cases you can handle them by adding the appropriate service to your app. In this example we'll add a [mailhog](https://docs.lando.dev/mailhog) service to our Lando 101 app!

Open up your `.lando.yml` configuration file in your favorite text editor. If you are following along with Lando 101 that file currently looks like this:

```yaml
name: lando-101
recipe: lamp
config:
  php: 7.4
```

We'll now add the `services` key to our `.lando.yml` file and add in our `mailhog` service:

```yaml
name: lando-101
recipe: lamp
config:
  php: 7.4
services:
  mailhog:
    type: mailhog:v1.0.0
    portforward: true
    hogfrom:
      - appserver
```

The new configuration for our `mailhog` service is under the `services` key in our `.lando.yml` file. The service name can be anything. We've named it `mailhog` after the service it provides, but you can name it anything you like. The `type` tells lando what `service` to use (what image to initially fetch and subsequently use). Then the `portforward` key will automatically set a port for the new service, and finally the `hogfrom` key is specific to the the `mailhog` service and tells mailhog where it should be grabbing the mail from for the Lando 101 app that is the appserver.

After adding or changing a `service` in our app a rebuild is required.

```bash
lando rebuild -y
```

After rebuilding the Lando 101 app the new `mailhog` service will be available to our app! You can verify that by running: `docker ps` and you should see a line similar to this:

```bash
00daf795ccd0        mailhog/mailhog:v1.0.0               "/lando-entrypoint.s…"   25 seconds ago      Up 24 seconds       8025/tcp, 127.0.0.1:32780->80/tcp, 127.0.0.1:32778->1025/tcp              lando101_mailhog_1
```

You can see that our `lando101_mailhog_1` container is up and running and ready for us to use! Some services, like the `mailhog` service, will need to have a URL exposed in order to make use of them. In the next section we'll demonstrate how to add a proxy URL for the `mailhog` service.
