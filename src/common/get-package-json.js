function getPackageJson () {
  const packageJson = require('fs').readFileSync('./package.json', 'utf8')
  return JSON.parse(packageJson)
}

module.exports = getPackageJson
