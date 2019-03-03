function radioButtons (values, activeIndex, x, y, width, height) {
  const buttonFormat = NSButtonCell.alloc().init()
  buttonFormat.setButtonType(NSRadioButton)
  const length = values.length
  const matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(x, y, width, height),
    NSRadioModeMatrix,
    buttonFormat,
    1,
    length
  )
  matrixFormat.setCellSize(CGSizeMake(width / length, height))
  const cells = matrixFormat.cells()
  let i = -1
  while (++i < length) {
    cells.objectAtIndex(i).setTitle(values[i])
  }
  matrixFormat.selectCellAtRow_column(0, activeIndex)
  return matrixFormat
}

module.exports = radioButtons
