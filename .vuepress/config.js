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
          '/getting-started/index.md',
          '/getting-started/what-it-do.md',
          '/getting-started/installation.md',
          '/getting-started/first-app.md',
          '/getting-started/updating.md',
          '/getting-started/uninstalling.md',
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
        text: 'Guides',
        collapsible: true,
        children: [
          '/guides/access-by-other-devices.md',
          '/guides/db-export.md',
          '/guides/db-import.md',
          '/guides/external-access.md',
          '/guides/how-do-i-configure-a-lando-recipe.md',
          '/guides/how-do-i-set-the-timezone-of-a-lando-service.md',
          '/guides/lando-info.md',
          '/guides/lando-phpstorm.md',
          '/guides/lando-with-vscode.md',
          '/guides/offline-dev.md',
          '/guides/overriding-a-service-version.md',
          '/guides/setup-lando-on-windows-with-wsl-2.md',
          '/guides/updating-to-rc2.md',
        ],
      },
      {
        text: 'Troubleshooting',
        collapsible: true,
        children: [
          '/help/logs.md',
          '/help/wkbox.md',
          '/help/updating.md',
        ],
      },
      {
        text: 'Known Issues',
        collapsible: true,
        children: [
          '/help/dns-rebind.md',
          '/help/win-file-upload.md',
          '/help/file-sync.md',
          '/help/win-also-vb.md',
          '/help/proxy',
          '/help/switching-dbs.md',
        ],
      },
      {
        text: 'Contributing',
        collapsible: true,
        children: [
          '/contrib/index.md',
          '/contrib/coder.md',
          '/contrib/evangelist.md',
          '/contrib/sponsoring.md',
        ],
      },
    ],
  },
};
