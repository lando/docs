import {defineUserConfig} from '@vuepress/cli';
import {defaultThemePlus} from '@lando/vuepress-theme-default-plus';
import {getDirname, path} from '@vuepress/utils';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
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
  theme: defaultThemePlus({
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: '.',
    docsBranch: 'main',
    repo: 'lando/docs',
    alias: {
      '@theme/Home.vue': path.resolve(__dirname, '..', 'components', 'HomePage.vue'),
    },
    sidebarHeader: false,
    versionsPage: false,
    contributorsPage: false,
    sidebar: [
      {
        text: 'Getting Started',
        collapsible: false,
        children: [
          '/getting-started/index.html',
          '/getting-started/what-it-do.html',
          '/getting-started/installation.html',
          '/getting-started/first-app.html',
          '/getting-started/updating.html',
          '/getting-started/uninstalling.html',
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
          '/lando-101/lando-init.html',
          '/lando-101/lando-start.html',
          '/lando-101/lando-config.html',
          '/lando-101/lando-services.html',
          '/lando-101/lando-proxy.html',
          '/lando-101/lando-tooling.html',
        ],
      },
      {
        text: 'Guides',
        collapsible: true,
        children: [
          '/guides/access-by-other-devices.html',
          '/guides/db-export.html',
          '/guides/db-import.html',
          '/guides/external-access.html',
          '/guides/how-do-i-configure-a-lando-recipe.html',
          '/guides/how-do-i-set-the-timezone-of-a-lando-service.html',
          '/guides/lando-info.html',
          '/guides/lando-phpstorm.html',
          '/guides/lando-with-vscode.html',
          '/guides/offline-dev.html',
          '/guides/overriding-a-service-version.html',
          // @TODO: rework teh below so its more accurate
          // '/guides/setup-lando-on-windows-with-wsl-2.html',
          '/guides/updating-to-rc2.html',
          '/guides/lando-corporate-network-tips.html',
          '/guides/accessibility.html',
        ],
      },
      {
        text: 'Troubleshooting',
        collapsible: true,
        children: [
          '/help/logs.html',
          '/help/wkbox.html',
          '/help/updating.html',
          '/help/purging-containers.html',
        ],
      },
      {
        text: 'Known Issues',
        collapsible: true,
        children: [
          '/help/dns-rebind.html',
          '/help/win-file-upload.html',
          '/help/file-sync.html',
          '/help/win-also-vb.html',
          '/help/proxy',
          '/help/switching-dbs.html',
        ],
      },
      {
        text: 'Contributing',
        collapsible: true,
        children: [
          '/contrib/index.html',
          '/contrib/coder.html',
          '/contrib/evangelist.html',
          '/contrib/sponsoring.html',
        ],
      },
    ],
  }),
});
