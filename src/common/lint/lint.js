import execa from 'execa'
import { join } from 'path'

import { sourceDirectory } from '../constants'

export default async function lint () {
  const eslintConfigPath = join(__dirname, 'eslintrc.json')
  const sourceFilesGlob = join(sourceDirectory, '/**/*.js')
  return execa('eslint', [
    '--config',
    eslintConfigPath,
    sourceFilesGlob
  ]).stdout.pipe(process.stdout)
}
