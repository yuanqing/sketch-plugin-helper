/* eslint-disable eqeqeq */

import { getSavedUserInput } from './get-saved-user-input'
const createAlert = require('./create-alert')
const createLabel = require('./create-label')
const createStackView = require('./create-stack-view')
const createForm = require('./form/create-form')
const {
  formHeight,
  formPaddingBottom,
  labelHeight,
  labelPaddingBottom,
  width
} = require('./dimensions')

export function openUserInputDialog ({ title, inputs: inputsConfig }) {
  const savedUserInput = getSavedUserInput()
  const { inputs, views, stackViewHeight } = parse({
    inputsConfig,
    savedUserInput
  })
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

function parse ({ inputsConfig, savedUserInput }) {
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
    const value = savedUserInput[key]
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
