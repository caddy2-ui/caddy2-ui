// @ts-check
require('dotenv').config()

const path = require('path')
const alias = require('./tsconfig.alias').alias

const MONACO_DIR = path.join(__dirname, './node_modules/monaco-editor')

module.exports = {
  poweredByHeader: false,
  pageExtensions: ["page.tsx", "api.ts"],
  webpack: (config, options) => {
    const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
    
    for (let name in alias) {
      let dir = alias[name]
      config.resolve.alias[name] = path.join(__dirname, dir)
    }

    config.plugins = config.plugins || []

    config.module.rules.push({
      test: /\.css$/,
      include: MONACO_DIR,
      use: ['style-loader', 'css-loader'],
    })
    config.plugins.push(
      new MonacoWebpackPlugin({
        output: '../public/monaco-editor',
        baseUrl: '/monaco-editor',
        languages: ["json"],
      })
    )

    return config

  },
}
