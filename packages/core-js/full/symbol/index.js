'use strict';
var parent = require('../../actual/symbol');
require('../../modules/esnext.symbol.is-registered-symbol');
require('../../modules/esnext.symbol.is-well-known-symbol');
require('../../modules/esnext.symbol.custom-matcher');
require('../../modules/esnext.symbol.observable');
// TODO: Remove from `core-js@4`
require('../../modules/esnext.symbol.matcher');

module.exports = parent;
