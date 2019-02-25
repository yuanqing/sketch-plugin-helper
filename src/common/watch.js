const chokidar = require('chokidar')

const build = require('./build')
const { sourceDirectory } = require('./constants')

function watch () {
  return new Promise(function (resolve, reject) {
    chokidar.watch(sourceDirectory).on('all', async function () {
      await build().catch(reject)
      resolve()
    })
  })
}

module.exports = watch