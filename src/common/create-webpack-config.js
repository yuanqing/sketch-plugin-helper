const webpack = require('webpack')

const { bundleFileName, methodsFilePath } = require('./constants')

module.exports = function ({isDevelopment, outputPath}) {
  const mode = isDevelopment ? 'development' : 'production'
  return {
    mode,
    entry: methodsFilePath,
    output: {
      path: outputPath,
      filename: bundleFileName,
      libraryTarget: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'transform-loader?brfs'
        }
      ]
    },
    devtool: isDevelopment ? 'source-map' : 'none',
    target: 'node',
    externals: [
      function (context, request, callback) {
        if (/^sketch\//.test(request) || request === 'sketch') {
          return callback(null, `commonjs ${request}`)
        }
        return callback()
      },
    ],
    stats: 'minimal',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode,
      })
    ]
  }
}
