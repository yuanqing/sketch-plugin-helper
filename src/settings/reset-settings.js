import { setSettingForKey, setSessionVariable } from 'sketch/settings'

import { flattenObject } from './nested-object/flatten-object'
import { showMessage } from '../utilities/show-message'

export function resetSettings () {
  const defaultSettings = preval.require('./get-default-settings')
  if (!defaultSettings) {
    return
  }
  const flattenedDefaultSettings = flattenObject(defaultSettings)
  Object.keys(flattenedDefaultSettings).forEach(function (key) {
    setSettingForKey(key, undefined)
    setSessionVariable(key, undefined)
  })
  showMessage('Reset settings')
}
