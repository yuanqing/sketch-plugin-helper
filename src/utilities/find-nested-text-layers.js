export function findNestedTextLayers (layers, result) {
  result = result || []
  layers.forEach(function (layer) {
    if (layer.type === 'Text') {
      result.push(layer)
      return
    }
    if (layer.type === 'Artboard' || layer.type === 'Group') {
      findNestedTextLayers(layer.layers, result)
    }
  })
  return result
}
