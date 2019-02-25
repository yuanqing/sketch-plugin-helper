const path = require('path')

const readConfig = require('./read-config')
const writeAppcast = require('./appcast/write-appcast')
const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')

async function build (isDevelopment) {
  const config = await readConfig()
  const pluginInnerDirectoryPath = path.join(
    process.cwd(),
    `${config.pluginName}.sketchplugin`,
    'Contents',
    'Sketch'
  )
  return Promise.all([
    await writeAppcast(config),
    await writeBundle({
      config,
      isDevelopment,
      outputDirectoryPath: pluginInnerDirectoryPath
    }),
    await writeManifest({
      config,
      outputDirectoryPath: pluginInnerDirectoryPath
    })
  ])
}

module.exports = build
