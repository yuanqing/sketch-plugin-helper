import execa from 'execa'
import { join, resolve } from 'path'

import { sourceDirectory } from '../constants'

export default async function lint () {
  const eslintConfigPath = resolve(__dirname, '..', '..', '..', '.eslintrc.json')
  const sourceFilesGlob = join(sourceDirectory, '/**/*.js')
  return execa('eslint', [
    '--config',
    eslintConfigPath,
    sourceFilesGlob
  ]).stdout.pipe(process.stdout)
}
