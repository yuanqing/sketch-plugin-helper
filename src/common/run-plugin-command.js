import { spawn } from 'child_process'
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

export function runPluginCommand ({
  pluginDirectoryPath,
  commandIdentifier,
  shouldRunInBackground
}) {
  return new Promise(function (resolve, reject) {
    const child = spawn(sketchtoolBinaryPath, [
      'run',
      pluginDirectoryPath,
      commandIdentifier,
      ...[shouldRunInBackground && '--without-activating']
    ])
    child.stdout.on('data', function (chunk) {
      console.log(stripQuotes(chunk.toString()))
    })
    child.stderr.pipe(process.stderr)
    child.on('exit', resolve)
    child.on('error', reject)
  })
}

const QUOTE_PREFIX = /^'/g
const QUOTE_POSTFIX = /'$/g
const QUOTE_BEFORE_NEWLINE = /'\n/g
const QUOTE_AFTER_NEWLINE = /\n'/g
const ESCAPED_NEWLINE = /\\n/g

function stripQuotes (string) {
  return string
    .replace(QUOTE_PREFIX, '')
    .replace(QUOTE_POSTFIX, '')
    .replace(QUOTE_BEFORE_NEWLINE, '\n')
    .replace(QUOTE_AFTER_NEWLINE, '\n')
    .replace(ESCAPED_NEWLINE, '\n')
}
