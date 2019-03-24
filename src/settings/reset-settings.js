import { setSettingForKey, setSessionVariable } from 'sketch/settings'
import { showMessage } from '../utilities/show-message'

import { packageJsonConfigKey } from '../common/constants'
import { getPackageJson } from '../common/get-package-json'

export function resetSettings () {
  const { defaultSettings } = getPackageJson()[packageJsonConfigKey]
  if (typeof defaultSettings === 'undefined') {
    return
  }
  Object.keys(defaultSettings).forEach(function (key) {
    setSettingForKey(key, undefined)
    setSessionVariable(key, undefined)
  })
  showMessage('Reset settings')
}
