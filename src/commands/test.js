import { join } from 'path'

import { runTests } from '../test-runner/run-tests'

export const test = {
  command: 'test [pattern]',
  describe: 'Runs tests for your plugin',
  builder: function (yargs) {
    yargs.positional('pattern', {
      type: 'string',
      default: join('src', '**', '__tests__', '*.js')
    })
  },
  handler: async function ({ pattern }) {
    return runTests(pattern)
  }
}
