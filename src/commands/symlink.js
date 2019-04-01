import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { createSymlink } from '../common/symlink/create-symlink'
import { deleteSymlink } from '../common/symlink/delete-symlink'

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
    const logger = createLogger()
    if (shouldDelete) {
      logger.loading('Deleting symbolic link...')
      await deleteSymlink().catch(createErrorHandler(logger))
      logger.succeed('Deleted symbolic link')
    } else {
      logger.loading('Creating symbolic link...')
      await createSymlink().catch(createErrorHandler(logger))
      logger.succeed('Created symbolic link')
    }
    return Promise.resolve()
  }
}
