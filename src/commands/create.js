import gitUserName from 'git-user-name'
import { prompt } from 'inquirer'

import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { scaffoldPlugin } from '../common/scaffold-plugin'

const questions = [
  {
    type: 'input',
    name: 'pluginName',
    message: 'Plugin name'
  },
  {
    type: 'input',
    name: 'pluginDescription',
    message: 'Plugin description'
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'Author name',
    default: function () {
      return gitUserName()
    }
  },
  {
    type: 'input',
    name: 'githubUserName',
    message: 'Github user name',
    default: function () {
      return gitUserName()
    }
  },
  {
    type: 'input',
    name: 'githubRepositoryName',
    message: 'Github repository name'
  }
]

export const create = {
  command: 'create',
  describe: 'Scaffolds a new Sketch plugin',
  handler: async function () {
    const config = await prompt(questions)
    const outputDirectoryPath = process.cwd()
    const logger = createLogger()
    await scaffoldPlugin({
      outputDirectoryPath,
      config
    }).catch(createErrorHandler(logger))
    logger.succeed('Created new plugin')
  }
}
