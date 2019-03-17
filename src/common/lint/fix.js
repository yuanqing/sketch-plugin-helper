const path = require('path')
const execa = require('execa')

const { sourceDirectory } = require('../constants')

async function fix () {
  const sourceFilesGlob = path.join(sourceDirectory, '/**/*.js')
  return execa('prettier-standard', [sourceFilesGlob]).stdout.pipe(
    process.stdout
  )
}

module.exports = fix
