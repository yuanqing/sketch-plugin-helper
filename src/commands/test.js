import { runTests } from '../test-runner/run-tests'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const test = {
  command: 'test',
  describe: 'Runs tests for the plugin',
  handler: async function () {
    log.info('Running tests…')
    await runTests().catch(errorHandler)
    log.success('Tests passed')
    return Promise.resolve()
  }
}
