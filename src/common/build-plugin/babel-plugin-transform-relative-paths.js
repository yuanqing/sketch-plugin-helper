import { isStringLiteral, stringLiteral } from '@babel/types'
import { dirname, isAbsolute, join, resolve } from 'path'

export default function () {
  return {
    visitor: {
      CallExpression: function ({ node }, state) {
        const callee = node.callee
        const sourceFilePath = state.file.opts.filename
        if (callee.name === 'test' && node.arguments.length === 4) {
          node.arguments[1] = createAbsolutePath(
            node.arguments[1],
            sourceFilePath
          )
          node.arguments[2] = createAbsolutePath(
            node.arguments[2],
            sourceFilePath
          )
          return
        }
        if (callee.name === 'openDocument') {
          node.arguments[0] = createAbsolutePath(
            node.arguments[0],
            sourceFilePath
          )
        }
      }
    }
  }
}

function createAbsolutePath (arg, sourceFilePath) {
  if (!isStringLiteral(arg) || isAbsolute(arg.value)) {
    return arg
  }
  const parentDirectoryPath = dirname(resolve(sourceFilePath))
  return stringLiteral(join(parentDirectoryPath, arg.value))
}
