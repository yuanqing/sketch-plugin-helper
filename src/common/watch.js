const chokidar = require('chokidar')

const build = require('./build')
const { sourceDirectory } = require('./constants')

function watch ({ isDevelopment, onReady, onChange, onSuccess }) {
  return new Promise(function (resolve, reject) {
    const watcher = chokidar.watch(sourceDirectory)
    watcher.on('ready', onReady)
    watcher.on('change', async function () {
      onChange()
      await build(isDevelopment).catch(reject)
      onSuccess()
      resolve()
    })
  })
}

module.exports = watch
