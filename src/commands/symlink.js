import { createSymlink } from '../common/symlink/create-symlink'
import { deleteSymlink } from '../common/symlink/delete-symlink'
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
      log.success('Deleted symbolic link')
    } else {
      await createSymlink().catch(errorHandler)
      log.success('Created symbolic link')
    }
    return Promise.resolve()
  }
}
