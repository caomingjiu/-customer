module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
  },
  devServer: {
    host: 'localhost',
    port: 8077,
    https: false,
    open: true,
    hotOnly: true,
  },

  outputDir: './dist',
  assetsDir: './assets/',
  publicPath: './',
  indexPath: './index.html',
  transpileDependencies: ['vuetify'],
}
