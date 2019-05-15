# sketch-plugin-helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> A batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

## Features

- A concise, declarative API for obtaining multi-field user input
- Automatically generate your plugin’s [`appcast.xml`](https://developer.sketch.com/guides/publishing-plugins/#the-appcastxml-file) and [`manifest.json`](https://developer.sketch.com/guides/plugin-bundles/#manifest) files
- Utility functions and abstractions over the [Sketch API](https://github.com/BohemianCoding/SketchAPI) to ease the most common plugin tasks
- A prescribed, convention-over-configuration directory structure
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

Next, create a `src/hello-world.js` file containing the following:

```js
import { showMessage } from 'sketch-plugin-helper'

export default function () {
  showMessage('Hello, World!')
}
```

In our `package.json`, specify `hello-world` as the `handler` for our plugin command:

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

Then, build and install our plugin (as a symbolic link):

```
$ npm run build && npm run symlink
```

Finally, open a new document in Sketch. Then run our `hello-world` command:

```
$ npm run handler -- hello-world
```

We should see a `Hello, World!` message appear near the bottom of the Sketch interface.

To rebuild our plugin whenever we make a change, do:

```
$ npm run watch
```

## Guides

- [**Configuring Your Plugin**](docs/1-configuring-your-plugin.md)
- [**Getting User Input**](docs/2-getting-user-input.md)
- [**Plugin Utilities**](docs/3-plugin-utilities.md)
- [**Testing Your Plugin**](docs/4-testing-your-plugin.md)

## Installation

```
$ npm install --global sketch-plugin-helper
```

## License

[MIT](LICENSE.md)
