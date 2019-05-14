import gitUserName from 'git-user-name'
import inquirer from 'inquirer'

import { createErrorHandler } from '../common/create-error-handler'
import { createLogger } from '../common/create-logger'
import { scaffoldPlugin } from '../common/scaffold-plugin'

export const create = {
  command: 'create <name>',
  describe: 'Scaffolds a new Sketch plugin',
  builder: function (yargs) {
    yargs.positional('name', {
      type: 'string'
    })
  },
  handler: async function ({ name }) {
    const config = await prompt(name)
    const outputDirectoryPath = process.cwd()
    const logger = createLogger()
    await scaffoldPlugin({
      outputDirectoryPath,
      config: {
        ...config,
        pluginName: name
      }
    }).catch(createErrorHandler(logger))
    logger.succeed('Scaffolded new plugin')
  }
}

function prompt (name) {
  const questions = [
    {
      type: 'input',
      name: 'pluginDisplayName',
      message: 'Plugin display name',
      default: name
    },
    {
      type: 'input',
      name: 'pluginDescription',
      message: 'Plugin description',
      default: name
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
      name: 'githubUsername',
      message: 'Github username',
      default: function ({ authorName }) {
        return createGithubUsername(authorName)
      }
    }
  ]
  return inquirer.prompt(questions)
}

const spaceRegularExpression = /\s+/g
function createGithubUsername (authorName) {
  return authorName.toLowerCase().replace(spaceRegularExpression, '')
}
