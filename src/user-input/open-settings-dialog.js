import { createAlert } from './form/create-alert'
import { createLabel } from './form/create-label'
import { createStackView } from './form/create-stack-view'
import * as createForm from './form/create-form'
import { getSettings } from './get-settings'

const formHeight = 20
const formPaddingBottom = 12
const labelHeight = 20
const labelPaddingBottom = 6
const width = 300

export function openSettingsDialog ({ title, inputs: inputsConfig }) {
  const settings = getSettings()
  const { inputs, views, stackViewHeight } = parse({
    inputsConfig,
    settings
  })
  const stackView = createStackView({
    width,
    height: stackViewHeight,
    views
  })
  const alert = createAlert(title)
  alert.setAccessoryView(stackView)
  // eslint-disable-next-line eqeqeq
  if (alert.runModal() == '1000') {
    return Object.keys(inputs).reduce(function (result, key) {
      const retrieveValue = inputs[key]
      result[key] = retrieveValue()
      return result
    }, {})
  }
  return null
}

function parse ({ inputsConfig, settings }) {
  const inputs = {}
  const views = []
  let stackViewHeight = 0
  inputsConfig.forEach(function ({
    type,
    key,
    label,
    value: inputsConfigValue,
    ...rest
  }) {
    if (label && type !== 'CHECK_BOX') {
      // Create a label for forms that aren't check boxes
      const labelView = createLabel({ label, width, height: labelHeight })
      views.push({
        view: labelView,
        paddingBottom: labelPaddingBottom
      })
      stackViewHeight += labelHeight + labelPaddingBottom
    }
    const settingsSavedValue = settings[key]
    const value =
      typeof settingsSavedValue !== 'undefined'
        ? settingsSavedValue
        : inputsConfigValue
    const { view, retrieveValue } = createForm[type]({
      label,
      value,
      width,
      height: formHeight,
      ...rest
    })
    views.push({
      view,
      paddingBottom: formPaddingBottom
    })
    stackViewHeight += formHeight + formPaddingBottom
    inputs[key] = retrieveValue
  })
  stackViewHeight -= formPaddingBottom
  return {
    inputs,
    views,
    stackViewHeight
  }
}
