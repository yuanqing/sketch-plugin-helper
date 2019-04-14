export function createAppcast ({
  pluginName,
  pluginDescription,
  repository,
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
          _text: `https://raw.githubusercontent.com/${repository}/master/appcast.xml`
        },
        description: {
          _text: pluginDescription
        },
        language: {
          _text: 'en'
        },
        item: mapVersionsToItems({
          repository,
          versions
        })
      }
    }
  }
}

function mapVersionsToItems ({ repository, versions }) {
  if (versions.length === 1 && versions[0] === '0.0.0') {
    return []
  }
  return versions.map(function (version) {
    return {
      title: {
        _text: `v${version}`
      },
      description: {
        _text: version
      },
      enclosure: {
        _attributes: {
          url: `https://github.com/${repository}/archive/v${version}.zip`,
          'sparkle:version': version
        }
      }
    }
  })
}
