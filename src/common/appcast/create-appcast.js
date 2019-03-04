function createAppcast ({
  pluginName,
  pluginDescription,
  githubUserName,
  githubRepositoryName,
  versions
}) {
  return {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'utf-8'
      }
    },
    rss: {
      _attributes: {
        version: '2.0',
        'xmlns:sparkle': 'http://www.andymatuschak.org/xml-namespaces/sparkle',
        'xmlns:dc': 'http://purl.org/dc/elements/1.1/'
      },
      channel: {
        title: {
          _text: pluginName
        },
        link: {
          _text: `https://raw.githubusercontent.com/${githubUserName}/${githubRepositoryName}/master/appcast.xml`
        },
        description: {
          _text: pluginDescription
        },
        language: {
          _text: 'en'
        },
        item: mapVersionsToItems({
          githubUserName,
          githubRepositoryName,
          versions
        })
      }
    }
  }
}

function mapVersionsToItems ({
  githubUserName,
  githubRepositoryName,
  versions
}) {
  return versions.map(function (version) {
    return {
      title: {
        _text: version
      },
      description: {
        _text: dropVersionPrefix(version)
      },
      enclosure: {
        _attributes: {
          url: `https://github.com/${githubUserName}/${githubRepositoryName}/archive/${version}.zip`,
          'sparkle:version': dropVersionPrefix(version)
        }
      }
    }
  })
}

function dropVersionPrefix (version) {
  if (version[0] === 'v') {
    return version.substring(1)
  }
  return version
}

module.exports = createAppcast
