import { runTests } from '../test-runner/run-tests'

export const test = {
  command: 'test',
  describe: 'Runs tests for the plugin',
  handler: async function () {
    return runTests()
  }
}
