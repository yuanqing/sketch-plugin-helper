function createStackView ({ width, height, views }) {
  const stackView = NSStackView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  stackView.setAlignment(NSLayoutAttributeLeft)
  stackView.setOrientation(NSUserInterfaceLayoutOrientationVertical)
  stackView.setSpacing(0)
  stackView.setTranslatesAutoresizingMaskIntoConstraints(true)
  stackView.updateConstraintsForSubtreeIfNeeded()
  views.forEach(function ({ view, paddingBottom }) {
    stackView.addView_inGravity_(view, NSStackViewGravityTop)
    stackView.setCustomSpacing_afterView_(paddingBottom, view)
  })
  return stackView
}

module.exports = createStackView
