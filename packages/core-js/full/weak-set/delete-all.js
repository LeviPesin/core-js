'use strict';
require('../../modules/es.weak-set.constructor');
require('../../modules/esnext.weak-set.delete-all');
var entryUnbind = require('../../internals/entry-unbind');

module.exports = entryUnbind('WeakSet', 'deleteAll');
