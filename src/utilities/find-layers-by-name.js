import { getLayersOnCurrentPage } from './get-layer'
import { iterateNestedLayers } from './iterate-nested-layers'

export function findLayersByName (name) {
  const result = []
  iterateNestedLayers(getLayersOnCurrentPage(), function (layer) {
    if (layer.name === name) {
      result.push(layer)
    }
  })
  return result
}
