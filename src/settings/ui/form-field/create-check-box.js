const height = 20
const bottomPadding = 10

export function createCheckBox ({ width, y, label, value }) {
  const view = NSButton.alloc().initWithFrame(NSMakeRect(0, y, width, height))
  view.setButtonType(NSSwitchButton)
  view.setBezelStyle(0)
  view.setState(value ? NSOnState : NSOffState)
  view.setTitle(label)
  return {
    view: view,
    height: height + bottomPadding,
    retrieveValue: function () {
      // eslint-disable-next-line eqeqeq
      return view.stringValue() == '1'
    }
  }
}
