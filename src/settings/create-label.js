function createLabel ({ width, height, value }) {
  const textField = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  textField.setBezeled(false)
  textField.setDrawsBackground(false)
  textField.setEditable(false)
  textField.setLineBreakMode(NSLineBreakByTruncatingTail)
  textField.setSelectable(false)
  textField.setStringValue(value)
  return textField
}

module.exports = createLabel
