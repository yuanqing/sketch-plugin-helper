import { createSymlink } from '../common/symlink/create-symlink'
import { deleteSymlink } from '../common/symlink/delete-symlink'
import { symlinkExists } from '../common/symlink/symlink-exists'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

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
    if (options.delete) {
      await deleteSymlink().catch(errorHandler)
      log.success('Deleted symlink')
      return Promise.resolve()
    }
    if (await symlinkExists()) {
      await deleteSymlink().catch(errorHandler)
      log.info('Deleted existing symlink')
    }
    await createSymlink().catch(errorHandler)
    log.success('Created symlink')
    return Promise.resolve()
  }
}
