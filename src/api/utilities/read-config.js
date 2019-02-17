const path = require('path')

async function readConfig () {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  return {
    ...require(packageJsonPath).sph,
    versions: ['0.0.1']
  }
}

module.exports = readConfig
