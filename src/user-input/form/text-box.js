export default function textBox ({ width, height, value, placeholder }) {
  const textField = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  textField.setStringValue(value)
  if (placeholder) {
    textField.setPlaceholderString(placeholder)
  }
  return {
    view: textField,
    retrieveValue: function () {
      return textField.stringValue()
    }
  }
}
