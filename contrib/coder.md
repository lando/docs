---
description: Learn about how to get started contributing code to Lando.
---

# Coding

This section is designed for people who want to contribute `code things` to Lando. Specifically, that might mean working on some of the following:

* Lando itself and its plugins
* Lando's DevOps pipeline e.g. build, test and deploy
* Lando's tests and testing infrastructure
* Lando's documentation and Vuepress documentation site
* Lando's express API
* Lando's marketing website
* Lando's metrics server
* Lando's Vuepress marketing site
* Lando's Vuepress events listing
* Lando's Vuepress blog

[[toc]]

## Choosing a project

Lando has a distributed model and is powered by over [50 repos](https://github.com/lando) so the first step is to find a repo you are interested in and check out the contribution guidelines there.

## Good First Issues

Once you are set up and ready to contribute, a good place to start is with issues tagged as [good first issue](https://github.com/lando/lando/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). Peruse the list and see if one or more of those issues is a good fit for you.

If you are having issues with any of the above or need some guidance from one of our guide pros, make sure you [join our Slack org](https://www.launchpass.com/devwithlando) and check out the **#community** and/or **#contributors** channels.

## Triaging issues

Welcome intrepid Lando contributor! Thank you for joining the alliance and jumping on the front lines to triage issues!

Issue triage is incredibly important to the project. Good handling of issue reports from our users leads to folks sticking around and getting all the benefits that Lando has to offer, becoming contributors themselves, and improving the overall health and sustainability of the project.

When a user files an issue, they're probably either filled with hope and energy about improving the project, or frustration caused by their expectations not lining up with their experience. Both of these energies are valuable when channeled correctly, and damaging when mismanaged.

Behind every issue is a person taking the time to fill out the report when they could have simply remained silent. They could have left their good ideas on the shelf, thrown Lando in the trash, or needlessly struggled in silence.

With all this in mind, treat issue reporters with respect, assume good will, and ask for clarification when needed. The extra energy you put in here to show kindness and compassion can be the difference between steering the project towards growth and sustainability or stagnation and burnout.

Now that you're equipped with the laser sword of empathy and the armor of respect, this is the standard procedure you should go through to triage an issue.

### Requirements

1. A Github account
2. [Install Lando](/install) (So you can reproduce issues)

### Classify the Issue

The first step in triaging an issue is to decide if the issue is a _bug report_, _feature request_, _documentation request_, or a _guide request_.

Our issue templates will hopefully help to pre-categorize issues for us, but use your discretion to recategorize issues that may have come in under the wrong label. It's not uncommon for a user to assume that their issue is a bug when it is really a need to improve documentation, or even for a user to assume they've done something wrong when they've actually just discovered a bug for us!

Review the issue and recategorize as necessary.

### Bug Reports

If the user is reporting that something isn't working as documented, or something generally appears to be broken, it should be classified as a bug report.

The first thing you want to do is to check the report against our [bug reporting template](https://github.com/lando/lando/blob/main/.github/ISSUE_TEMPLATE/bug_report.md).

The most important thing we need for a good bug report are reliable steps to reproduce the issue. If the user has included steps to replicate, you should first try to replicate the bug.

If you do nothing else, this is the most valuable thing you can do for Lando maintainers. It can sometimes be time consuming, but making sure we can replicate a bug saves massive amounts of time for the intrepid developer who attempts to fix the bug. It helps us to write clear functional tests and spend less time fixing the bug.

Once steps to reproduce have been ironed out, the issue should be tagged as `triaged`.

If you can't reproduce the issue, tag it with `can not replicate` and let the user know that you are unable to replicate the issue. If you can think of additional information that might be helpful, request it in your comment. Non-reproducable issues will remain unscheduled until they are closed by a maintainer or stalebot.

### Feature Requests

If the user is asking for something that Lando currently doesn't do, this is a feature request. If the user wants Lando to add a new command to our API, a new service, recipe, tooling command, or support a new operating system we don't currently support, this is a feature request.

Refer to the [feature request template](https://github.com/lando/lando/blob/main/.github/ISSUE_TEMPLATE/feature_request.md) to see what kind of data we want from the user. If their report is missing one of these areas, it might be helpful to ask them questions about the areas that need clarification.

New feature requests will be regularly reviewed by the maintainers and scheduled, iceboxed, or closed as appropriate, as long as the request is something you can understand, it can be reviewed by a maintainer at a later date. If it seems unclear, it would be helpful to ask clarifying questions from the requester so that the issue is fully fleshed out when a maintainer is able to review it.

### Documentation Requests

Documentation requests should be tagged with `documentation` and checked against the [documentation issue template](https://github.com/lando/lando/blob/main/.github/ISSUE_TEMPLATE/documentation.md).

If a reference page isn't included, try to find the right page in the documentation that addresses the topic at hand and add a link to the page in the issue. If there is no suitable page, a new one will need to be created.

## Writing Plugins

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

**command** - This is required and follows the [same syntax](https://yargs.js.org/docs/#api-reference-commandcmd-desc-builder-handler) as in [yargs](http://yargs.js.org/)

**describe** - Just a basic string to describe your command

**level** - This corresponds to the needed Lando bootstrap level. Generally, it's fine to omit this but it's *safest* to set it to `app` if you are unsure about what to do.

**options** - Options follows the [same interface](https://yargs.js.org/docs/#api-reference-optionskey-opt) as in [yargs](http://yargs.js.org/) with one exception: `interactive`. `interactive` follows the [inquirer interface](https://github.com/SBoudrias/Inquirer.js) and does include the [autocomplete plugin](https://github.com/mokkabonna/inquirer-autocomplete-prompt). Lando also adds a `weight` property to `interface` so you can control the order with which interactive questions are asked.

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
