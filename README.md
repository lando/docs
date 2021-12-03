# Lando Docs

This repo contains the [documentation site](https://docs.lando.dev) for [Lando](https://lando.dev).

## Issues, Questions and Support

If you have a question or would like some community support we recommend you [join us on Slack](https://launchpass.com/devwithlando). Note that this is the Slack community for [Lando](https://lando.dev) but we are more than happy to help with this module as well!

If you'd like to report a bug or submit a feature request then please [use the issue queue](https://github.com/lando/docs/issues/new/choose) in this repo.

## Changelog

We try to log all changes big and small in both [THE CHANGELOG](https://github.com/lando/docs/blob/main/CHANGELOG.md) and the [release notes](https://github.com/lando/docs/releases).


## Development

* Requires [Node 14+](https://nodejs.org/dist/latest-v14.x/)
* Prefers [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

```bash
git clone https://github.com/lando/docs.git && cd docs
yarn install
```

If you dont' want to install Node 14 or Yarn for whatever reason you can install [Lando](https://docs.lando.dev/basics/installation.html) and use that:

```bash
git clone https://github.com/lando/docs.git && cd docs
# Install deps and get node
lando start

# Run commands
lando node
lando yarn
```

## Testing

```bash
# Lint the code
yarn lint
```

## Releasing

```bash
yarn release
```

## Contributors

<a href="https://github.com/lando/docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lando/docs" />
</a>

Made with [contributors-img](https://contrib.rocks).

## Other Resources

* [Important advice](https://www.youtube.com/watch?v=WA4iX5D9Z64)
