const init = require('../api/init')
const errorHandler = require('./error-handler')

module.exports = {
  command: 'init',
  describe: 'Initialises a new Sketch plugin',
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
  handler: function (config) {
    const outputDirectoryPath = process.cwd()
    return init({
      outputDirectoryPath,
      config
    }).catch(errorHandler)
  }
}
