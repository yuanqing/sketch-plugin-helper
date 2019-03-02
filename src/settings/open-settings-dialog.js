const createStackView = require('./create-stack-view')
const createAlert = require('./create-alert')
const createLabel = require('./create-label')
const formFactory = require('./form-factory')
const readSettings = require('./read-settings')

const width = 300
const height = 20
const paddingSmall = 6
const paddingLarge = 12

function openSettingsDialog (title, fields) {
  const stackView = createStackView({
    width,
    height:
      fields.length * (height + paddingSmall + height + paddingLarge) -
      paddingLarge
  })
  const alert = createAlert(title)
  alert.setAccessoryView(stackView)
  const settings = readSettings()
  const forms = fields.map(function ({ key, name, type, ...rest }, index) {
    const createFormField = formFactory[type]
    return {
      key,
      formLabel: createLabel({ value: name, width, height }),
      formField: createFormField({
        value: settings[key],
        width,
        height,
        ...rest
      })
    }
  })
  forms.forEach(function ({ formLabel, formField }) {
    if (formLabel) {
      stackView.addView_inGravity_(formLabel, NSStackViewGravityTop)
      stackView.setCustomSpacing_afterView_(paddingSmall, formLabel)
    }
    stackView.addView_inGravity_(formField, NSStackViewGravityTop)
    stackView.setCustomSpacing_afterView_(paddingLarge, formField)
  })
  if (alert.runModal() === '1000') {
    return forms.reduce(function (result, { key, formField }) {
      result[key] = retrieveValue(formField)
      return result
    }, {})
  }
  return null
}

function retrieveValue (field) {
  if (field.className() === 'NSMatrix') {
    return field.cells().indexOfObject(field.selectedCell())
  }
  return field.stringValue()
}

module.exports = openSettingsDialog
