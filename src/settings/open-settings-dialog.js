const createStackView = require('./create-stack-view')
const createAlert = require('./create-alert')
const createLabel = require('./create-label')
const fieldFactory = require('./field-factory')
const readSettings = require('./read-settings')

const width = 300
const labelHeight = 20
const labelPaddingBottom = 6
const fieldHeight = 20
const fieldPaddingBottom = 12

function openSettingsDialog (title, fieldsConfig) {
  const settings = readSettings()
  const { fields, views, stackViewHeight } = parseFieldsConfig(
    fieldsConfig,
    settings
  )
  const stackView = createStackView({
    width,
    height: stackViewHeight,
    views
  })
  const alert = createAlert(title)
  alert.setAccessoryView(stackView)
  if (alert.runModal() === '1000') {
    return Object.keys(fields).reduce(function (result, key) {
      const retrieveValue = fields[key]
      result[key] = retrieveValue()
      return result
    }, {})
  }
  return null
}

function parseFieldsConfig (fieldsConfig, settings) {
  const fields = {}
  const views = []
  let stackViewHeight = 0
  fieldsConfig.forEach(function ({ type, key, label, ...rest }) {
    const labelView = createLabel({ label, width, height: labelHeight })
    if (labelView) {
      views.push({
        view: labelView,
        paddingBottom: labelPaddingBottom
      })
      stackViewHeight += labelHeight + labelPaddingBottom
    }
    const value = settings[key]
    const createField = fieldFactory[type]
    const { view, retrieveValue } = createField({
      value,
      width,
      height: fieldHeight,
      ...rest
    })
    views.push({
      view,
      paddingBottom: fieldPaddingBottom
    })
    stackViewHeight += fieldHeight + fieldPaddingBottom
    fields[key] = retrieveValue
  })
  stackViewHeight -= fieldPaddingBottom
  return {
    fields,
    views,
    stackViewHeight
  }
}

module.exports = openSettingsDialog
