---
description: Learn about how to get started contributing code to Lando.
---

# Coding

This section is designed for people who want to contribute `code things` to Lando. Specifically, that means [opening a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) against one of the many [Lando respositories](https://github.com/orgs/lando/repositories).

[[toc]]

## Choosing a project

Lando has a distributed model and is powered by over [80 repos](https://github.com/lando) so the first step is to find a repo you are interested in and check out the contribution guidelines there.

## Good First Issues

Once you are set up and ready to contribute, a good place to start is with issues tagged as [good first issue](https://github.com/lando/lando/issues). Peruse the list and see if one or more of those issues is a good fit for you.

If you are having issues with any of the above or need some guidance from one of our guide pros, make sure you [join our Slack org](https://www.launchpass.com/devwithlando) and check out the **#community** and/or **#contributors** channels.

## Making your first pull request

1. [Create a fork of the repo you are working on](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
2. [Follow the GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow).
3. Make sure you complete any requested/applicable tasks in the PR template.
4. Make sure all status checks and tests pass.
5. Ping the `#contributors` channel in Slack for any needed [PR review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) or any other help you may need advancing your PR.
6. When all checks, tests and reviews are in the green ping a `maintainer` and/or apply the <Badge type="flag">flag</Badge> label.

**If you have any trouble, need clarification, guidance, help, etc jump into the `#contributors` channel in Slack and another contributor will gladly help you out!**

After we merge a few pull requests we may grant you `write` access to the repository which will allow you to open branches against the repo directly instead of using your fork.

## PR Conventions

We are pretty [wild west](https://www.youtube.com/watch?v=_zXKtfKnfT8) on accepting PRs but here are some good conventions that we def recommend:

* Create branches named something like `ISSUE-NUMBER-BRIEF-DESCRIPTION` for example `35-ssh-agent-feature`
* Create commit message named something like `#ISSUE-NUMBER: description` for example `#35: ensure socket is owned by you`
* [Associate your issue or issues with the PR](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)

GitHub is able to do some magic with the above and provide better context around commits, issues, PRs and projects.

## Writing Plugins

::: danger PROBABLY BEST TO WAIT
We are in the process of documenting the Lando 4 API so if you want to write a **new** plugin we _highly recommend_ waiting for that. We've kept these docs mostly as a courtesy for older Lando 3 Plugin creators.
:::

Lando has an advanced plugin system that allows developers to add and extend Lando's core functionality. A few examples of things you can do with plugins are shown below:

1.  Create tasks and CLI commands like `lando danceparty`
2.  Create services like `solr`, `redis` or `ruby`
3.  Create recipes like `drupal9` or `rubyonrails`
4.  Add sources from which you can initialize your site
5. 	Add initialization wizards for recipes
6.  Add `bash` or `sh` scripts into your services
7.  Augment or alter the `lando` object and its configuration
3.  Hook into various `lando` and `app` runtime events to provide additional functionality.

You can see examples of plugins in the [plugins library](https://docs.lando.dev/plugins).

### Plugin Loading

Lando will search in the `plugins` directory for any path listed in `lando.config.pluginDirs` and automatically load in any plugins that it finds. By default, these directories are the Lando source directory and `~/.lando` but note that they are configurable via the Lando [global config](https://docs.lando.dev/core/v3/global.html). In order for Lando to successfully identify and automatically load your plugin, you need to have a directory named after your plugin, e.g. `my-plugin`, in one of the directories mentioned above and it needs to include an `index.js`.

If there are multiple occurrences of the same-named plugin, Lando will use the last one it finds. This means that `lando` will prioritize user plugins over core plugins by default.

**A powerful corollary to this is that individual user apps can implement plugins that override or replace core plugin behavior.**

::: warning Plugins are no longer loaded from apps by default!
As of `3.0.0-rc.2`, Lando will no longer look for plugins in your app's root directory by default. We intend to eventually provide better scaffolding around grabbing and loading plugins directly from your Landofile but for now this is left to the user.
:::

### Plugin Anatomy

At the bare minimum, your plugin needs to have the following structure to be recognized and autoloaded by Lando.

```bash
./
|-- index.js
```

However, Lando will also look for other folders and files and automatically load in those as well. These "special" paths are shown below:

```bash
./
|-- compose         Services that get autoloaded first
|-- lib             Unit testable libraries that do not require the `lando` object
|-- recipes         Recipes that get autoloaded
|-- scripts         BASH or SH scripts that get injected into every container
|-- services        Services that get autoloaded last
|-- sources         Initialization sources that get autoloaded
|-- tasks           Tasks that get autoloaded
|-- test            Unit and functional tests
|-- types           Services that get autoloaded second
|-- app.js          Runs with the `lando` and `app` objects when an app is initialized
|-- index.js        Required, runs with the lando` object when plugin gets loaded
```

Let's go into more depth about each special file below:

#### index.js

This file is required to exist in every Lando plugin, even if it doesn't do anything. **If you do not have this file, then your plugin will not be detected and loaded.**

`index.js` will get required when your plugin is initially loaded. Generally, you will use this file to hook into Lando's event layer and modify the `lando` object itself.

It takes the form of a function that gives you access to the Lando API. Its `return` value is merged directly into the `lando` object.

A fairly basic example follows:

```js
'use strict';

module.exports = (app, lando) => {
  // Log that this plugin has loaded
  lando.events.on('post-bootstrap-config', () => {
    lando.log.info('Custom plugin loaded!');
  });

  // Merge some stuff into the lando object and its config
  return {
    customModule: require('./lib/customMod'),
    config: {
      mySetting: true,
      domain: 'mydomain.com',
    };
  };
};
```

#### app.js

`app.js` will get loaded when a Lando app is initialized, e.g. `app.init()` is invoked. Generally, you will use this file to hook into the app's event layer and to modify the app object itself.

It takes the form of a function that gives you access to both the App and Lando APIs. Its `return` value is mixed directly into the `app` object, however, only the `config`, `composeData`, `env`, `labels` can be modified.

A fairly basic example follows:

```js
'use strict';

module.exports = (app, lando) => {
  // Run my custom script on all my containers after my app starts
  const buildServices = _.get(app, 'opts.services', app.services);
  app.events.on('post-start', () => lando.engine.run(_.map(buildServices, service => ({
    id: `${app.project}_${service}_1`,
    cmd: '/helpers/myscript.sh',
    compose: app.compose,
    project: app.project,
  }))));

  // Mix in some envvars and docker labels we want to add to all our containers
  return {
    env: {
      WOODEN_SHIPS_FREE_AND_EASY: true,
      I_SAW: 'the sign',
    },
    labels: {
      'io.lando.danger-factor': 11,
    },
  };
};
```

#### scripts

Nothing too fancy here. Drop a bunch of scripts ending in `.sh`, e.g. `myscript.sh`, into this directory and they will get mounted at `/helpers` in every Lando service.

#### tasks

Lando will try to load any `.js` file dropped into this directory as a "task" which in the CLI is manifested as a command. Generally, you will want to name the file the same as the task that should be invoked, e.g. `env.js` will give you a `lando env` command.

Every task has a common interface as follows:

```js
'use strict';

module.exports = lando => ({
  command: 'mycommand',
  describe: 'Does some pretty crazy shit',
  level: 'app',
  options: {
    power: {
      describe: 'Get UNLIMITED POWER!!!',
      alias: ['p'],
      default: false,
      boolean: true,
      interactive: {
        type: 'confirm',
        default: false,
        message: 'Can you handle the power?',
      },
    },
  },
  run: options => {
    if (options.power) {
      // Try to get our app
      // Run our custom app.power method after we initialized
      // NOTE: this is not a real app method, we assume the user has added it in their app.js
      const app = lando.getApp(options._app.root);
      return app.init().then(() => app.power());
    } else {
      lando.log.warn("MCFLY YOU BOJO! YOU KNOW HOVERBOARDS DON'T FLOAT ON WATER! UNLESS YOU'VE GOT POWERRRR!");
    }
  },
});
```

More details about each key are listed as follows:

**command** - This is required and follows the same syntax as the `command` in [yargs](https://yargs.js.org/docs/)

**describe** - Just a basic string to describe your command

**level** - This corresponds to the needed Lando bootstrap level. Generally, it's fine to omit this but it's *safest* to set it to `app` if you are unsure about what to do.

**options** - Options follows the syntax as `options` as in [yargs](https://yargs.js.org/docs) with one exception: `interactive`. `interactive` follows the [inquirer interface](https://github.com/SBoudrias/Inquirer.js) and does include the [autocomplete plugin](https://github.com/mokkabonna/inquirer-autocomplete-prompt). Lando also adds a `weight` property to `interface` so you can control the order with which interactive questions are asked.

**run** - This is the function that will run when the task is invoked. Note that you have access to both `options` and `lando` here.

#### compose, types, services

Lando services can now be automatically detected and loaded using our new `builder` interface and system. All you need for this to happen is have a structure similar to below:

```bash
./
|-- compose|types|services         The top level directory
    |-- myservice                  A directory containing your service
        |-- builder.js             A file that implements the lando builder interface
```

Lando builders use inheritance so that common functionality and service types can do the same thing with *way* less code.

The only difference between `compose`, `types` and `services` is that builders located in `compose` are loaded before those in `types` and builders located in `types` are loaded before those in `services`. This means that if you want a builder in `services` to extend another builder you should define that parent builder in `types` or `compose` so it is loaded beforehand and thus available for inheritance.

The builder interface is fairly straightforward, although it's often necessary to proceed up the family tree and see how parent builders treat the various options and settings as these can vastly differ from builder to builder. This definitely involves a bit of a learning curve but once learned, it enables the construction of other powerful builders extremely quickly.

An example of the `builder` interface being implemented to give Lando an `apache` service is shown below:

```js
'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'apache',
  config: {
    version: '2.4',
    supported: ['2.4'],
    patchesSupported: true,
    confSrc: __dirname,
    defaultFiles: {
      server: 'httpd.conf',
      vhosts: 'default.conf',
    },
    remoteFiles: {
      server: '/bitnami/apache/conf/httpd.conf',
      vhosts: '/bitnami/apache/conf/bitnami/bitnami.conf',
    },
    ssl: false,
    webroot: '.',
  },
  parent: '_webserver',
  builder: (parent, config) => class LandoApache extends parent {
    // id and options generally come from the users landofile
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Use different default for ssl
      if (options.ssl) options.defaultFiles.vhosts = 'default-ssl.conf';
      // Build the default stuff here
      const apache = {
        image: `bitnami/apache:${options.version}`,
        command: '/app-entrypoint.sh /run.sh',
        environment: {
          APACHE_HTTP_PORT_NUMBER: '80',
          APACHE_HTTPS_PORT_NUMBER: '443',
          APACHE_USER: 'www-data',
          APACHE_GROUP: 'www-data',
        },
        ports: ['80'],
        user: 'root',
        volumes: [
          `${options.confDest}/${options.defaultFiles.server}:${options.remoteFiles.server}`,
          `${options.confDest}/${options.defaultFiles.vhosts}:${options.remoteFiles.vhosts}`,
        ],
      };
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, apache)});
    };
  },
};
```

Some more details about each key are shown below:

**They are all required.**

**name** - A unique string identifier.

**config** - An arbitrary object of metadata that is accessible in the `builder` function. Generally, this is used to set defaults for options that are then interpreted in a parent builder.

**parent** - The `name` of a builder that this builder extends.

**builder** - This is **THE MAIN EVENT**, e.g. the actual `class` definition for your builder. It is a function that gets whatever you defined above in `config` and should only contain a `constructor`. `id` and `options` generally come from the user's Landofile. The contents of the `constructor` are up to you but it ultimately needs to call `super` with arguments that make sense to the `parent`.

#### recipes

As in the section above, `recipes` implements a similar autoload structure with one exception: you can specify an optional `init.js` file.

```bash
./
|-- recipes                        The top level directory
    |-- myrecipe                   A directory containing your recipe
        |-- builder.js             A file that implements the lando builder interface
        |-- init.js                An optional file that implements the lando init interface
```

An example of a recipe builder with helper methods removed for brevity is shown below:

```js
'use strict';

// Modules
const _ = require('lodash');
const utils = require('./../../lib/utils');

module.exports = {
  name: '_lamp',
  parent: '_recipe',
  config: {
    confSrc: __dirname,
    database: 'mysql',
    php: '7.2',
    via: 'apache',
    webroot: '.',
    xdebug: false,
  },
  builder: (parent, config) => class LandoLaemp extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);
      // Switch the proxy if needed
      if (!_.has(options, 'proxyService')) {
        if (_.startsWith(options.via, 'nginx')) options.proxyService = 'appserver_nginx';
        else if (_.startsWith(options.via, 'apache')) options.proxyService = 'appserver';
      }
      options.proxy = _.set({}, options.proxyService, [`${options.app}.${options._app._config.domain}`]);
      super(id, options);
    };
  },
};

