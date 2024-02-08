import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const hat = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>';

export default defineConfig({
  title: 'Lando',
  description: 'Documentation',
  landoDocs: 3,
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml'}],
  ],
  themeConfig: {
    collections: {
      guide: {
        frontmatter: {
          collection: 'guide',
        },
        icon: hat,
        iconLink: '/guides',
        patterns: ['guides/**/*.md', 'getting-started/updating.md', 'getting-started/uninstalling.md'],
      },
      lando101: {
        frontmatter: {
          collection: 'lando101',
        },
        icon: hat,
        iconLink: '/lando101',
        patterns: ['lando-101/**/*.md'],
      },
      post: {
        frontmatter: {
          collection: 'post',
          contributors: false,
          backLink: {
            text: '<- Back to blog',
            link: '/blog',
          },
          aside: false,
          sidebar: false,
          prev: false,
          next: false,
          editLink: false,
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>',
        iconLink: '/blog',
        patterns: ['blog/**/*.md'],
      },
      troubleshooting: {
        frontmatter: {
          collection: 'troubleshooting',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>',
        iconLink: '/troubleshooting',
        patterns: ['help/**/*.md', 'troubleshooting/**/*.md'],
      },
    },
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            {text: 'What it do?', link: '/getting-started/'},
            {text: 'How does it work?', link: '/getting-started/what-it-do'},
            {text: 'Starting your first app', link: '/getting-started/first-app'},
            {text: 'Requirements', link: '/getting-started/requirements'},
          ],
        },
        {
          text: 'Installation',
          collapsed: false,
          items: [
            {text: 'macOS', link: '/install/macos'},
            {text: 'Linux', link: '/install/linux'},
            {text: 'Windows', link: '/install/windows'},
            {text: 'GitHub Actions', link: '/install/gha'},
            {text: 'Source', link: '/install/source'},
          ],
        },
        {
          text: 'Help & Support',
          collapsed: false,
          items: [
            {text: 'GitHub', link: 'https://github.com/lando/dotnet/issues/new/choose'},
            {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
            {text: 'Contact Us', link: '/support'},
            {text: 'Troubleshooting', link: '/troubleshooting'},
          ],
        },
        {
          text: 'Contributing',
          collapsed: true,
          items: [
            {text: 'Getting Involved', link: '/contrib/index.html'},
            {text: 'Coding', link: '/contrib/coder.html'},
            {text: 'Evangelizing', link: '/contrib/evangelist.html'},
            {text: 'Sponsoring', link: '/contrib/sponsoring.html'},
          ],
        },
        {
          text: 'Lando 101',
          link: '/lando-101',
        },
        {
          text: 'Guides',
          link: '/guides',
        },
        {
          text: 'Examples',
          link: 'https://github.com/lando/core/tree/main/examples',
        },
      ],
    },
  },
});

// function configSideBar() {
//   return [
//     {
//       text: 'Theme Configuration',
//       collapsed: false,
//       items: [
//         {text: 'Configuration', link: '/config/config'},
//         {text: 'Frontmatter', link: '/config/frontmatter'},
//         {text: 'useCollection()', link: '/composables/use-collection'},
//         {text: 'useTeam()', link: '/composables/use-team'},
//       ],
//     },
//     {
//       text: 'Pages',
//       collapsed: false,
//       items: [
//         {text: 'Collections', link: '/pages/collections'},
//         {text: 'Teams', link: '/pages/teams'},
//       ],
//     },
//     {
//       text: 'Global Components',
//       collapsed: false,
//       items: [
//         {text: 'Jobs', link: '/components/jobs'},
//         {text: 'MailChimp', link: '/components/mailchimp'},
//         {text: 'Sponsor', link: '/components/sponsors'},
//         {text: 'YouTube', link: '/components/youtube'},
//       ],
//     },
//     {
//       text: 'Markdown Containers',
//       collapsed: false,
//       items: [
//         {text: 'Admonitions', link: '/markdown/admonitions'},
//         {text: 'Alignments', link: '/markdown/alignments'},
//         {text: 'Boxes', link: '/markdown/boxes'},
//         {text: 'Cards', link: '/markdown/cards'},
//         {text: 'Columns', link: '/markdown/columns'},
//         {text: 'Highlights', link: '/markdown/highlights'},
//         {text: 'Tabs', link: '/markdown/tabs'},
//         {text: 'Thumbnails', link: '/markdown/thumbnails'},
//         {text: 'Advanced', link: '/guides/advanced-markdown'},
//       ],
//     },
//     {text: 'Blog', link: '/blog'},
//     {text: 'Guides', link: '/guides'},
//   ];
// }
