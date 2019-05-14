import dashify from 'dashify'
import gitUserName from 'git-user-name'
import { prompt } from 'inquirer'

import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { scaffoldPlugin } from '../common/scaffold-plugin'

const spaceRegularExpression = /\s+/g
function createGithubUserName (authorName) {
  return authorName.toLowerCase().replace(spaceRegularExpression, '')
}

const questions = [
  {
    type: 'input',
    name: 'pluginName',
    message: 'Plugin display name'
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
    default: function ({authorName}) {
      return createGithubUserName(authorName)
    }
  }
]

export const create = {
  command: 'create <name>',
  describe: 'Scaffolds a new Sketch plugin',
  builder: function (yargs) {
    yargs.positional('name', {
      type: 'string'
    })
  },
  handler: async function ({name}) {
    const config = await prompt(questions)
    const outputDirectoryPath = process.cwd()
    const logger = createLogger()
    await scaffoldPlugin({
      outputDirectoryPath,
      config: {
        ...config,
        githubRepositoryName: name
      }
    }).catch(createErrorHandler(logger))
    logger.succeed('Scaffolded new plugin')
  }
}
