import { join } from 'path'

import { runTests } from '../test-runner/run-tests'

export const test = {
  command: 'test [files..]',
  describe: 'Runs tests for the plugin',
  builder: function (yargs) {
    yargs.positional('files', {
      type: 'string',
      default: [join('src', '**', '__tests__', '*.js')]
    })
  },
  handler: async function ({ files }) {
    return runTests(files)
  }
}
