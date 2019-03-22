export default function isNumber (object) {
  return typeof object === 'number' && isFinite(object)
}
