function retrieveValue (field) {
  if (field.className() == 'NSMatrix') {
    return field.cells().indexOfObject(field.selectedCell())
  }
  return field.stringValue()
}

function createSettingsDialog () {
  const alert = COSAlertWindow.new()
  alert.setMessageText('Extract Text')
  alert.addButtonWithTitle('OK')
  alert.addButtonWithTitle('Cancel')
  const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 200, 200))
  alert.addAccessoryView(view)

  const textInput = NSTextField.alloc().initWithFrame(NSMakeRect(0, 0, 100, 20))
  textInput.setStringValue('foo')
  view.addSubview(textInput)

  if (alert.runModal() == '1000') {
    return {
      foo: retrieveValue(textInput)
    }
  }
  return null
}

module.exports = createSettingsDialog