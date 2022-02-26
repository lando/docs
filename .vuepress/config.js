const {path} = require('@vuepress/utils');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Documentation',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/docs',
    alias: {
      '@theme/Home.vue': path.resolve(__dirname, '..', 'components', 'Home.vue'),
    },
    sidebarHeader: {
      enabled: false,
    },
    pages: {
      contributors: {
        enabled: false,
      },
      versions: {
        enabled: false,
      },
    },
    sidebar: [
      {
        text: 'Getting Started',
        collapsible: false,
        children: [
          {
            text: 'Introduction',
            link: '/getting-started',
          },
          {
            text: 'How does it work?',
            link: '/getting-started/what-it-do.md',
          },
          {
            text: 'Installation',
            link: '/getting-started/installation.md',
          },
          {
            text: 'Starting your first app',
            link: '/getting-started/first-app.md',
          },
          {
            text: 'Updating',
            link: '/getting-started/updating.md',
          },
          {
            text: 'Uninstalling',
            link: '/getting-started/uninstalling.md',
          },
        ],
      },
      {
        text: 'Lando 101',
        collapsible: true,
        children: [
          {
            text: 'Overview',
            link: '/lando-101',
          },
          '/lando-101/lando-init.md',
          '/lando-101/lando-start.md',
          '/lando-101/lando-config.md',
          '/lando-101/lando-services.md',
          '/lando-101/lando-proxy.md',
          '/lando-101/lando-tooling.md',
        ],
      },
      {
        text: 'Contributing',
        collapsible: true,
        children: [
          '/contrib',
          '/contrib/evangelist.md',
          '/contrib/sponsoring.md',
          '/lando-101/lando-config.md',
          '/lando-101/lando-services.md',
          '/lando-101/lando-proxy.md',
          '/lando-101/lando-tooling.md',
        ],
      },
    ],
  },
};
