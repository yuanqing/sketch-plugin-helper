import { createReadStream } from 'fs'
import quoteStream from 'quote-stream'
import staticModule from 'static-module'
import { Transform } from 'stream'

const whitespaceRegularExpression = /\n\s+/g

const modules = {
  fs: {
    readFileSync: function (file) {
      const throughStream = new Transform({
        transform: function (chunk, encoding, callback) {
          callback(
            null,
            chunk.toString().replace(whitespaceRegularExpression, '')
          )
        }
      })
      return createReadStream(file)
        .pipe(throughStream)
        .pipe(quoteStream())
    }
  }
}

const options = {
  parserOpts: {
    sourceType: 'module'
  }
}

function inlineFsReadFileSyncTransform () {
  return staticModule(modules, options)
}

module.exports = inlineFsReadFileSyncTransform
