import { getPageLayers } from './get-layers'

export function findLayersByName (name) {
  return getPageLayers().filter(function (layer) {
    return layer.name === name
  })
}
