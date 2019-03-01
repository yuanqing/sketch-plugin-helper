function textBox ({ width, height, value }) {
  const form = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  form.setStringValue(value)
  return form
}

module.exports = {
  textBox
}
