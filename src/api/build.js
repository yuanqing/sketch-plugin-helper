const path = require('path')

const writeAppcast = require('./appcast/write-appcast')
const readConfig = require('./read-config')
const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')

async function build () {
  const config = await readConfig()
  const pluginDirectoryPath = path.join(
    process.cwd(),
    `${config.pluginName}.sketchplugin/Contents/Sketch`
  )
  return Promise.all([
    await writeAppcast(config),
    await writeBundle(pluginDirectoryPath),
    await writeManifest({
      outputDirectoryPath: pluginDirectoryPath,
      config
    })
  ])
}

module.exports = build
