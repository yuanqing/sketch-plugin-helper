# sketch-plugin-helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> A batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

## Features

- A concise, declarative API for obtaining multi-field user input
- Automatically generate your plugin’s [`appcast.xml`](https://developer.sketch.com/guides/publishing-plugins/#the-appcastxml-file) and [`manifest.json`](https://developer.sketch.com/guides/plugin-bundles/#manifest) files
- Utility functions for the most common plugin tasks
- A prescribed, convention-over-configuration directory structure for your plugin
- Write tests to assert that the resulting Sketch file after running your plugin code matches an expected Sketch file
- All the tools you need – bundler, linter, test runner – bundled as a single dependency

*The above is also a list of the key differences between `sketch-plugin-helper` and [`skpm`](https://github.com/skpm/skpm).*

## Quick start

To begin:

```
$ npm install --global sketch-plugin-helper
$ sketch create sketch-hello-world
```

Enter the information prompted for. Then:

```
$ cd sketch-hello-world
$ npm install
```

Next, create `src/hello-world.js` containing the following:

```js
import { showMessage } from 'sketch-plugin-helper'

export default function () {
  showMessage('Hello, World!')
}
```

In `package.json`, specify `hello-world` as the ***handler*** for our plugin command:

```diff
{
  ...
  "sketch-plugin-helper": {
    ...
-   "menu": []
+   "menu": [
+     {
+       "handler": "hello-world",
+       "name": "Hello, World!"
+     }
+   ]
  }
}
```

Then, build our plugin, and install the plugin in Sketch as a symbolic link:

```
$ npm run build && npm run symlink
```

Finally, open a new document in Sketch. Then, run our `hello-world` command:

```
$ npm run handler -- hello-world
```

## API

- [Getting User Input](docs/getting-user-input.md)
- [Plugin Utilities](docs/plugin-utilities.md)
- [Testing Your Plugin](docs/testing-your-plugin.md)

## CLI

```
$ sketch --help
sketch <command>

Commands:
  sketch build              Builds the plugin
  sketch create <name>      Scaffolds a new Sketch plugin
  sketch handler <handler>  Runs the given plugin handler in Sketch
  sketch lint               Lints the plugin implementation code
  sketch script <file>      Runs the given script in Sketch
  sketch symlink            Installs the plugin as a symlink
  sketch test               Runs tests for the plugin
  sketch version <type>     Updates the plugin version

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Installation

```
$ npm install --global sketch-plugin-helper
```

## License

[MIT](LICENSE.md)
