# babel-plugin-replace-current-module

[![NPM version](https://img.shields.io/npm/v/babel-plugin-replace-current-module.svg?style=flat)](https://npmjs.org/package/babel-plugin-replace-current-module)
[![Build Status](https://img.shields.io/travis/gxcsoccer/babel-plugin-replace-current-module.svg?style=flat)](https://travis-ci.org/gxcsoccer/babel-plugin-replace-current-module)

----

## Example

convert
```js
window['@@module'] = require('@@module')
```

to 
```js
// xxx is current module name
window['xxx'] = require('/work/xxx/index.js');
```
