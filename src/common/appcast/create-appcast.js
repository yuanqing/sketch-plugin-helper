export function createAppcast ({
  pluginDisplayName,
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
          _text: pluginDisplayName
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
  const items = []
  versions.map(function (version) {
    if (version === '0.0.0') {
      return
    }
    items.push({
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
    })
  })
  return items
}
