const api = require('../api')
const errorHandler = require('./utilities/error-handler')

module.exports = {
  command: 'init',
  alias: ['i'],
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
  handler: async function ({
    pluginName,
    pluginDescription,
    authorName,
    githubUserName,
    githubRepositoryName
  }) {
    const outputDirectoryPath = process.cwd()
    return api
      .init({
        outputDirectoryPath,
        config: {
          pluginName,
          pluginDescription,
          authorName,
          githubUserName,
          githubRepositoryName
        }
      })
      .catch(errorHandler)
  }
}
