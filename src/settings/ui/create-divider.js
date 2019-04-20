const height = 1
const topPadding = 10
const bottomPadding = 17

export function createDivider ({ width, y }) {
  const view = NSView.alloc().initWithFrame(
    NSMakeRect(0, y + topPadding, width, height)
  )
  view.setWantsLayer(1)
  view
    .layer()
    .setBackgroundColor(
      CGColorCreateGenericRGB(127 / 255, 127 / 255, 127 / 255, 0.5)
    )
  return {
    view,
    height: topPadding + height + bottomPadding
  }
}
