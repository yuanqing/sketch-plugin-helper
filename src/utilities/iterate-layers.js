export function iterateNestedLayers (layers, callback) {
  layers.forEach(function (layer) {
    callback(layer)
    const type = layer.type
    if (type === 'Artboard' || type === 'Group') {
      iterateNestedLayers(layer.layers, callback)
    }
  })
}

export function iterateParentLayers (layer, callback) {
  while (layer.parent != null && layer.parent.type !== 'Page') {
    callback(layer.parent)
    layer = layer.parent
  }
}
