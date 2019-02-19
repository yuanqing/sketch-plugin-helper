const fs = require('fs-extra')
const xmlJs = require('xml-js')

async function readAppcastVersions (appcastPath) {
  const xml = await fs.readFile(appcastPath, 'utf8')
  const appcast = JSON.parse(xmlJs.xml2json(xml, { compact: true, spaces: 2 }))
  const items = [].concat(appcast.rss.channel.item)
  return items.map(function (item) {
    return item.title._text
  })
}

module.exports = readAppcastVersions
