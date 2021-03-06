import { createAlert } from './ui/create-alert'
import { createDivider } from './ui/create-divider'
import { createLabel } from './ui/create-label'
import * as createFormField from './ui/create-form-field'
import { getSettings } from './get-settings'
import { flattenObject } from './nested-object/flatten-object'
import { unflattenObject } from './nested-object/unflatten-object'

const width = 300

export function openSettingsDialog (title, formFieldsConfig, defaultSettings) {
  const settings = flattenObject(getSettings(defaultSettings))
  const { formView, retrieveValues } = createFormView(
    formFieldsConfig.filter(Boolean),
    settings
  )
  const alert = createAlert(title || 'Settings')
  alert.setAccessoryView(formView)
  const subviews = formView.subviews()
  if (subviews[0]) {
    // set focus to be on the first form element
    alert.window().setInitialFirstResponder(subviews[0])
  }
  // eslint-disable-next-line eqeqeq
  if (alert.runModal() == '1000') {
    const result = {}
    Object.keys(retrieveValues).forEach(function (key) {
      const retrieveValue = retrieveValues[key]
      result[key] = retrieveValue()
    })
    return unflattenObject(result)
  }
  return null
}

function createFormView (formFieldsConfig, settings) {
  const formView = NSView.alloc().init()
  formView.setFlipped(true)
  const retrieveValues = {}
  let y = 0
  formFieldsConfig.forEach(function (formFieldConfig) {
    if (formFieldConfig === '-') {
      const { view, height } = createDivider({
        width,
        y
      })
      y += height
      formView.addSubview(view)
      return
    }
    const {
      type,
      key,
      label,
      value: formFieldConfigValue,
      ...rest
    } = formFieldConfig
    if (label && type !== 'CHECK_BOX') {
      // Create a label for forms that aren't check boxes
      const { view, height } = createLabel({
        width,
        y,
        label
      })
      y += height
      formView.addSubview(view)
    }
    const settingsSavedValue = settings[key]
    const value =
      formFieldConfigValue != null ? formFieldConfigValue : settingsSavedValue
    const { view, height, retrieveValue } = createFormField[type]({
      width,
      y,
      label,
      value,
      ...rest
    })
    y += height
    formView.addSubview(view)
    retrieveValues[key] = retrieveValue
  })
  const subviews = formView.subviews()
  subviews.forEach(function (subview, index) {
    if (index < subviews.length - 1) {
      subview.setNextKeyView(subviews[index + 1])
    }
  })
  formView.setFrame(NSMakeRect(0, 0, width, y))
  return {
    formView,
    retrieveValues
  }
}
