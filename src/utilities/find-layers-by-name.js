import { getAllLayers } from './get-layers'
import { iterateNestedLayers } from './iterate-nested-layers'

export function findLayersByName (name) {
  const result = []
  iterateNestedLayers(getAllLayers(), function (layer) {
    if (layer.name === name) {
      result.push(layer)
    }
  })
  return result
}
