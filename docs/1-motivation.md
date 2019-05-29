# Motivation

- [**Problems and solutions**](#problems-and-solutions)
  - [1. Manually managing `manifest.json` and `appcast.xml` is error-prone](#1-manually-managing-manifestjson-and-appcastxml-is-error-prone)
  - [2. Creating UI for user input is a non-trivial endeavour](#2-creating-ui-for-user-input-is-a-non-trivial-endeavour)
  - [3. Common plugin tasks require boilerplate code](#3-common-plugin-tasks-require-boilerplate-code)
  - [4. Plugin tests can be tedious to write](#4-plugin-tests-can-be-tedious-to-write)

---

## Problems and solutions

I wrote Sketch Plugin Helper to address some points of friction that I’ve personally experienced writing plugins for Sketch. The intent was to create an end-to-end, batteries-included toolkit to solve the following problems:

---

### 1. Manually managing `manifest.json` and `appcast.xml` is error-prone

Plugin configuration and metadata is distributed across `package.json`, [`manifest.json`](https://developer.sketch.com/plugins/plugin-manifest) and [`appcast.xml`](https://developer.sketch.com/plugins/update-a-plugin). All three files need to be manually managed, even though some information (eg. the plugin name, description, and version) is duplicated between the files. Changing the plugin configuration or releasing a new version of a Sketch plugin is tedious and error-prone.

#### Solution

- Centralise all plugin configuration and metadata into `package.json`
- Auto-generate the `manifest.json` and `appcast.xml` files.

See [**Plugin Basics**](2-plugin-basics.md).

---

### 2. Creating UI for user input is a non-trivial endeavour

Sketch only provides [a rudimentary API for getting user input](https://developer.sketch.com/reference/api/#get-an-input-from-the-user). Anything more elaborate than a text box or drop down menu will need to be [written from scratch, using imperative APIs](https://journal.yummygum.com/the-simple-guide-to-getting-user-input-for-your-sketch-plugin-part-ii-3375153e063d). This UI code is repeatedly reimplemented across the Sketch plugin ecosystem.

#### Solution

- Create a higher-level API for building UI to get user input. (The trade-off of having this abstraction is that you will not have granular control of the UI.)

See [**Getting User Input**](3-getting-user-input.md).

---

### 3. Common plugin tasks require boilerplate code

Many common plugin tasks are not supported out-of-the-box by the Sketch API. As a result, boilerplate code to perform these common tasks is duplicated across plugins.

#### Solution

- Consolidate the most frequently-used plugin tasks into a comprehensive set of utility functions.
- Name each function in an unambiguous way, and directly expose each function on the main module (as opposed to in “sub-modules”).

See [**Plugin Utilities**](4-plugin-utilities.md).

---

### 4. Plugin tests can be tedious to write

When [writing tests](https://github.com/skpm/skpm/tree/master/packages/test-runner), it is tedious to make assertions on the particular structure or content of the Sketch file.

#### Solution

- The test runner should also support performing a one-to-one comparison between the resulting Sketch file after running your plugin code and an expected Sketch file.

See [**Testing Your Plugin**](5-testing-your-plugin.md).
