# Sketch Plugin Helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> A batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

[![Sketch Plugin Helper](/media/header.png)](#quick-start)

<div align="center">

[**Motivation**](docs/1-motivation.md#readme) · [**Plugin Basics**](docs/2-plugin-basics.md#readme) · [**Getting User Input**](docs/3-getting-user-input.md#readme) · [**Plugin Utilities**](docs/4-plugin-utilities.md#readme) · [**Testing Your Plugin**](docs/5-testing-your-plugin.md#readme)

</div>

## Features

- Write your plugin in modern JavaScript *(of course)*
- [Automatically generate](docs/2-plugin-basics.md#readme) your plugin’s [`manifest.json`](https://developer.sketch.com/plugins/plugin-manifest) and [`appcast.xml`](https://developer.sketch.com/plugins/update-a-plugin) files
- [Get multi-field user input](docs/3-getting-user-input.md#readme) using a concise, declarative API
- [Utility functions](docs/4-plugin-utilities.md#readme) and abstractions over the [Sketch API](https://github.com/BohemianCoding/SketchAPI) to ease common plugin tasks
- [Write tests](docs/5-testing-your-plugin.md#readme) to assert that the resulting Sketch file after running your plugin code matches an expected Sketch file
- [A powerful CLI](docs/2-plugin-basics.md#cli) to build, lint and test your plugin

See [**Motivation**](docs/1-motivation.md#readme).

## Quick start

*Requires [Node.js](https://nodejs.org/).*

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

Our plugin handler must be the `default` export of the file. (See [**Plugin Utilities**](docs/4-plugin-utilities.md#readme) for a list of helpful functions that you can use in your plugin.)

Then, in our `package.json`, set `src/hello-world.js` as the `handler` for our plugin menu command:

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

Note that the initial `src/` and trailing `.js` extension is omitted.

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

## Docs

- [**Motivation**](docs/1-motivation.md#readme)
- [**Plugin Basics**](docs/2-plugin-basics.md#readme)
- [**Getting User Input**](docs/3-getting-user-input.md#readme)
- [**Plugin Utilities**](docs/4-plugin-utilities.md#readme)
- [**Testing Your Plugin**](docs/5-testing-your-plugin.md#readme)

## Reference plugin implementations

Plugin name | Description
:-|:-
[Add Artboard Borders and Titles](https://github.com/yuanqing/sketch-add-artboard-borders-and-titles) | Automatically add borders and titles to artboards
[Align to Grid](https://github.com/yuanqing/sketch-align-to-grid) | Align artboards and layers to a grid
[Clean Document](https://github.com/yuanqing/sketch-clean-document) | Automagically organise and clean up your Sketch document
[Draw Slice Over Selection](https://github.com/yuanqing/sketch-draw-slice-over-selection) | Draw a slice over the selection
[Export Prototype](https://github.com/yuanqing/sketch-export-prototype) | Export a clickable prototype from your Sketch file
[Extract Text](https://github.com/yuanqing/sketch-extract-text) | Extract text from layers that match a regular expression
[Find and Replace Text](https://github.com/yuanqing/sketch-find-and-replace-text) | Find and replace text in text layers and symbol instances
[Move Layers](https://github.com/yuanqing/sketch-move-layers) | Precisely move and arrange layers
[Select Layers](https://github.com/yuanqing/sketch-select-layers) | Create or filter a selection of layers based on name, type or similarity
[Sort Layer List](https://github.com/yuanqing/sketch-sort-layer-list) | Sort the layer list by name or layer position

## Installation

```
$ npm install --global sketch-plugin-helper
```

## License

[MIT](LICENSE.md)
