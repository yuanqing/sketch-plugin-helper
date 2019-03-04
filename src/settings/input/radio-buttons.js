function radioButtons ({ width, height, value, possibleValues }) {
  const buttonFormat = NSButtonCell.alloc().init()
  buttonFormat.setButtonType(NSRadioButton)
  const length = possibleValues.length
  const matrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, 0, width, height),
    NSRadioModeMatrix,
    buttonFormat,
    1,
    length
  )
  matrix.setCellSize(CGSizeMake(Math.floor(width / length), height))
  const cells = matrix.cells()
  cells.forEach(function (cell, index) {
    cell.setTitle(possibleValues[index])
  })
  const index = possibleValues.indexOf(value)
  matrix.selectCellAtRow_column(0, index)
  return {
    view: matrix,
    retrieveValue: function () {
      const index = matrix.cells().indexOfObject(matrix.selectedCell())
      return possibleValues[index]
    }
  }
}

module.exports = radioButtons
