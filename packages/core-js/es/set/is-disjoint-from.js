'use strict';
require('../../modules/es.set.constructor');
require('../../modules/es.set.is-disjoint-from');
var entryUnbind = require('../../internals/entry-unbind');

module.exports = entryUnbind('Set', 'isDisjointFrom');
