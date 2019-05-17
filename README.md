# sketch-plugin-helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> A batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

## Features

- [Get multi-field user input](docs/2-getting-user-input.md#example-1) using a concise, declarative API
- Automatically generate your plugin’s [`appcast.xml`](https://developer.sketch.com/guides/publishing-plugins/#the-appcastxml-file) and [`manifest.json`](https://developer.sketch.com/guides/plugin-bundles/#manifest) files
- [Utility functions](docs/3-plugin-utilities.md) and abstractions over the [Sketch API](https://github.com/BohemianCoding/SketchAPI) to ease the most common plugin tasks
- [Write tests](docs/4-testing-your-plugin.md) to assert that the resulting Sketch file after running your plugin code matches an expected Sketch file
- All the tools you need – [bundler, linter, test runner](docs/1-plugin-basics.md#cli) – bundled as a single dependency

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

Next, create a `src/hello-world.js` file containing the following:

```js
import { showMessage } from 'sketch-plugin-helper'

export default function () {
  showMessage('Hello, World!')
}
```

Note that our plugin handler must be the `default` export of the file.

Then, in our `package.json`, use `src/hello-world.js` (stated as `hello-world` after omitting the `src/` and `.js`) as the `handler` for our plugin command:

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

Then, build our plugin, and install the plugin as a symbolic link:

```
$ npm run build && npm run symlink
```

Finally, open a new document in Sketch. Then, run our `hello-world` command:

```
$ npm run handler -- hello-world
```

You should see a `Hello, World!` message appear near the bottom of the Sketch interface.

To rebuild our plugin whenever we make a change, do:

```
$ npm run watch
```

## Guides

- [**Plugin Basics**](docs/1-plugin-basics.md)
- [**Getting User Input**](docs/2-getting-user-input.md)
- [**Plugin Utilities**](docs/3-plugin-utilities.md)
- [**Testing Your Plugin**](docs/4-testing-your-plugin.md)

## Installation

```
$ npm install --global sketch-plugin-helper
```

## License

[MIT](LICENSE.md)
