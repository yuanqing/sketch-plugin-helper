import isPromise from 'is-promise'
import pEachSeries from 'p-each-series'

import { compareSketchDocuments } from './compare-sketch-documents'
import { openDocument } from '../utilities/document'
import { ResultsLogger } from './results-logger'
import { TestSuite } from './test-suite'

const tests = []
let isQueued = false

export function test (...args) {
  const length = args.length
  if (length !== 3 && length !== 4) {
    throw new Error('Incorrect number of arguments passed to `test`')
  }
  if (length === 3) {
    const [name, expectedAssertionCount, handler] = args
    tests.push({
      name,
      expectedAssertionCount,
      handler
    })
  }
  if (length === 4) {
    const [name, inputDocumentPath, expectedOutputFilePath, handler] = args
    tests.push({
      name,
      expectedAssertionCount: 1,
      handler: createFileComparisonTestHandler({
        inputDocumentPath,
        expectedOutputFilePath,
        handler
      })
    })
  }
  if (!isQueued) {
    isQueued = true
    setTimeout(async function () {
      await runAllTests().catch(function (error) {
        throw error
      })
    }, 0)
  }
}

function createFileComparisonTestHandler ({
  inputDocumentPath,
  expectedOutputFilePath,
  handler
}) {
  return async function (t) {
    const inputDocument = await openDocument(inputDocumentPath)
    handler(inputDocument)
    const expectedOutputDocument = await openDocument(expectedOutputFilePath)
    t.true(compareSketchDocuments(inputDocument, expectedOutputDocument))
    inputDocument.close()
    expectedOutputDocument.close()
  }
}

async function runAllTests () {
  const resultsLogger = new ResultsLogger()
  await pEachSeries(tests, async function ({
    name,
    expectedAssertionCount,
    handler
  }) {
    const testSuite = new TestSuite({
      name,
      expectedAssertionCount,
      resultsLogger
    })
    const result = handler(testSuite)
    if (isPromise(result)) {
      await result
    }
    testSuite.checkAssertionCounts()
    return Promise.resolve()
  }).finally(function () {
    resultsLogger.logResultsSummary()
    if (resultsLogger.isFail()) {
      throw new Error('Tests failed')
    }
  })
}
