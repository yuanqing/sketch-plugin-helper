const dotRegularExpression = /\./

export function unflattenObject (object) {
  const result = {}
  Object.keys(object).forEach(function (key) {
    const keys = key.split(dotRegularExpression)
    const value = object[key]
    unflattenObjectHelper(keys, value, result)
  })
  return result
}

function unflattenObjectHelper (keys, value, result) {
  const key = keys[0]
  if (keys.length === 1) {
    result[key] = value
    return
  }
  if (result[key] == null) {
    result[key] = {}
  }
  unflattenObjectHelper(keys.slice(1), value, result[key])
}
