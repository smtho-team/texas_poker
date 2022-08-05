const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack")
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.BASE_URL,
  devServer: {
    // https: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        stream: "stream-browserify",
        crypto: "crypto-browserify",
        assert: "assert",
        http: "stream-http",
        https: "https-browserify",
        url: "url",
        process: "process/browser",
        buffer: "buffer",
        os: "os-browserify/browser",
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser', 
        Buffer: ['buffer', 'Buffer']
      })
    ]
  }
})
