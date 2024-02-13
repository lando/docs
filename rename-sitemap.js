const fs = require('fs');
const path = require('path');

const oldPath = path.join(__dirname, '.vitepress', 'dist', 'sitemap.xml');
const newPath = path.join(__dirname, '.vitepress', 'dist', 'docs-sitemap.xml');

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error('Error renaming sitemap.xml:', err);
    process.exit(1);
  }
  console.log('sitemap.xml has been renamed to new-sitemap.xml');
});
