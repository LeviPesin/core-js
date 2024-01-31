'use strict';
var $ = require('../internals/export');
var $toArray = require('../internals/async-iterator-iteration').toArray;

// `AsyncIterator.prototype.toArray` method
// https://github.com/tc39/proposal-async-iterator-helpers
// dependency: esnext.async-iterator.constructor
$({ target: 'AsyncIterator', proto: true, real: true }, {
  toArray: function toArray() {
    return $toArray(this, undefined, []);
  },
});
