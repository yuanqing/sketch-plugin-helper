/* eslint-disable eqeqeq */

export function adjustParentGroupsToFit (layer) {
  adjustParentGroupsToFitHelper(layer, {})
}

function adjustParentGroupsToFitHelper (layer, adjustedGroupIds) {
  const parent = layer.parent
  if (parent && parent.type == 'Group' && !adjustedGroupIds[parent.id]) {
    parent.adjustToFit()
    adjustedGroupIds[parent.id] = true
    adjustParentGroupsToFitHelper(parent, adjustedGroupIds)
  }
}
