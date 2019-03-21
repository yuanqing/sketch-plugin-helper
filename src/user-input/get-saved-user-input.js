import Settings from 'sketch/settings'

import { packageJsonConfigKey } from '../common/constants'
import getPackageJson from '../common/get-package-json'

export default function getSavedUserInput () {
  const { defaults } = getPackageJson()[packageJsonConfigKey]
  return Object.keys(defaults).reduce(function (results, key) {
    const savedSetting = Settings.settingForKey(key)
    results[key] =
      typeof savedSetting !== 'undefined' ? savedSetting : defaults[key]
    return results
  }, {})
}
