export function compareSketchDocuments (a, b) {
  return compare(a.toJSON(), b.toJSON())
}

function compare (a, b) {
  if (isObject(a) && isObject(b)) {
    return compareObjects(a, b)
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArrays(a, b)
  }
  if (
    (typeof a === 'boolean' && typeof b === 'boolean') ||
    (typeof a === 'number' && typeof b === 'number') ||
    (typeof a === 'string' && typeof b === 'string')
  ) {
    return a === b
  }
  return a == null && b == null
}

function isObject (x) {
  return typeof x === 'object' && !!x && x.constructor === Object
}

const IGNORED_KEYS = {
  id: true,
  includedLayerIds: true,
  libraryID: true,
  objectID: true,
  path: true,
  sharedStyleId: true,
  symbolID: true
}

function compareObjects (a, b) {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.reduce(function (result, key) {
    if (!result) {
      return false
    }
    if (IGNORED_KEYS[key]) {
      return result
    }
    return compare(a[key], b[key])
  }, true)
}

function compareArrays (a, b) {
  if (a.length !== b.length) {
    return false
  }
  return a.reduce(function (result, value, i) {
    if (!result) {
      return false
    }
    return compare(value, b[i])
  }, true)
}
