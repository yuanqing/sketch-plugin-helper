# Utilities

> Helper functions and abstractions over the [Sketch API](https://github.com/BohemianCoding/SketchAPI) for common plugin tasks

- [**Document**](#document)
  - [getCurrentDocument()](#const-document--getcurrentdocument)
  - [openDocument(filePath)](#const-document--opendocumentfilepath)
- [**Page**](#page)
  - [getAllPages()](#const-pages--getallpages)
  - [getCurrentPage()](#const-page--getcurrentpage)
  - [getSymbolsPage()](#const-page--getsymbolspage)
- [**Artboard**](#artboard)
  - [getArtboardsOnAllPages()](#const-artboards--getartboardsonallpages)
  - [getArtboardsOnCurrentPage()](#const-artboards--getartboardsoncurrentpage)
  - [getSelectedArtboards()](#const-artboards--getselectedartboards)
- [**Layer**](#layer)
  - [addLayersToCurrentPage(layers)](#addlayerstocurrentpagelayers)
  - [adjustParentGroupsToFit(layer)](#adjustparentgroupstofitlayer)
  - [calculateCoordinatesRelativeToArtboard(layer)](#const-coordinates--calculatecoordinatesrelativetoartboardlayer)
  - [calculateCoordinatesRelativeToPage(layer)](#const-coordinates--calculatecoordinatesrelativetopagelayer)
  - [findLayersByNameOnCurrentPage(name)](#const-layers--findlayersbynameoncurrentpagename)
  - [getLayersOnAllPages()](#const-layers--getlayersonallpages)
  - [getLayersOnCurrentPage()](#const-layers--getlayersoncurrentpage)
  - [getSelectedLayers()](#const-layers--getselectedlayers)
  - [getSelectedLayersOrLayersOnCurrentPage()](#const-layers--getselectedlayersorlayersoncurrentpage)
  - [iterateChildLayers(layers, callback)](#iteratechildlayerslayers-callback)
  - [iterateParentLayers(layer, callback)](#iterateparentlayerslayer-callback)
- [**Directory**](#directory)
  - [getPluginDirectoryPath()](#const-path--getplugindirectorypath)
  - [getPluginInnerDirectoryPath()](#const-path--getplugininnerdirectorypath)
  - [getPluginResourcesDirectoryPath()](#const-path--getpluginresourcesdirectorypath)
- [**System feedback**](#system-feedback)
  - [showErrorMessage(message)](#showerrormessagemessage)
  - [showMessage(message)](#showmessagemessage)
  - [showSuccessMessage(message)](#showsuccessmessagemessage)

## Document

```js
import {
  getCurrentDocument,
  openDocument
} from 'sketch-plugin-helper'
```

### const document = getCurrentDocument()

Gets the currently-open document.

#### *Return value*

- `document` is a [`Document`](https://developer.sketch.com/reference/api/#document) object.

---

### const document = openDocument(filePath)

Opens the Sketch document at the given `filePath`.

#### *Parameters*

- `filePath` (`string`)

#### *Return value*

- `document` is a [`Document`](https://developer.sketch.com/reference/api/#document) object.

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

#### *Return value*

- `pages` is an array of [`Page`](https://developer.sketch.com/reference/api/#page) objects.

---

### const page = getCurrentPage()

Gets the current page of the current document.

#### *Return value*

- `page` is a [`Page`](https://developer.sketch.com/reference/api/#page) object.

---

### const page = getSymbolsPage()

Gets the Symbols page of the current document.

#### *Return value*

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

#### *Return value*

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

### const artboards = getArtboardsOnCurrentPage()

Gets all artboards on the current page.

#### *Return value*

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

### const artboards = getSelectedArtboards()

Gets the selected artboards.

#### *Return value*

- `artboards` is an array of [`Artboard`](https://developer.sketch.com/reference/api/#artboard) objects.

---

## Layer

```js
import {
  addLayersToCurrentPage,
  adjustParentGroupsToFit,
  calculateCoordinatesRelativeToPage,
  calculateCoordinatesRelativeToArtboard,
  findLayersByNameOnCurrentPage,
  getLayersOnAllPages,
  getLayersOnCurrentPage,
  getSelectedLayers,
  getSelectedLayersOrLayersOnCurrentPage,
  iterateChildLayers,
  iterateParentLayers
} from 'sketch-plugin-helper'
```

### addLayersToCurrentPage(layers)

Adds the given `layers` to the specified `page` of the current document. If `page` is not specified, then `layers` are added to the current page.

#### *Parameters*

- `layers` ([`Layer[]`](https://developer.sketch.com/reference/api/#layer))
- `page` ([`Page`](https://developer.sketch.com/reference/api/#page))

---

### adjustParentGroupsToFit(layer)

Updates the sizes of all parent groups of the given `layer` to fit their contents. This is useful if the size or position of `layer` had changed.

#### *Parameters*

- `layer` ([`Layer`](https://developer.sketch.com/reference/api/#layer))
---

### const coordinates = calculateCoordinatesRelativeToArtboard(layer)

Calculates the `x` and `y` coordinates of the given `layer` relative to its parent artboard.

#### *Return value*

- If `layer` is in an artboard, then `coordinates` is an `object`.
- If `layer` is not in an artboard, then `coordinates` is `null`.

---

### const coordinates = calculateCoordinatesRelativeToPage(layer)

Calculates the `x` and `y` coordinates of the given `layer` relative to the page.

#### *Return value*

- `coordinates` is an `object`.

---

### const layers = findLayersByNameOnCurrentPage(name)

Finds layers with the given `name` on the current page.

#### *Parameters*

- `name` (`string`)

#### *Return value*

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getLayersOnAllPages()

Gets all top-level layers on all pages.

#### *Return value*

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getLayersOnCurrentPage()

Gets all top-level layers on the current page.

#### *Return value*

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getSelectedLayers()

Gets the selected layers.

#### *Return value*

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### const layers = getSelectedLayersOrLayersOnCurrentPage()

Gets the selected layers, or the top-level layers on the current page if no layers are selected.

#### *Return value*

- `layers` is an array of [`Layer`](https://developer.sketch.com/reference/api/#layer) objects.

---

### iterateChildLayers(layers, callback)

For each layer in `layers`, recursively iterates through the child layers of each layer, passing each child layer to the given `callback`.

#### *Parameters*

- `layers` ([`Layer[]`](https://developer.sketch.com/reference/api/#layer))
- `callback` (`function`) has the signature `function (childLayer) {}`

---

### iterateParentLayers(layer, callback)

Recursively iterates through the parent layers of the given `layer`, passing each parent layer to the given `callback`.

#### *Parameters*

- `layer` ([`Layer`](https://developer.sketch.com/reference/api/#layer))
- `callback` (`function`) has the signature `function (parentLayer) {}`

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

#### *Return value*

- `path` is a `string`.

---

### const path = getPluginInnerDirectoryPath()

Gets the path to the plugin’s inner `Contents/Sketch` directory.

#### *Return value*

- `path` is a `string`.

---

### const path = getPluginResourcesDirectoryPath()

Gets the path to the plugin’s `Contents/Resources` directory.

#### *Return value*

- `path` is a `string`.

---

## System feedback

```js
import {
  showErrorMessage,
  showMessage,
  showSuccessMessage
} from 'sketch-plugin-helper'
```

### showErrorMessage(message)

Shows an error message to the user.

#### *Parameters*

- `message` (`string`)

---

### showMessage(message)

Shows a message to the user.

#### *Parameters*

- `message` (`string`)

---

### showSuccessMessage(message)

Shows a success message to the user.

#### *Parameters*

- `message` (`string`)
