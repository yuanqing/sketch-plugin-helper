const mversionUpdate = require('util').promisify(require('mversion').update)
const semver = require('semver')

const readConfig = require('./read-config')
const writeAppcast = require('./appcast/write-appcast')

async function version (releaseType) {
  const config = await readConfig()
  const newVersion = semver.inc(config.versions[0], releaseType)
  return Promise.all([
    updateAppcast(newVersion, config),
    mversionUpdate(newVersion)
  ])
}

function updateAppcast (newVersion, config) {
  const newConfig = {
    ...config,
    versions: [newVersion].concat(config.versions)
  }
  return writeAppcast(newConfig)
}

module.exports = version
