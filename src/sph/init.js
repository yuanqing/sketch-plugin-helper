const init = require('../common/init')
const errorHandler = require('../common/error-handler')

module.exports = {
  command: 'init',
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
    const outputDirectoryPath = process.cwd()
    return init({
      outputDirectoryPath,
      config
    }).catch(errorHandler)
  }
}
