import { setImmediate } from '@skpm/timers'

import { ResultsLogger } from './results-logger'
import { TestSuite } from './test-suite'

const tests = []
let isQueued = false

export function test (name, handler) {
  tests.push({
    name,
    handler
  })
  if (!isQueued) {
    isQueued = true
    setImmediate(runAllTests)
  }
}

function runAllTests () {
  const resultsLogger = new ResultsLogger()
  try {
    tests.map(function ({ name, handler }) {
      const testSuite = new TestSuite({ name, resultsLogger })
      handler(testSuite)
      testSuite.checkAssertionCounts()
    })
  } catch (error) {
    throw error
  } finally {
    resultsLogger.logPlan()
    resultsLogger.end()
  }
}
