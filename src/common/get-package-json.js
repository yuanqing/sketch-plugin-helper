const packageJson = require('fs').readFileSync('./package.json', 'utf8')
module.exports = JSON.parse(packageJson)
