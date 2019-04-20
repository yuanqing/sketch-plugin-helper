const topPadding = 2
const height = 20
const bottomPadding = 2

export function createLabel ({ width, y, label }) {
  const view = NSTextField.alloc().initWithFrame(
    NSMakeRect(0, y + topPadding, width, height)
  )
  view.setBezeled(false)
  view.setDrawsBackground(false)
  view.setEditable(false)
  view.setLineBreakMode(NSLineBreakByTruncatingTail)
  view.setSelectable(false)
  view.setStringValue(label)
  return {
    view,
    height: topPadding + height + bottomPadding
  }
}
