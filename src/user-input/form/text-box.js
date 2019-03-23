import { isNumber } from '../is-number'

export function textBox ({ width, height, value, placeholder }) {
  const textField = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  textField.setStringValue(`${value}`)
  if (placeholder) {
    textField.setPlaceholderString(placeholder)
  }
  const shouldCastToNumber = isNumber(value)
  return {
    view: textField,
    retrieveValue: function () {
      const string = textField.stringValue()
      // eslint-disable-next-line no-eval
      return shouldCastToNumber ? eval(string) : string
    }
  }
}
