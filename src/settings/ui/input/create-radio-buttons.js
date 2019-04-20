const height = 20
const bottomPadding = 10

export function createRadioButtons ({ width, y, value, possibleValues }) {
  const buttonCell = NSButtonCell.alloc().init()
  buttonCell.setButtonType(NSRadioButton)
  const length = possibleValues.length
  const view = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, y, width, height),
    NSRadioModeMatrix,
    buttonCell,
    1,
    length
  )
  view.setCellSize(CGSizeMake(Math.floor(width / length), height))
  const cells = view.cells()
  cells.forEach(function (cell, index) {
    cell.setTitle(possibleValues[index])
  })
  const index = typeof value !== 'undefined' ? possibleValues.indexOf(value) : 0
  view.selectCellAtRow_column(0, index)
  return {
    view,
    height: height + bottomPadding,
    retrieveValue: function () {
      const index = view.cells().indexOfObject(view.selectedCell())
      return possibleValues[index]
    }
  }
}
