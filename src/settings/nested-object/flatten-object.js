export function flattenObject (object) {
  const result = {}
  flattenObjectHelper(object, null, result)
  return result
}

function flattenObjectHelper (object, keyPrefix, result) {
  Object.keys(object).forEach(function (key) {
    const newKey = [keyPrefix, key].filter(Boolean).join('.')
    const value = object[key]
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObjectHelper(value, newKey, result)
      return
    }
    result[newKey] = object[key]
  })
}
