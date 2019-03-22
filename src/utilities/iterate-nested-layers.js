/* eslint-disable eqeqeq */

export default function iterateNestedLayers (layers, callback) {
  layers.forEach(function (layer) {
    callback(layer)
    const type = layer.type
    if (type == 'Artboard' || type == 'Group') {
      iterateNestedLayers(layer.layers, callback)
    }
  })
}
