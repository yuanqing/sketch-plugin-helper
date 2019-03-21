export default function dropDown ({ width, height, value, possibleValues }) {
  const popUpButton = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(0, 0, width, height)
  )
  possibleValues.forEach(function (value) {
    popUpButton.addItemWithTitle(value)
  })
  const index = possibleValues.indexOf(value)
  popUpButton.selectItemAtIndex(index)
  return {
    view: popUpButton,
    retrieveValue: function () {
      const index = popUpButton.indexOfSelectedItem()
      return possibleValues[index]
    }
  }
}
