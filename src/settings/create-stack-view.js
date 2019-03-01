function createStackView ({ width, height }) {
  const stackView = NSStackView.alloc().init()
  stackView.setSpacing(0)
  stackView.setOrientation(NSUserInterfaceLayoutOrientationVertical)
  stackView.setFrame(NSMakeRect(0, 0, width, height))
  stackView.setAlignment(NSLayoutAttributeLeft)
  stackView.setTranslatesAutoresizingMaskIntoConstraints(true)
  stackView.updateConstraintsForSubtreeIfNeeded()
  return stackView
}

module.exports = createStackView
