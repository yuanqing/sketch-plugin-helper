const readSettings = require('./read-settings')

const width = 300
const rowHeight = 20
const padding = 10

function createLabel (value, y, parentHeight) {
  const label = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, parentHeight - y - rowHeight, width, rowHeight)
  )
  label.setStringValue(value)
  label.setSelectable(false)
  label.setEditable(false)
  label.setBezeled(false)
  label.setDrawsBackground(false)
  return label
}

const createForm = {
  textBox: function (value, y, parentHeight) {
    const form = NSTextField.alloc().initWithFrame(
      NSMakeRect(0, parentHeight - y - rowHeight, width, rowHeight)
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
  const fieldHeight = (rowHeight * 2) + padding
  const viewHeight = fields.length * fieldHeight
  const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, viewHeight))
  alert.addAccessoryView(view)
  const settings = readSettings()
  const forms = fields.map(function ({ key, name, type }, index) {
    const y = index * fieldHeight
    const formLabel = createLabel(name, y, viewHeight)
    view.addSubview(formLabel)
    const formField = createForm[type](settings[key], y + rowHeight, viewHeight)
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
