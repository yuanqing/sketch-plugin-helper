const path = require('path')
const execa = require('execa')
const npmRunPath = require('npm-run-path')

const { sourceDirectory } = require('./constants')

async function lint (shouldFix) {
  npmRunPath()
  const binaryName = shouldFix ? 'prettier-standard' : 'standard'
  return execa(binaryName, [
    path.join(sourceDirectory, '/**/*.js')
  ]).stdout.pipe(process.stdout)
}

module.exports = lint
