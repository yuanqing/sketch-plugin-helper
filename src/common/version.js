import { update } from 'mversion'
import semver from 'semver'

import { readConfig } from './read-config'
import { writeAppcast } from './appcast/write-appcast'

export async function version (releaseType) {
  const config = await readConfig()
  const newVersion = semver.inc(config.versions[0], releaseType)
  return Promise.all([
    updateAppcast(newVersion, config),
    new Promise(function (resolve) {
      update(newVersion, resolve)
    })
  ])
}

function updateAppcast (newVersion, config) {
  const newConfig = {
    ...config,
    versions: [newVersion].concat(config.versions)
  }
  return writeAppcast(newConfig)
}
