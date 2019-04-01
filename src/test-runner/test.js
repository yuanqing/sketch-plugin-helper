import { setImmediate } from '@skpm/timers'

import { ResultsLogger } from './results-logger'

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

class TestSuite {
  constructor ({ name, resultsLogger }) {
    this.expectedCount = null
    this.actualCount = 0
    this.failed = false
    this.resultsLogger = resultsLogger
    this.resultsLogger.logTestName(name)
  }
  assertionPassed () {
    this.actualCount += 1
    this.resultsLogger.logAssertionPassed()
    if (this.actualCount > this.expectedCount) {
      this.failed = true
      this.resultsLogger.logAssertionFailed('plan != count')
    }
  }
  assertionFailed () {
    this.actualCount += 1
    this.resultsLogger.logAssertionFailed()
  }
  plan (count) {
    if (this.expectedCount === null) {
      this.expectedCount = count
      return
    }
    this.resultsLogger.logAssertionFailed('plan called twice')
  }
  true (object) {
    if (object === true) {
      this.assertionPassed()
      return
    }
    this.assertionFailed()
  }
  checkAssertionCounts () {
    if (this.failed === false && this.actualCount !== this.expectedCount) {
      this.resultsLogger.logAssertionFailed('plan != count')
    }
  }
}
