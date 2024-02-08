import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

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
      help: {
        frontmatter: {
          collection: 'help',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
        iconLink: '/help',
        patterns: ['help/**/*.md'],
      },
      guide: {
        frontmatter: {
          collection: 'guide',
        },
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>',
        iconLink: '/guides',
        patterns: ['guides/**/*.md'],
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
            // {text: 'Updating', link: '/install/updating'},
            // {text: 'Uninstalling', link: '/install/uninstalling'},
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
          text: 'Help & Support',
          collapsed: true,
          items: [
            {text: 'GitHub', link: 'https://github.com/lando/dotnet/issues/new/choose'},
            {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
            {text: 'Contact Us', link: '/support'},
            {text: 'Troubleshooting', link: '/help'},
          ],
        },
        {
          text: 'Lando 101',
          link: '/lando-101/',
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
