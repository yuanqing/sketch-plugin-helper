import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { scaffoldPlugin } from '../common/scaffold-plugin'

export const create = {
  command: 'create',
  describe: 'Scaffolds a new Sketch plugin',
  builder: function (yargs) {
    yargs.option('pluginName', {
      alias: ['name', 'n'],
      demandOption: true
    })
    yargs.option('pluginDescription', {
      alias: ['description', 'd'],
      demandOption: true
    })
    yargs.option('authorName', {
      alias: ['author', 'a'],
      demandOption: true
    })
    yargs.option('githubUserName', {
      alias: ['username', 'u'],
      demandOption: true
    })
    yargs.option('githubRepositoryName', {
      alias: ['repository', 'r'],
      demandOption: true
    })
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
