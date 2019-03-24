export function textBox (transform) {
  return function ({ width, height, value, placeholder }) {
    const textField = NSTextField.alloc().initWithFrame(
      NSMakeRect(0, 0, width, height)
    )
    const stringValue = value == null ? '' : `${value}`
    textField.setStringValue(stringValue)
    if (placeholder) {
      textField.setPlaceholderString(placeholder)
    }
    return {
      view: textField,
      retrieveValue: function () {
        const string = `${textField.stringValue()}`
        return transform ? transform(string) : string
      }
    }
  }
}
