// next.config.js
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  /* config options here */
  cssLoaderOptions: {
    url: false
  }
})