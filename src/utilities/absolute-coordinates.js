export function getAbsoluteCoordinates (layer) {
  const parentArtboard = layer.getParentArtboard()
  if (typeof parentArtboard !== 'undefined') {
    return getAbsoluteCoordinatesRelativeToParent(layer, parentArtboard)
  }
  const parentGroup = layer.parent
  if (typeof parentGroup !== 'undefined') {
    return getAbsoluteCoordinatesRelativeToParent(layer, parentGroup)
  }
  return {
    x: layer.frame.x,
    y: layer.frame.y
  }
}

function getAbsoluteCoordinatesRelativeToParent (layer, parent) {
  return {
    x: parent.frame.x + layer.frame.x,
    y: parent.frame.y + layer.frame.y
  }
}
