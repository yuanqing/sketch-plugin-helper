const height = 20
const bottomPadding = 15

export function createDropDown ({ width, y, value, possibleValues }) {
  const view = NSPopUpButton.alloc().initWithFrame(
    NSMakeRect(0, y, width, height)
  )
  possibleValues.forEach(function (value) {
    view.addItemWithTitle(`${value}`)
  })
  const index = typeof value !== 'undefined' ? possibleValues.indexOf(value) : 0
  view.selectItemAtIndex(index)
  return {
    view,
    height: height + bottomPadding,
    retrieveValue: function () {
      const index = view.indexOfSelectedItem()
      return possibleValues[index]
    }
  }
}
