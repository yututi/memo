const { description } = require('../../package')

const path = require("path")
const fs = require("fs")

var root = path.resolve(__dirname, "../")
const getChildren = src => {
  return fs.readdirSync(src);
}
var docs = getChildren(root).filter(doc => doc != ".vuepress" && fs.lstatSync(path.join(root, doc)).isDirectory());
var nav = docs.map(doc => {
  return {
    text: doc,
    link: `/${doc}/`,
  }
});
var sidebar = nav.reduce((_sidebar, nav) => {
  var childrenDoc = getChildren(path.join(root, nav.text)).filter(doc => doc != "README.md").map(doc => doc.replace(".md", ""));
  childrenDoc.unshift("")
  _sidebar[nav.link] = childrenDoc;
  return _sidebar;
}, {});

console.log(sidebar)

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '個人メモ',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: nav,
    sidebar: sidebar
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
