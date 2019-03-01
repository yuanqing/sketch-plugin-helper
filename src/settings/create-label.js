function createLabel ({ width, height, value }) {
  const label = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  label.setStringValue(value)
  label.setSelectable(false)
  label.setEditable(false)
  label.setBezeled(false)
  label.setDrawsBackground(false)
  return label
}

module.exports = createLabel
