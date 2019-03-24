export function dropDown ({ width, height, value, possibleValues }) {
  const popUpButton = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  possibleValues.forEach(function (value) {
    popUpButton.addItemWithTitle(value)
  })
  const index = typeof value !== 'undefined' ? possibleValues.indexOf(value) : 0
  popUpButton.selectItemAtIndex(index)
  return {
    view: popUpButton,
    retrieveValue: function () {
      const index = popUpButton.indexOfSelectedItem()
      return possibleValues[index]
    }
  }
}
