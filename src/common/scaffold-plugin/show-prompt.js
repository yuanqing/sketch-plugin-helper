import { prompt } from 'inquirer'
import gitUserName from 'git-user-name'

export function showPrompt (name) {
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
  return prompt(questions)
}

const spaceRegularExpression = /\s+/g
function createGithubUsername (authorName) {
  return authorName.toLowerCase().replace(spaceRegularExpression, '')
}
