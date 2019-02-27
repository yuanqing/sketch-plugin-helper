const readSettings = require('./read-settings')

const width = 300
const rowHeight = 20

function createLabel (value, y) {
  const label = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, y, width, rowHeight)
  )
  label.setStringValue(value)
  label.setSelectable(false)
  label.setEditable(false)
  label.setBezeled(false)
  label.setDrawsBackground(false)
  return label
}

const createForm = {
  textBox: function (value, y) {
    const form = NSTextField.alloc().initWithFrame(
      NSMakeRect(0, y, width, rowHeight)
    )
    form.setStringValue(value)
    return form
  }
}

function openSettingsDialog (title, fields) {
  const alert = COSAlertWindow.new()
  alert.setMessageText(title)
  alert.addButtonWithTitle('OK')
  alert.addButtonWithTitle('Cancel')
  const fieldHeight = rowHeight + rowHeight
  const view = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, fields.length * (fieldHeight + rowHeight))
  )
  alert.addAccessoryView(view)
  const settings = readSettings()
  const forms = fields.map(function ({ key, name, type }, index) {
    const y = index * (fieldHeight + rowHeight)
    const formLabel = createLabel(name, y + rowHeight)
    view.addSubview(formLabel)
    const formField = createForm[type](settings[key], y)
    view.addSubview(formField)
    return {
      key,
      formField
    }
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
