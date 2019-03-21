import { join } from 'path'

export default function createSymlinkPath (pluginDirectoryName) {
  return join(
    process.env.HOME,
    '/Library/Application Support/com.bohemiancoding.sketch3/Plugins',
    pluginDirectoryName
  )
}
