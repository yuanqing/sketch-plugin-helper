import dashify from 'dashify'

export function createCommandIdentifier ({ pluginIdentifier, handlerName }) {
  return createIdentifier([pluginIdentifier, ...handlerName.split('/')])
}

export function createActionIdentifier ({
  pluginIdentifier,
  handlerName,
  actionName
}) {
  return createIdentifier([
    pluginIdentifier,
    dashify(handlerName),
    dashify(actionName)
  ])
}

function createIdentifier (parts) {
  return parts
    .map(function (part) {
      if (part.indexOf('.') !== -1 && part.indexOf('-') !== -1) {
        return part
      }
      return dashify(part)
    })
    .join('.')
}
