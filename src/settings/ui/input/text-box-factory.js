const height = 20
const bottomPadding = 15

export function textBoxFactory (transform) {
  return function ({ width, y, value, placeholder }) {
    const view = NSTextField.alloc().initWithFrame(
      NSMakeRect(0, y, width, height)
    )
    const stringValue = value == null ? '' : `${value}`
    view.setStringValue(stringValue)
    if (placeholder) {
      view.setPlaceholderString(placeholder)
    }
    return {
      view,
      height: height + bottomPadding,
      retrieveValue: function () {
        const string = `${view.stringValue()}`
        return transform ? transform(string) : string
      }
    }
  }
}
