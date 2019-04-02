import isPromise from 'is-promise'
import pEachSeries from 'p-each-series'

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
    setTimeout(runAllTests, 0)
  }
}

async function runAllTests () {
  const resultsLogger = new ResultsLogger()
  try {
    await pEachSeries(tests, async function ({ name, handler }) {
      const testSuite = new TestSuite({ name, resultsLogger })
      const result = handler(testSuite)
      if (isPromise(result)) {
        await result
      }
      testSuite.checkAssertionCounts()
      return Promise.resolve()
    })
  } catch (error) {
    throw error
  } finally {
    resultsLogger.logResultsSummary()
  }
}
