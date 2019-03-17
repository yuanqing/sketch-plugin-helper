const execa = require('execa')
const path = require('path')

const { sourceDirectory } = require('../constants')

async function lint () {
  const eslintConfigPath = path.join(__dirname, 'eslintrc.json')
  const sourceFilesGlob = path.join(sourceDirectory, '/**/*.js')
  return execa('eslint', [
    '--config',
    eslintConfigPath,
    sourceFilesGlob
  ]).stdout.pipe(process.stdout)
}

module.exports = lint
