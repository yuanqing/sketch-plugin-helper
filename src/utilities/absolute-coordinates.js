export function getAbsoluteCoordinates (layer) {
  return getAbsoluteCoordinatesHelper(layer, {
    x: layer.frame.x,
    y: layer.frame.y
  })
}

function getAbsoluteCoordinatesHelper (layer, result) {
  const parent = layer.parent
  if (parent.type === 'Page') {
    return result
  }
  const newResult = {
    x: result.x + parent.frame.x,
    y: result.y + parent.frame.y
  }
  if (parent.type === 'Artboard') {
    return newResult
  }
  return getAbsoluteCoordinatesHelper(parent, newResult)
}
