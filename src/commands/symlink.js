import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { createSymlink } from '../common/symlink/create-symlink'
import { deleteSymlink } from '../common/symlink/delete-symlink'

export const symlink = {
  command: 'symlink',
  describe: 'Installs the plugin as a symlink',
  builder: function (yargs) {
    yargs.option('delete', {
      alias: ['d'],
      type: 'boolean'
    })
  },
  handler: async function (options) {
    const logger = createLogger()
    if (options.delete) {
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
