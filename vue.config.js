const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack")
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = defineConfig({
  // transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: ['.ts'],
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
      fallback: {
        zlib: require.resolve("browserify-zlib"),
        path: require.resolve("path-browserify"),
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser', 
        Buffer: ['buffer', 'Buffer']
      })
    ],
    externals: {
      Web3: 'Web3',
      SimplexNoise: 'simplex-noise',
      // ethers: require('ethers')
    }
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(true), // 修复热更新失效
    config.entry('main').add('babel-polyfill') // main是入口js文件
  
  },
  css: {
    // extract: false
  },
  devServer: {
    https: true,
    allowedHosts: 'all',
    // https: true,
    proxy: {//配置跨域
      '/may': {
          target: 'https://webapi.nftscan.com',
          // ws: true,
          changeOrigin: true,//允许跨域
          pathRewrite: {
              '^/may': '/may'//请求的时候使用这个api就可以
          }
      }
  }
}
})
