import execa from 'execa'
import { join } from 'path'

const sketchtoolBinaryPath = join(
  '/',
  'Applications',
  'Sketch.app',
  'Contents',
  'Resources',
  'sketchtool',
  'bin',
  'sketchtool'
)

// `runPluginCommand` is an internal module called by `run-handler` and `run-script`
export async function runPluginCommand ({
  pluginDirectoryPath,
  commandIdentifier
}) {
  const { stdout } = await execa(sketchtoolBinaryPath, [
    'run',
    pluginDirectoryPath,
    commandIdentifier
  ])
  const output = stripQuotes(stdout)
  if (output.length !== 0) {
    console.log(output)
  }
  if (hasError(output)) {
    return Promise.reject(new Error('Error'))
  }
  if (hasTestFailure(output)) {
    return Promise.reject(new Error('Test failed'))
  }
  return Promise.resolve()
}

const quotePrefixRegularExpression = /^'/g
const quotePostfixRegularExpression = /'$/g
const quoteBeforeNewlineRegularExpression = /'\n/g
const quoteAfterNewlineRegularExpression = /\n'/g
const escapedNewlineRegularExpression = /\\n/g
function stripQuotes (string) {
  return string
    .replace(quotePrefixRegularExpression, '')
    .replace(quotePostfixRegularExpression, '')
    .replace(quoteBeforeNewlineRegularExpression, '\n')
    .replace(quoteAfterNewlineRegularExpression, '\n')
    .replace(escapedNewlineRegularExpression, '\n')
}

const errorRegularExpression = /^Error: /g
function hasError (output) {
  return errorRegularExpression.test(output)
}

const failCountRegularExpression = /# fail\s+\d+/
function hasTestFailure (output) {
  return failCountRegularExpression.test(output)
}
