import { setSettingForKey, setSessionVariable } from 'sketch/settings'
import { showMessage } from '../utilities/show-message'

export function resetSettings () {
  const defaultSettings = preval.require('./get-default-settings')
  if (!defaultSettings) {
    return
  }
  Object.keys(defaultSettings).forEach(function (key) {
    setSettingForKey(key, undefined)
    setSessionVariable(key, undefined)
  })
  showMessage('Reset settings')
}
