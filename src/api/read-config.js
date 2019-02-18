const execa = require('execa')
const getStream = require('get-stream')
const path = require('path')
const semver = require('semver')

function getPackageJsonConfig () {
  const packageJsonPath = path.join(process.cwd(), 'package.json')
  return require(packageJsonPath).sph
}

async function readGitTags () {
  const tags = await getStream.array(execa('git', ['tag']).stdout, {
    encoding: 'utf8'
  })
  return tags.map(function (tag) {
    return semver.valid(semver.coerce(tag))
  })
}

async function readConfig () {
  const packageJsonConfig = getPackageJsonConfig()
  const gitTags = await readGitTags()
  return {
    ...packageJsonConfig,
    versions: gitTags
  }
}

module.exports = readConfig
