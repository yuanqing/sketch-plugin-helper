import { createSymlink } from '../common/symlink/create-symlink'
import { deleteSymlink } from '../common/symlink/delete-symlink'
import { createSpinner } from './create-spinner'
import { errorHandler } from './error-handler'

export const symlink = {
  command: 'symlink',
  describe: 'Adds a symbolic link to the plugin to the Sketch plugin folder',
  builder: {
    shouldDelete: {
      alias: ['delete', 'del', 'd'],
      type: 'boolean'
    }
  },
  handler: async function ({ shouldDelete }) {
    const spinner = createSpinner()
    if (shouldDelete) {
      spinner.loading('Deleting symbolic link...')
      await deleteSymlink().catch(errorHandler(spinner))
      spinner.succeed('Deleted symbolic link')
    } else {
      spinner.loading('Creating symbolic link...')
      await createSymlink().catch(errorHandler(spinner))
      spinner.succeed('Created symbolic link')
    }
    return Promise.resolve()
  }
}
