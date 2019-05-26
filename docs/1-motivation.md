# Motivation

- [**Challenges and solutions**](#challenges-and-solutions)
  - [1. Manually managing `manifest.json` and `appcast.xml`](#1-manually-managing-manifestjson-and-appcastxml)
  - [2. Creating UI to get user input](#2-creating-ui-to-get-user-input)
  - [3. Performing common plugin tasks](#3-performing-common-plugin-tasks)
  - [4. Writing plugin tests](#4-writing-plugin-tests)
- [**Philosophy**](#philosophy)

---

## Challenges and solutions

### 1. Manually managing `manifest.json` and `appcast.xml`

Plugin configuration and metadata is distributed across `package.json`, [`manifest.json`](https://developer.sketch.com/plugins/plugin-manifest) and [`appcast.xml`](https://developer.sketch.com/plugins/update-a-plugin). All three files need to be manually managed, even though some information (eg. the plugin name, description, and version) is duplicated between the files. Changing the plugin configuration or releasing a new version of a Sketch plugin is tedious and error-prone.

#### Solution

- Centralise all plugin configuration and metadata into `package.json`
- Auto-generate the `manifest.json` and `appcast.xml` files.

See [**Plugin Basics**](2-plugin-basics.md).

---

### 2. Creating UI to get user input

Sketch only provides [a quite rudimentary API for getting user input](https://developer.sketch.com/reference/api/#get-an-input-from-the-user). Anything more elaborate than a text box or drop down menu will need to be [written from scratch, using imperative APIs](https://journal.yummygum.com/the-simple-guide-to-getting-user-input-for-your-sketch-plugin-part-ii-3375153e063d). Without a higher-level API, UI code is repeatedly reimplemented across the Sketch plugin ecosystem.

#### Solution

- Create a simple, declarative abstraction for building UI to get user input.

See [**Getting User Input**](3-getting-user-input.md).

---

### 3. Performing common plugin tasks

Many common plugin tasks are not supported out-of-the-box by the Sketch JavaScript API. As a result, boilerplate code to perform these common tasks is duplicated across plugins.

#### Solution

- Consolidate the most frequently-used plugin tasks into a comprehensive set of utility functions.
- Name each function in an unambiguous way, and directly expose each function on the main module (as opposed to in “sub-modules”).

See [**Plugin Utilities**](4-plugin-utilities.md).

---

### 4. Writing plugin tests

There is friction towards [writing tests](https://github.com/skpm/skpm/tree/master/packages/test-runner) because it is tedious to make assertions on the particular structure or content of a Sketch document.

#### Solution

- The test runner should support performing a one-to-one comparison between the resulting Sketch file (after running your plugin code) and an expected Sketch file.

See [**Testing Your Plugin**](5-testing-your-plugin.md).

---

## Philosophy

- An end-to-end, single-dependency, integrated toolkit
- Optimised for the common use cases
