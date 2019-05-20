import { executeShellCommand } from '../execute-shell-command'
import { sourceGlobPattern } from '../constants'

export async function fix () {
  return executeShellCommand('prettier-standard', [sourceGlobPattern])
}
