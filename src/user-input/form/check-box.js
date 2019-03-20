/* eslint-disable eqeqeq */

function checkBox ({ width, height, label, value }) {
  const checkBox = NSButton.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  checkBox.setButtonType(NSSwitchButton)
  checkBox.setBezelStyle(0)
  checkBox.setState(value ? NSOnState : NSOffState)
  checkBox.setTitle(label)
  return {
    view: checkBox,
    retrieveValue: function () {
      return checkBox.stringValue() == '1'
    }
  }
}

module.exports = checkBox
