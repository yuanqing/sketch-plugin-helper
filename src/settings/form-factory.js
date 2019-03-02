function textBox ({ width, height, value, placeholder }) {
  const form = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  form.setStringValue(value)
  if (placeholder) {
    form.setPlaceholderString(placeholder)
  }
  return form
}

module.exports = {
  textBox
}
