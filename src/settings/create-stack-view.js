function createStackView ({ width, height }) {
  const stackView = NSStackView.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  stackView.setAlignment(NSLayoutAttributeLeft)
  stackView.setOrientation(NSUserInterfaceLayoutOrientationVertical)
  stackView.setSpacing(0)
  stackView.setTranslatesAutoresizingMaskIntoConstraints(true)
  stackView.updateConstraintsForSubtreeIfNeeded()
  return stackView
}

module.exports = createStackView
