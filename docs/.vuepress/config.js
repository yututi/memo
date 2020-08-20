const { description } = require('../../package')

const path = require("path")
const fs = require("fs")

var root = path.resolve(__dirname, "../")
const getChildren = src => {
  return fs.readdirSync(src);
}
var isDirectory = _path => fs.lstatSync(_path).isDirectory();

function createTree(link, actualPath, excludes) {
  var tree = {
    name: link,
    isFile: false,
    isDirectory: true,
    children: []
  };
  var children = getChildren(actualPath).filter(child => !excludes.some(exclude => exclude == child));
  children.forEach(child => {
    var childPath = path.join(actualPath, child);
    if (isDirectory(childPath)) {
      tree.children.push(createTree(child, childPath, excludes));
    } else {
      tree.children.push({
        name: child,
        isFile: true,
        isDirectory: false,
        children: []
      })
    }
  });
  return tree;
};


var tree = createTree("", root, [".vuepress", "README.md"]);

// 深さ1のノードをnavbarに表示
var nav = tree.children.map(topNode => {
  var topNodeName = topNode.name.replace(".md", "")
  return {
    text: topNodeName,
    items: topNode.children.map(secondLayerNode => {
      var secondLayerNodeName = secondLayerNode.name.replace(".md", "")
      return {
        text: secondLayerNodeName,
        link: `/${topNodeName}/${secondLayerNodeName}/`,
      }
    })
  }
});


function appendSidebarItem(tree, parentLink, actualParentLink, configObj) {
  var nodes = [];
  tree.children.forEach(child => {
    if (child.isFile) {
      nodes.push(actualParentLink ? actualParentLink + "/" + child.name.replace(".md", "") : child.name.replace(".md", ""));
    } else {
      if (parentLink) {
        var isUnderSidebarSubItem = parentLink.split("/").length == 2;
        var link, actualLink;
        if (isUnderSidebarSubItem) {
          link = parentLink;
          actualLink = actualParentLink ? actualParentLink + "/" + child.name : child.name;
        }
        else {
          link = `${parentLink}/${child.name}`;
          actualLink = "";
        }
        appendSidebarItem(
          child,
          link,
          actualLink,
          configObj);
      }
      // ルートの場合
      else {
        appendSidebarItem(child, child.name, actualParentLink, configObj);
      }
    }
  });
  var key = `/${parentLink}/`;
  if (nodes.length) {
    if (configObj[key]) {
      configObj[key] = configObj[key].concat(nodes);
    } else if (parentLink) {
      configObj[key] = nodes;
    }
  }
}

var sidebarItem = {};
appendSidebarItem(tree, "", "", sidebarItem);


module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'メモ帳',
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
    ['meta', { name: 'theme-color', content: '#3b8eff' }],
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
    sidebar: sidebarItem,
    nextLinks: false,
    prevLinks: false,
    smoothScroll: true
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
