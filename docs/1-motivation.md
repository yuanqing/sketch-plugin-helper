# Motivation

- [1. Manually managing `manifest.json` and `appcast.xml` is error-prone](#1-manually-managing-manifestjson-and-appcastxml-is-error-prone)
- [2. No high-level API to create UI for user input](#2-no-high-level-api-to-create-ui-for-user-input)
- [3. Common plugin tasks require significant boilerplate code](#3-common-plugin-tasks-require-significant-boilerplate-code)
- [4. Plugin tests can be tedious to write](#4-plugin-tests-can-be-tedious-to-write)

---

Sketch Plugin Helper is an opinionated, batteries-included alternative to [skpm](https://github.com/skpm/skpm). I describe it as *batteries-included* because it imposes some conventions, abstracts away boilerplate code, and generally just tries to do more out-of-the-box, as opposed to leaving too much implementation and too many decisions to the plugin developer.

Sketch Plugin Helper was made primarily to scratch my own itch, and to address specific points of friction that I’ve experienced when writing plugins for Sketch. The goal was to develop a comprehensive solution that addressed the following problems.

---

## 1. Manually managing `manifest.json` and `appcast.xml` is error-prone

Plugin configuration and metadata is distributed across `package.json`, [`manifest.json`](https://developer.sketch.com/plugins/plugin-manifest) and [`appcast.xml`](https://developer.sketch.com/plugins/update-a-plugin). All three files need to be manually managed, even though some information (eg. the plugin name, description, and version) is duplicated between the files. Changing the plugin configuration or releasing a new version of a Sketch plugin is tedious and error-prone.

### Solution

- Localise all plugin configuration and metadata in `package.json`.
- Generate the `manifest.json` and `appcast.xml` files as part of the build step.

See [**Plugin Basics**](2-plugin-basics.md#readme).

---

## 2. No high-level API to create UI for user input

Sketch only provides [a rudimentary API for getting user input](https://developer.sketch.com/reference/api/#get-an-input-from-the-user). Anything more elaborate than either a single text box or a single drop down menu will need to be [written from scratch, using imperative CocoaScript APIs](https://journal.yummygum.com/the-simple-guide-to-getting-user-input-for-your-sketch-plugin-part-ii-3375153e063d). UI code is repeatedly reimplemented across the Sketch plugin ecosystem.

### Solution

- Create a higher-level API for building UI to get user input. (Keeping in mind that the trade-off of having this abstraction is that we will no longer have granular control of the UI.)

See [**Getting User Input**](3-getting-user-input.md#readme).

---

## 3. Common plugin tasks require significant boilerplate code

Many common plugin tasks are not supported out-of-the-box by the [Sketch API](https://developer.sketch.com/reference/api/). As a result, boilerplate code to perform these common tasks is duplicated across plugins.

### Solution

- Consolidate common plugin tasks into a comprehensive set of utility functions.

See [**Plugin Utilities**](4-plugin-utilities.md#readme).

---

## 4. Plugin tests can be tedious to write

When [writing tests](https://github.com/skpm/skpm/tree/master/packages/test-runner), it is tedious to make assertions on a particular structure or particular part of the Sketch file.

### Solution

- The test runner should support performing a one-to-one comparison between the resulting Sketch file after running your plugin code and an expected Sketch file.

See [**Testing Your Plugin**](5-testing-your-plugin.md#readme).
