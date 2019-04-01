import dashify from 'dashify'

export function createIdentifier (parts) {
  return parts
    .map(function (part) {
      if (part.indexOf('.') !== -1 && part.indexOf('-') !== -1) {
        return part
      }
      return dashify(part)
    })
    .join('.')
}
