# Lando Docs

This repo contains the [documentation site](https://docs.lando.dev) for [Lando](https://lando.dev). That said Lando is comprised of various constituent projects that are all combined together. So while this _is_ the main site you should think about it more as the "glue" that combines various subsites together into a cohesive docs expereince. Said more plainly. if you are looking to update the docs on say the Lagoon recipe then you should do so in the [Lagoon repo](https://github.com/lando/lagoon/tree/main/docs).

Here is a non-exhaustive list of some of the other docs subsites:

* https://github.com/lando/cli/tree/main/docs
* https://github.com/lando/core/tree/main/docs
* https://github.com/lando/php/tree/main/docs
* https://github.com/lando/pantheon/tree/main/docs

However, it's best to just search for the repo you are looking for in the main [Lando org](https://github.com/lando) and consult its `README` on how to update its docs.

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando). Note that this is the Slack community for [Lando](https://lando.dev) but we are more than happy to help with this module as well!

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/docs/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/docs/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/docs/releases).

## Development

* Requires [Node 18+](https://nodejs.org/dist/latest-v18.x/)

```bash
git clone https://github.com/lando/docs.git && cd docs
```

### Using Node/Yarn

```bash
# Install deps
npm install

# Launch dev site
npm run dev

# Lint
npm run lint

# Build site
npm run build
```

## Releasing

To deploy and publish a new version of the package to the `npm` registry you need only [create a release on GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) with a [semver](https://semver.org) tag.

Note that prereleases will get pushed to the `edge` tag on the `npm` registry.

## Maintainers

* [@pirog](https://github.com/pirog)
* [@reynoldsalec](https://github.com/reynoldsalec)

## Contributors

<a href="https://github.com/lando/docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/docs" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Resources

* [Important advice](https://www.youtube.com/watch?v=WA4iX5D9Z64)
* Other stuff
