import { resolve } from 'path'

import { executeShellCommand } from '../execute-shell-command'
import { sourceGlobPattern } from '../constants'

export function lint () {
  const eslintConfigPath = resolve(__dirname, '..', '..', '.eslintrc.json')
  return executeShellCommand('eslint', [
    '--config',
    eslintConfigPath,
    sourceGlobPattern
  ])
}
