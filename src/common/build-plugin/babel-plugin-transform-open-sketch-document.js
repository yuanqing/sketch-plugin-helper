import { dirname, isAbsolute, join, resolve } from 'path'

export default function ({ types: t }) {
  return {
    visitor: {
      CallExpression: function (path, state) {
        const callee = path.node.callee
        if (!t.isIdentifier(callee) || callee.name !== 'openSketchDocument') {
          return
        }
        const sketchDocumentAbsolutePath = createAbsolutePath({
          sketchDocumentPath: path.node.arguments[0].value,
          sourceFilePath: state.file.opts.filename
        })
        path.node.arguments[0] = t.stringLiteral(sketchDocumentAbsolutePath)
      }
    }
  }
}

function createAbsolutePath ({ sketchDocumentPath, sourceFilePath }) {
  if (isAbsolute(sketchDocumentPath)) {
    return sketchDocumentPath
  }
  const parentDirectoryPath = dirname(resolve(sourceFilePath))
  return join(parentDirectoryPath, sketchDocumentPath)
}
