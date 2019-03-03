const path = require('path')
const fs = require('fs-extra')

const readAppcastVersions = require('./appcast/read-appcast-versions')
const getPackageJson = require('./get-package-json')
const { appcastFileName } = require('./constants')

async function readConfig () {
  const packageJson = getPackageJson()
  const appcastPath = path.join(process.cwd(), appcastFileName)
  const versions = (await fs.exists(appcastPath))
    ? await readAppcastVersions(appcastPath)
    : [packageJson.version]
  return {
    ...packageJson.sph,
    versions
  }
}

module.exports = readConfig
