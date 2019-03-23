import { createReadStream } from 'fs'
import quoteStream from 'quote-stream'
import staticModule from 'static-module'

const modules = {
  fs: {
    readFileSync: function (file) {
      return createReadStream(file).pipe(quoteStream())
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
