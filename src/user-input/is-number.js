export function isNumber (object) {
  return typeof object === 'number' && isFinite(object)
}
