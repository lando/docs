import {createRequire} from 'module';

import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const require = createRequire(import.meta.url);

const {version} = require('../package.json');

export default defineConfig({
  title: 'Lando',
  description: 'Documentation.',
  landoDocs: 3,
  base: '/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'}],
  ],
  themeConfig: {
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            {text: 'Introduction', link: '/getting-started/index'},
            {text: 'How does it work?', link: '/getting-started/what-it-do'},
            {text: 'Installation', link: '/getting-started/installation'},
            {text: 'Starting your first app', link: '/getting-started/first-app'},
            {text: 'Updating', link: '/getting-started/updating'},
            {text: 'Uninstalling', link: '/getting-started/uninstalling'},
          ],
        },
        {
          text: 'Lando 101',
          collapsed: true,
          items: [
            {text: 'Overview', link: '/lando-101/index'},
            {text: 'Lando Init', link: '/lando-101/lando-init'},
            {text: 'Lando Start', link: '/lando-101/lando-start'},
            {text: 'Lando Configure', link: '/lando-101/lando-config'},
            {text: 'Lando Services', link: '/lando-101/lando-services'},
            {text: 'Lando Proxy', link: '/lando-101/lando-proxy'},
            {text: 'Lando Tooling', link: '/lando-101/lando-tooling'},
          ],
        },
        {
          text: 'Guides',
          collapsed: true,
          items: [
            {"link": "/guides/access-by-other-devices.html", "text": "Accessing Lando from Other Devices on Your Local Network"},
            {"link": "/guides/db-export.html", "text": "SQL Export"},
            {"link": "/guides/db-import.html", "text": "SQL Import"},
            {"link": "/guides/external-access.html", "text": "Accessing Your Services Externally"},
            {"link": "/guides/how-do-i-configure-a-lando-recipe.html", "text": "How do I configure a Lando Recipe?"},
            {"link": "/guides/how-do-i-set-the-timezone-of-a-lando-service.html", "text": "How do I set the timezone of a Lando service?"},
            {"link": "/guides/lando-info.html", "text": "Using $LANDO_INFO"},
            {"link": "/guides/lando-phpstorm.html", "text": "Lando + PhpStorm + Xdebug"},
            {"link": "/guides/lando-with-vscode.html", "text": "Using Lando with VSCode"},
            {"link": "/guides/offline-dev.html", "text": "Developing offline"},
            {"link": "/guides/overriding-a-service-version.html", "text": "Overriding a Service Version or Image"},
            {"link": "/guides/updating-to-rc2.html", "text": "Updating to 3.0.0-rc.2+"},
            {"link": "/guides/lando-corporate-network-tips.html", "text": "Lando in Corporate Network Environments"},
            {"link": "/guides/accessibility.html", "text": "Accessibility and Lando"}
          ],
        },
        {
          text: 'Troubleshooting',
          collapsed: true,
          items: [
            {"link": "/help/logs.html", "text": "Accessing Logs"},
            {"link": "/help/wkbox.html", "text": "Using Lando with Kalabox"},
            {"link": "/help/updating.html", "text": "Updating"},
            {"link": "/help/purging-containers.html", "text": "Purging Containers"},
            {"link": "/help/dns-rebind.html", "text": "DNS Rebinding Protection"},
            {"link": "/help/win-file-upload.html", "text": "Uploading Files in Windows"},
            {"link": "/help/file-sync.html", "text": "File syncing issues"},
            {"link": "/help/win-also-vb.html", "text": "Windows is also running VirtualBox"},
            {"link": "/help/proxy", "text": "Running Lando behind a Proxy"},
            {"link": "/help/switching-dbs.html", "text": "Switching Database Configuration"}
          ],
        },
        {
          text: 'Contributing',
          collapsed: true,
          items: [
            {"link": "/contrib/index.html", "text": "Getting Involved"},
            {"link": "/contrib/coder.html", "text": "Coding"},
            {"link": "/contrib/evangelist.html", "text": "Evangelizing"},
            {"link": "/contrib/sponsoring.html", "text": "Sponsoring"}
          ],
        },
      ],
    },
  },
});

function configSideBar() {
  return [
    {
      text: 'Theme Configuration',
      collapsed: false,
      items: [
        {text: 'Configuration', link: '/config/config'},
        {text: 'Frontmatter', link: '/config/frontmatter'},
        {text: 'useCollection()', link: '/composables/use-collection'},
        {text: 'useTeam()', link: '/composables/use-team'},
      ],
    },
    {
      text: 'Pages',
      collapsed: false,
      items: [
        {text: 'Collections', link: '/pages/collections'},
        {text: 'Teams', link: '/pages/teams'},
      ],
    },
    {
      text: 'Global Components',
      collapsed: false,
      items: [
        {text: 'Jobs', link: '/components/jobs'},
        {text: 'MailChimp', link: '/components/mailchimp'},
        {text: 'Sponsor', link: '/components/sponsors'},
        {text: 'YouTube', link: '/components/youtube'},
      ],
    },
    {
      text: 'Markdown Containers',
      collapsed: false,
      items: [
        {text: 'Admonitions', link: '/markdown/admonitions'},
        {text: 'Alignments', link: '/markdown/alignments'},
        {text: 'Boxes', link: '/markdown/boxes'},
        {text: 'Cards', link: '/markdown/cards'},
        {text: 'Columns', link: '/markdown/columns'},
        {text: 'Highlights', link: '/markdown/highlights'},
        {text: 'Tabs', link: '/markdown/tabs'},
        {text: 'Thumbnails', link: '/markdown/thumbnails'},
        {text: 'Advanced', link: '/guides/advanced-markdown'},
      ],
    },
    {text: 'Blog', link: '/blog'},
    {text: 'Guides', link: '/guides'},
  ];
}
