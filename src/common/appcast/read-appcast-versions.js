import { readFile } from 'fs-extra'
import { xml2json } from 'xml-js'

export async function readAppcastVersions (appcastPath) {
  const xml = await readFile(appcastPath, 'utf8')
  const appcast = JSON.parse(xml2json(xml, { compact: true, spaces: 2 }))
  if (!appcast.rss.channel.item) {
    return null
  }
  const items = [].concat(appcast.rss.channel.item)
  return items.map(function (item) {
    return dropVersionPrefix(item.title._text)
  })
}

function dropVersionPrefix (version) {
  if (version[0] === 'v') {
    return version.substring(1)
  }
  return version
}
