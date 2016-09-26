# NestedTypes-lite

This is a fork of Type-R with some extra stuff from nestedtypes. The resulting package is a dropin replacement of nestedtypes but without backbone (router, view, ajax-sync).

It is built with rollup for a smaller build and the resulting module is using es-modules format for use with webpack and rollup.

The underscore-mixin is rewritten for lodash 4.x and imports are done so babel-plugin-lodash will handle them and allow for tree shaking. Also not all lodash functions originally in backbone is in this build, only the once we actually use right now.

https://github.com/Volicon/Type-R
https://github.com/Volicon/NestedTypes
