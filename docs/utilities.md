# Sketch Plugin Utilities

> Helper functions and abstractions over the [Sketch API](https://github.com/BohemianCoding/SketchAPI) to ease the most common plugin tasks

- [**Document**](#document)
  - [getCurrentDocument()](#const-document--getcurrentdocument)
  - [openDocument(filePath)](#const-document--await-opendocumentfilepath)
- [**Page**](#page)
  - [getAllPages()](#const-pages--getallpages)
  - [getCurrentPage()](#const-page--getcurrentpage)
  - [getSymbolsPage()](#const-page--getsymbolspage)
- [**Artboard**](#artboard)
  - [getArtboardsOnAllPages()](#const-artboards--getartboardsonallpages)
  - [getArtboardsOnCurrentPage()](#const-artboards--getartboardsoncurrentpage)
  - [getSelectedArtboards()](#const-artboards--getselectedartboards)
- [**Layer**](#layer)
  - [getLayersOnAllPages()](#const-layers--getlayersonallpages)
  - [getLayersOnCurrentPage()](#const-layers--getlayersoncurrentpage)
  - [getSelectedLayers()](#const-layers--getselectedlayers)
  - [getSelectedLayersOrLayersOnCurrentPage()](#const-layers--getselectedlayersorlayersoncurrentpage)
  - [findLayersByNameOnCurrentPage(name)](#const-layers--findlayersbynameoncurrentpagename)
  - [addLayersToCurrentPage(layers)](#addlayerstocurrentpagelayers)
  - [iterateChildLayers(layers, callback)](#iteratechildlayerslayers-callback)
  - [iterateParentLayers(layer, callback)](#iterateparentlayerslayer-callback)
  - [calculateCoordinatesRelativeToArtboard(layer)](#const-coordinates--calculatecoordinatesrelativetoartboardlayer)
  - [calculateCoordinatesRelativeToPage(layer)](#const-coordinates--calculatecoordinatesrelativetopagelayer)
  - [adjustParentGroupsToFit(layer)](#adjustparentgroupstofitlayer)
- [**Directory**](#directory)
  - [getPluginDirectoryPath()](#const-path--getplugindirectorypath)
  - [getPluginInnerDirectoryPath()](#const-path--getplugininnerdirectorypath)
  - [getPluginResourcesDirectoryPath()](#const-path--getpluginresourcesdirectorypath)
- [**System feedback**](#system-feedback)
  - [showMessage(message)](#showmessagemessage)
  - [showSuccessMessage(message)](#showsuccessmessagemessage)
  - [showErrorMessage(message)](#showerrormessagemessage)

---

## Document

```js
import {
  getCurrentDocument,
  openDocument
} from 'sketch-plugin-helper'
```

### const document = getCurrentDocument()

Gets the currently-open document.

- `document` is a [`Document`](https://developer.sketch.com/reference/api/#document) object.

---

### const document = await openDocument(filePath)

Opens the Sketch document at the given `filePath`.

- `document` is a [`Document`](https://developer.sketch.com/reference/api/#document) object.

#### *Parameters*

- `filePath` (`string`)

---

## Page

```js
import {
  getAllPages,
  getCurrentPage,
  getSymbolsPage
} from 'sketch-plugin-helper'
```

### const pages = getAllPages()

Gets all pages of the current document.

- `pages` is an array of [`Page`](https://developer.sketch.com/reference/api/#page) objects.

---

### const page = getCurrentPage()

Gets the current page of the current document.

- `page` is a [`Page`](https://developer.sketch.com/reference/api/#page) object.

---

### const page = getSymbolsPage()

Gets the Symbols page of the current document.

- `page` is a [`Page`](https://developer.sketch.com/reference/api/#page) object.

---

## Artboard

```js
import {
  getArtboardsOnAllPages,
  getArtboardsOnCurrentPage,
  getSelectedArtboards
} from 'sketch-plugin-helper'
```

### const artboards = getArtboardsOnAllPages()

Gets all artboards on all pages.

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

### const artboards = getArtboardsOnCurrentPage()

Gets all artboards on the current page.

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

### const artboards = getSelectedArtboards()

Gets the selected artboards.

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

## Layer

```js
import {
  getLayersOnAllPages,
  getLayersOnCurrentPage,
  getSelectedLayers,
  getSelectedLayersOrLayersOnCurrentPage,
  findLayersByNameOnCurrentPage,
  addLayersToCurrentPage,
  iterateChildLayers,
  iterateParentLayers,
  calculateCoordinatesRelativeToPage,
  calculateCoordinatesRelativeToArtboard,
  adjustParentGroupsToFit
} from 'sketch-plugin-helper'
```

---

### const layers = getLayersOnAllPages()

Gets all top-level layers on all pages.

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getLayersOnCurrentPage()

Gets all top-level layers on the current page.

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getSelectedLayers()

Gets the selected layers.

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getSelectedLayersOrLayersOnCurrentPage()

Gets the selected layers, or the top-level layers on the current page if no layers are selected.

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = findLayersByNameOnCurrentPage(name)

Finds layers with the given `name` on the current page.

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

#### *Parameters*

- `name` (`string`)

---

### addLayersToCurrentPage(layers)

Adds the given `layers` to the current page.

#### *Parameters*

- `layers` ([`Layer[]`](https://developer.sketch.com/reference/api/#layer))

---

### iterateChildLayers(layers, callback)

For each layer in `layers`, recursively iterates through the child layers of each layer, passing each child layer to the given `callback`.

#### *Parameters*

- `layers` ([`Layer[]`](https://developer.sketch.com/reference/api/#layer))
- `callback` (`function (childLayer)`)

---

### iterateParentLayers(layer, callback)

Recursively iterates through the parent layers of the given `layer`, passing each parent layer to the given `callback`.

#### *Parameters*

- `layer` ([`Layer`](https://developer.sketch.com/reference/api/#layer))
- `callback` (`function (parentLayer)`)

---

### const coordinates = calculateCoordinatesRelativeToArtboard(layer)

Calculates the `x` and `y` coordinates of the given `layer` relative to its parent artboard.

- If `layer` is in an artboard, then `coordinates` is an `object`.
- If `layer` is not in an artboard, then `coordinates` is `null`.

---

### const coordinates = calculateCoordinatesRelativeToPage(layer)

Calculates the `x` and `y` coordinates of the given `layer` relative to the page.

- `coordinates` is an `object`.

---

### adjustParentGroupsToFit(layer)

Updates the sizes of all parent groups of the given `layer` to fit their contents. This is useful if the size or position of `layer` had changed.

#### *Parameters*

- `layer` ([`Layer`](https://developer.sketch.com/reference/api/#layer))

---

## Directory

```js
import {
  getPluginDirectoryPath,
  getPluginInnerDirectoryPath,
  getPluginResourcesDirectoryPath
} from 'sketch-plugin-helper'
```

### const path = getPluginDirectoryPath()

Gets the path to the plugin directory.

- `path` is a `string`.

---

### const path = getPluginInnerDirectoryPath()

Gets the path to the plugin’s inner `Contents/Sketch` directory.

- `path` is a `string`.

---

### const path = getPluginResourcesDirectoryPath()

Gets the path to the plugin’s `Contents/Resources` directory.

- `path` is a `string`.

---

## System feedback

```js
import {
  showMessage,
  showSuccessMessage,
  showErrorMessage
} from 'sketch-plugin-helper'
```

### showMessage(message)

Shows a message to the user.

#### *Parameters*

- `message` (`string`)

---

### showSuccessMessage(message)

Shows a success message to the user.

#### *Parameters*

- `message` (`string`)

---

### showErrorMessage(message)

Shows an error message to the user.

#### *Parameters*

- `message` (`string`)
