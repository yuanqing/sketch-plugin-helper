import { prompt } from 'inquirer'
import gitUserName from 'git-user-name'
import githubUsernameRegex from 'github-username-regex'
import titleCase from 'title-case'

const sketchPrefixRegularExpression = /^sketch-/
const multipleSpaceRegularExpression = /\s+/g

function validate (input) {
  if (input.replace(multipleSpaceRegularExpression, '').trim().length > 0) {
    return true
  }
  return 'Required'
}
function filter (input) {
  return input.replace(multipleSpaceRegularExpression, ' ').trim()
}

export function showPrompt (name) {
  const questions = [
    {
      type: 'input',
      name: 'pluginDisplayName',
      message: 'Plugin display name',
      default: function () {
        return titleCase(name.replace(sketchPrefixRegularExpression, ''))
      },
      validate,
      filter
    },
    {
      type: 'input',
      name: 'pluginDescription',
      message: 'Plugin description',
      filter
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author name',
      default: function () {
        return gitUserName()
      },
      validate,
      filter
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Github username',
      default: function ({ authorName }) {
        return authorName
          .toLowerCase()
          .replace(multipleSpaceRegularExpression, '')
      },
      validate: function (input) {
        if (githubUsernameRegex.test(input)) {
          return true
        }
        return 'Invalid GitHub username'
      },
      filter
    }
  ]
  return prompt(questions)
}
