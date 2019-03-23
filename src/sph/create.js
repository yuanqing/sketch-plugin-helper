import { createPlugin } from '../common/create-plugin'
import { createSpinner } from './create-spinner'
import { errorHandler } from './error-handler'

export const create = {
  command: 'create',
  describe: 'Scaffolds a new Sketch plugin',
  builder: {
    pluginName: {
      alias: ['n', 'name'],
      demandOption: true
    },
    pluginDescription: {
      alias: ['d', 'description'],
      demandOption: true
    },
    authorName: {
      alias: ['a', 'author'],
      demandOption: true
    },
    githubUserName: {
      alias: ['u', 'username'],
      demandOption: true
    },
    githubRepositoryName: {
      alias: ['r', 'repository'],
      demandOption: true
    }
  },
  handler: async function (config) {
    const spinner = createSpinner()
    spinner.loading('Creating new plugin...')
    const outputDirectoryPath = process.cwd()
    await createPlugin({
      outputDirectoryPath,
      config
    }).catch(errorHandler(spinner))
    spinner.succeed('Created new plugin')
    return Promise.resolve()
  }
}
