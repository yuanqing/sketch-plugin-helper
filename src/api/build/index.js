const path = require('path')

const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')
const readConfig = require('../utilities/read-config')

const methodsRelativePath = 'src/index.js'
const menuConfigRelativePath = 'src/menu.js'
const bundleFileName = 'bundle.js'
const manifestFileName = 'manifest.json'

async function build () {
  const config = await readConfig()
  const methodsFilePath = path.join(process.cwd(), methodsRelativePath)
  const menuConfigFilePath = path.join(process.cwd(), menuConfigRelativePath)
  const outputDirectoryPath = path.join(
    process.cwd(),
    `${config.pluginName}.sketchplugin/Contents/Sketch`
  )
  return Promise.all([
    await writeBundle({
      inputFilePath: methodsFilePath,
      outputDirectoryPath,
      outputFileName: bundleFileName
    }),
    await writeManifest({
      methodsFilePath,
      menuConfigFilePath,
      outputDirectoryPath,
      outputFileName: manifestFileName,
      bundleFileName,
      config
    })
  ])
}

module.exports = build
