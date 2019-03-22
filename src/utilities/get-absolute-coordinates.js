export default function getAbsoluteCoordinates (layer) {
  const { x, y } = layer.frame
  const parentArtboard = layer.getParentArtboard(layer)
  if (typeof parentArtboard === 'undefined') {
    return { x, y }
  }
  const parentArtboardFrame = parentArtboard.frame
  return {
    x: parentArtboardFrame.x + x,
    y: parentArtboardFrame.y + y
  }
}
