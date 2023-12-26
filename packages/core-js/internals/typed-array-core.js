'use strict';
var global = require('../internals/global');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var InternalStateModule = require('../internals/internal-state');
var TypedArrayConstructors = require('../internals/typed-array-constructors');

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var getPrototypeOf = Object.getPrototypeOf;
var TypedArray = getPrototypeOf(Int8Array);
var TypedArrayPrototype = getPrototypeOf(Int8Array.prototype);
var Uint8ClampedArrayPrototype = Uint8ClampedArray.prototype;
var TypeError = global.TypeError;

// WebKit bug - typed arrays constructors prototype is Object.prototype
var INCORRECT_TYPED_ARRAY_CONSTRUCTOR = !isCallable(TypedArray) || TypedArray === Function.prototype;
var INCORRECT_TYPED_ARRAY_PROTOTYPE = !TypedArrayPrototype || TypedArrayPrototype === Object.prototype;

var getTypedArrayMetadata = function (it, key) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, key)) ? state[key] : getTypedArrayMetadata(proto, key);
};

if (INCORRECT_TYPED_ARRAY_CONSTRUCTOR) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw new TypeError('Incorrect invocation');
  };

  if (!INCORRECT_TYPED_ARRAY_PROTOTYPE) {
    TypedArray.prototype = TypedArrayPrototype;
    TypedArrayPrototype.constructor = TypedArray;
  }
}

if (INCORRECT_TYPED_ARRAY_PROTOTYPE) {
  TypedArrayPrototype = TypedArray.prototype;
}

Object.keys(TypedArrayConstructors).forEach(function (name) {
  var Constructor = global[name];
  if (Constructor) {
    var Prototype = Constructor.prototype;
    if (INCORRECT_TYPED_ARRAY_CONSTRUCTOR) {
      setPrototypeOf(Constructor, TypedArray);
    }
    if (INCORRECT_TYPED_ARRAY_PROTOTYPE) {
      setPrototypeOf(Prototype, TypedArrayPrototype);
    }
    var state = enforceInternalState(Prototype);
    state.TypedArrayConstructor = Constructor;
    state.TypedArrayName = name;
  }
});

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

module.exports = {
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype,
  getTypedArrayMetadata: getTypedArrayMetadata,
};