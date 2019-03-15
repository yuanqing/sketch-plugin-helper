/* eslint-disable eqeqeq */

const createAlert = require('./create-alert')
const createLabel = require('./create-label')
const createStackView = require('./create-stack-view')
const createInput = require('./input/create-input')
const readSettings = require('./read-settings')
const {
  inputHeight,
  inputPaddingBottom,
  labelHeight,
  labelPaddingBottom,
  width
} = require('./dimensions')

function openSettingsDialog ({ title, inputs: inputsConfig }) {
  const settings = readSettings()
  const { inputs, views, stackViewHeight } = parse({ inputsConfig, settings })
  const stackView = createStackView({
    width,
    height: stackViewHeight,
    views
  })
  const alert = createAlert(title)
  alert.setAccessoryView(stackView)
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
  inputsConfig.forEach(function ({ type, key, label, ...rest }) {
    if (label && type != 'CHECK_BOX') {
      const labelView = createLabel({ label, width, height: labelHeight })
      views.push({
        view: labelView,
        paddingBottom: labelPaddingBottom
      })
      stackViewHeight += labelHeight + labelPaddingBottom
    }
    const value = settings[key]
    const { view, retrieveValue } = createInput[type]({
      label,
      value,
      width,
      height: inputHeight,
      ...rest
    })
    views.push({
      view,
      paddingBottom: inputPaddingBottom
    })
    stackViewHeight += inputHeight + inputPaddingBottom
    inputs[key] = retrieveValue
  })
  stackViewHeight -= inputPaddingBottom
  return {
    inputs,
    views,
    stackViewHeight
  }
}

module.exports = openSettingsDialog
