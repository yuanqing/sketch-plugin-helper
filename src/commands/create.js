import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { scaffoldPlugin } from '../common/scaffold-plugin'

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
    const logger = createLogger()
    logger.loading('Creating new plugin...')
    const outputDirectoryPath = process.cwd()
    await scaffoldPlugin({
      outputDirectoryPath,
      config
    }).catch(createErrorHandler(logger))
    logger.succeed('Created new plugin')
    return Promise.resolve()
  }
}
