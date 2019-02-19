const path = require('path')

const writeAppcast = require('./appcast/write-appcast')
const readConfig = require('./read-config')
const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')
const {
  actionsConfigRelativePath,
  menuConfigRelativePath,
  methodsRelativePath
} = require('./constants')

async function build () {
  const config = await readConfig()
  const actionsConfigFilePath = path.join(
    process.cwd(),
    actionsConfigRelativePath
  )
  const methodsFilePath = path.join(process.cwd(), methodsRelativePath)
  const menuConfigFilePath = path.join(process.cwd(), menuConfigRelativePath)
  const pluginDirectoryPath = path.join(
    process.cwd(),
    `${config.pluginName}.sketchplugin/Contents/Sketch`
  )
  return Promise.all([
    await writeAppcast(config),
    await writeBundle({
      inputFilePath: methodsFilePath,
      outputDirectoryPath: pluginDirectoryPath
    }),
    await writeManifest({
      actionsConfigFilePath,
      menuConfigFilePath,
      methodsFilePath,
      outputDirectoryPath: pluginDirectoryPath,
      config
    })
  ])
}

module.exports = build
