const path = require('path')

const writeAppcast = require('./appcast/write-appcast')
const writeBundle = require('./write-bundle')
const writeManifest = require('./write-manifest')
const readConfig = require('./read-config')

const methodsRelativePath = 'src/index.js'
const menuConfigRelativePath = 'src/menu.js'
const bundleFileName = 'bundle.js'
const manifestFileName = 'manifest.json'
const appcastFileName = 'appcast.xml'

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
    }),
    await writeAppcast({
      outputDirectoryPath: process.cwd(),
      outputFileName: appcastFileName,
      config
    })
  ])
}

module.exports = build
