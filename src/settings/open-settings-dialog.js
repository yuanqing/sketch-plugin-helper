const readSettings = require('./read-settings')

const width = 200
const rowHeight = 20

const createForm = {
  textBox: function (value, y) {
    const form = NSTextField.alloc().initWithFrame(
      NSMakeRect(0, 0, width, rowHeight)
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
  const view = NSView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, fields.length * rowHeight)
  )
  alert.addAccessoryView(view)
  const settings = readSettings()
  const forms = fields.map(function ({ type, key }, index) {
    const form = createForm[type](settings[key], index * rowHeight)
    view.addSubview(form)
    return {
      key,
      form
    }
  })
  if (alert.runModal() === '1000') {
    return forms.reduce(function (result, { key, form }) {
      result[key] = retrieveValue(form)
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
