const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-index-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/templates/blog-index.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/templates/blog-post.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/pages/404.js"))),
  "component---src-pages-confirm-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/pages/confirm.js"))),
  "component---src-pages-react-components-unsubscribed-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/pages/react-components-unsubscribed.js"))),
  "component---src-pages-thanks-js": hot(preferDefault(require("/Users/fengqijun/Documents/workspace/jun1st-blog/src/pages/thanks.js")))
}