```

An example of the `init` interface is shown below:

The `sources` property is intentionally left blank but you can check the section below for more details on that.

```js
module.exports = {
  name: 'pantheon',
  overrides: {
    name: {
      when: answers => {
        answers.name = answers['pantheon-site'];
        return false;
      },
    },
    webroot: {
      when: () => false,
    },
  },
  options: lando => ({
    'pantheon-auth': {
      describe: 'A Pantheon machine token',
      string: true,
      interactive: {
        type: 'list',
        choices: getTokens(lando.config.home, lando.cache.get(pantheonTokenCache)),
        message: 'Select a Pantheon account',
        when: answers => showTokenList(answers.recipe, lando.cache.get(pantheonTokenCache)),
        weight: 510,
      },
    },
  }),
  sources: [],
  build: (options, lando) => {},
};
```

**name** - **Required.** This *should*, but doesn't necessarily need to, match up with the name of the recipe.

**overrides** - Allows you to override any of the aux options in `lando init`. This can allow you to automatically set certain options like `recipe` and prevent them from being displayed to the user. For example, the `pantheon` source automatically sets the `recipe` to also be `pantheon`.

**options** - These are additional options you can merge into the `lando init` command. They follow the same interface as discussed in the `tasks` section above.

**build** - This is a function that will run after your source steps are executed and allows you to make any last changes before a Landofile is output. Generally, this is used to augment and modify the Lando config.

#### sources

Lando will try to load any `.js` file dropped into this directory as a "source" which is a place Lando can get code from when running `lando init`.

```js
module.exports = {
  sources: [{
    name: 'github',
    label: 'get codez from github',
    overrides: {
      recipe: {
        when: answers => {
          answers.recipe = 'myrecipe';
          return false;
        },
      },
    },
    options: lando => ({
      'github-auth': {
        describe: 'A GitHub personal access token',
        string: true,
        interactive: {
          type: 'list',
          choices: parseTokens(lando.cache.get(githubTokenCache)),
          message: 'Select a GitHub user',
          when: answers => showTokenList(answers.source, lando.cache.get(githubTokenCache)),
          weight: 110,
        },
      },
    }),
    build: (options, lando) => ([
      {name: 'generate-key', cmd: `/helpers/generate-key.sh ${gitHubLandoKey} ${gitHubLandoKeyComment}`},
      {name: 'post-key', func: (options, lando) => {
        return postKey(path.join(lando.config.userConfRoot, 'keys'), options['github-auth']);
      }},
      {name: 'clone-repo', cmd: `/helpers/get-remote-url.sh ${options['github-repo']}`},
      {name: 'set-caches', func: (options, lando) => setCaches(options, lando)},
    ]),
  }],
```

Some more details about each key are shown below:

**name** - **Required.** A unique string identifier.

**label** - A human readable way to describe your source.

**overrides** - Allows you to override any of the aux options in `lando init`. This can allow you to automatically set certain options like `recipe` and prevent them from being displayed to the user. For example, the `pantheon` source automatically sets the `recipe` to also be `pantheon`.

**options** - These are additional options you can merge into the `lando init` command. They follow the same interface as discussed in the `tasks` section above.

**build** - This is what will allow your new source to actually **DO STUFF**. It's an array of command metadata. If you specify a `cmd`, it will run inside of a special `init` service. If you specify a `func`, it will simply invoke that function.


### Plugin Examples

Check out some of our [core plugins](https://github.com/lando/lando/tree/main/plugins) for motivation in creating your own.
