const path = require('path')

const writeAppcast = require('./appcast/write-appcast')
const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')
const readConfig = require('./read-config')
const {
  methodsRelativePath,
  menuConfigRelativePath,
  actionsConfigRelativePath
} = require('./constants')

async function build () {
  const config = await readConfig()
  const methodsFilePath = path.join(process.cwd(), methodsRelativePath)
  const menuConfigFilePath = path.join(process.cwd(), menuConfigRelativePath)
  const actionsConfigFilePath = path.join(
    process.cwd(),
    actionsConfigRelativePath
  )
  const outputDirectoryPath = path.join(
    process.cwd(),
    `${config.pluginName}.sketchplugin/Contents/Sketch`
  )
  return Promise.all([
    await writeBundle({
      inputFilePath: methodsFilePath,
      outputDirectoryPath
    }),
    await writeManifest({
      methodsFilePath,
      menuConfigFilePath,
      actionsConfigFilePath,
      outputDirectoryPath,
      config
    }),
    await writeAppcast(config)
  ])
}

module.exports = build
