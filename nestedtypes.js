import _map from 'lodash/map';
import _matches from 'lodash/matches';
import _iteratee from 'lodash/iteratee';
import _escape from 'lodash/escape';
import _pick from 'lodash/pick';
import _sortBy from 'lodash/sortBy';
import _countBy from 'lodash/countBy';
import _groupBy from 'lodash/groupBy';
import _partition from 'lodash/partition';
import _sample from 'lodash/sample';
import _isEmpty from 'lodash/isEmpty';
import _lastIndexOf from 'lodash/lastIndexOf';
import _indexOf from 'lodash/indexOf';
import _difference from 'lodash/difference';
import _without from 'lodash/without';
import _last from 'lodash/last';
import _tail from 'lodash/tail';
import _head from 'lodash/head';
import _toArray from 'lodash/toArray';
import _min from 'lodash/min';
import _max from 'lodash/max';
import _invoke from 'lodash/invoke';
import _includes from 'lodash/includes';
import _some from 'lodash/some';
import _every from 'lodash/every';
import _filter from 'lodash/filter';
import _findLastIndex from 'lodash/findLastIndex';
import _findIndex from 'lodash/findIndex';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _each from 'lodash/each';
import _forEach from 'lodash/forEach';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Simple overridable logging stubs, writing to `console` by default.
 * Node.js users might want to redirect logging somewhere.
 *
 * This is the singleton avaliable globally through `Object.log` or
 * exported [[log]] variable.
 */
/**
 * Simple overridable logging stubs, writing to `console` by default.
 * Node.js users might want to redirect logging somewhere.
 *
 * This is the singleton avaliable globally through `Object.log` or
 * exported [[log]] variable.
 */var Log = function () {
    /** @hidden */
    function Log() {
        classCallCheck(this, Log);

        /** Stop in debugger on specified logging events.
         *
         *      Object.log.stops.error = true;
         */
        this.stops = {};
        /** Throw exceptions for specified logging events.
         *
         *      Object.log.throws.error = true;
         */
        this.throws = {};
        this.logger = typeof console !== 'undefined' ? console : null;
        this.reset();
    }

    Log.prototype.doLogging = function doLogging(type, args) {
        var logger = this.logger;var logMethod = logger && logger[type];
        if (logMethod) logMethod.apply(logger, args);
        if (this.stops[type]) debugger;
        if (this.throws[type]) throw new Error('[' + type + '] ' + args[0]);
        this.counts[type]++;
    };
    /** Reset logger to default settings. */


    Log.prototype.reset = function reset() {
        this.level = 2;
        this.counts = { error: 0, warn: 0, info: 0, debug: 0 };
        this.stops = {};
        return this;
    };
    /** Show info, stop on errors.
     * @param trueDeveloper Stop on warnings as well.
     */


    Log.prototype.developer = function developer(trueDeveloper) {
        this.level = 3;
        this.stops = { error: true, warn: Boolean(trueDeveloper) };
        return this;
    };
    /** Similar to the `console.error`. Logging level 1. */


    Log.prototype.error = function error() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (this.level > 0) this.doLogging('error', args);
    };
    /** Similar to the `console.warn`. Logging level 2 (default). */


    Log.prototype.warn = function warn() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (this.level > 1) this.doLogging('warn', args);
    };
    /** Similar to the `console.info`. Logging level 3. */


    Log.prototype.info = function info() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        if (this.level > 2) this.doLogging('info', args);
    };
    /** Similar to the `console.debug`. Logging level 4. */


    Log.prototype.debug = function debug() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        if (this.level > 3) this.doLogging('debug', args);
    };
    /** `Object.log.state` - can be used to inspect logger state in the console. */


    createClass(Log, [{
        key: 'state',
        get: function get$$1() {
            return '\nObject.log - Object+ Logging and Debugging Utility\n--------------------------------------------------\nObject.log.counts: Number of logged events by type\n    { errors : ' + this.counts.error + ', warns : ' + this.counts.warn + ', info : ' + this.counts.info + ', debug : ' + this.counts.debug + ' }\n\nObject.log.level == ' + this.level + ' : Ignore events which are above specified level\n    - 0 - logging is off;\n    - 1 - Object.log.error(...) only;\n    - 2 - .error() and .warn();\n    - 3 - .error(), .warn(), and .info();\n    - 4 - all of above plus .debug().\n\nObject.log.stops: Stops in debugger for some certain event types\n     { error : ' + (this.stops.error || false) + ', warn  : ' + (this.stops.warn || false) + ', info  : ' + (this.stops.info || false) + ', debug : ' + (this.stops.debug || false) + ' }\n\nObject.log.throws: Throws expection on some certain event types\n     { error : ' + (this.throws.error || false) + ', warn  : ' + (this.throws.warn || false) + ', info  : ' + (this.throws.info || false) + ', debug : ' + (this.throws.debug || false) + ' }\n';
        }
    }]);
    return Log;
}();
/** Logger singleton.
 * @see [[Log]] for API.
 */
var log = new Log();
/** Check if value is raw JSON */
function isValidJSON(value) {
    if (value === null) {
        return true;
    }
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
        case 'string':
        case 'boolean':
            return true;
        case 'object':
            var proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return every(value, isValidJSON);
            }
    }
    return false;
}
/** Get the base class constructor function.
 * @param Class Subclass constructor function.
 * @returns Base class constructor function.
 */
function getBaseClass(Class) {
    return Object.getPrototypeOf(Class.prototype).constructor;
}
/** Get a hash of static (constructor) properties which have not been inherited.
 * @param Ctor class constructor function.
 * @param names comma-separated list of static property names to compare.
 * @returns hash of listed statics which are added or overriden in the class.
 */
function getChangedStatics(Ctor) {
    var Base = getBaseClass(Ctor),
        props = {};

    for (var _len5 = arguments.length, names = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        names[_key5 - 1] = arguments[_key5];
    }

    for (var _iterator = names, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var name = _ref;

        var value = Ctor[name];
        if (value !== void 0 && value !== Base[name]) {
            props[name] = value;
        }
    }
    return props;
}
/** Checks whenever given object is an empty hash `{}` */
function isEmpty(obj) {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
/** @hidden */
function someArray(arr, fun) {
    var result = void 0;
    for (var i = 0; i < arr.length; i++) {
        if (result = fun(arr[i], i)) {
            return result;
        }
    }
}
/** @hidden */
function someObject(obj, fun) {
    var result = void 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (result = fun(obj[key], key)) {
                return result;
            }
        }
    }
}
/** Similar to underscore `_.some` */
function some(obj, fun) {
    if (Object.getPrototypeOf(obj) === ArrayProto) {
        return someArray(obj, fun);
    } else {
        return someObject(obj, fun);
    }
}
/** Similar to underscore `_.every` */
function every(obj, predicate) {
    return !some(obj, function (x) {
        return !predicate(x);
    });
}
/** Similar to `getOwnPropertyDescriptor`, but traverse the whole prototype chain. */
function getPropertyDescriptor(obj, prop) {
    var desc = void 0;
    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
        desc = Object.getOwnPropertyDescriptor(proto, prop);
    }
    return desc;
}
function omit(source) {
    var dest = {},
        discard = {};
    for (var i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard.hasOwnProperty(name) && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
/** map `source` object properties with a given function, and assign the result to the `dest` object.
 * When `fun` returns `undefined`, skip this value.
 */
function transform(dest, source, fun) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            var value = fun(source[name], name);
            value === void 0 || (dest[name] = value);
        }
    }
    return dest;
}
/** @hidden */
function fastAssign(dest, source) {
    for (var name in source) {
        dest[name] = source[name];
    }
    return dest;
}
/** @hidden */
function fastDefaults(dest, source) {
    for (var name in source) {
        if (dest[name] === void 0) {
            dest[name] = source[name];
        }
    }
    return dest;
}
function assign(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && assign(dest, other);
        }
    }
    return dest;
}
function defaults$$1(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name) && !dest.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && defaults$$1(dest, other);
        }
    }
    return dest;
}
Object.setPrototypeOf || (Object.setPrototypeOf = defaults$$1);
/** Similar to underscore `_.keys` */
function keys(o) {
    return o ? Object.keys(o) : [];
}
/** Similar to underscore `_.once` */
function once$1(func) {
    var memo,
        first = true;
    return function () {
        if (first) {
            first = false;
            memo = func.apply(this, arguments);
            func = null;
        }
        return memo;
    };
}
/** @hidden */
var ArrayProto = Array.prototype;
var DateProto = Date.prototype;
var ObjectProto = Object.prototype;
/**
 * Determine whenever two values are not equal, deeply traversing
 * arrays and plain JS objects (hashes). Dates are compared by enclosed timestamps, all other
 * values are compared with strict comparison.
 */
function notEqual(a, b) {
    if (a === b) return false;
    if (a && b && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) == 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) == 'object') {
        var protoA = Object.getPrototypeOf(a);
        if (protoA !== Object.getPrototypeOf(b)) return true;
        switch (protoA) {
            case DateProto:
                return +a !== +b;
            case ArrayProto:
                return arraysNotEqual(a, b);
            case ObjectProto:
            case null:
                return objectsNotEqual(a, b);
        }
    }
    return true;
}
/** @hidden */
function objectsNotEqual(a, b) {
    var keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length) return true;
    for (var i = 0; i < keysA.length; i++) {
        var key = keysA[i];
        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
            return true;
        }
    }
    return false;
}
/** @hidden */
function arraysNotEqual(a, b) {
    if (a.length !== b.length) return true;
    for (var i = 0; i < a.length; i++) {
        if (notEqual(a[i], b[i])) return true;
    }
    return false;
}



var tools = Object.freeze({
	Log: Log,
	log: log,
	isValidJSON: isValidJSON,
	getBaseClass: getBaseClass,
	getChangedStatics: getChangedStatics,
	isEmpty: isEmpty,
	some: some,
	every: every,
	getPropertyDescriptor: getPropertyDescriptor,
	omit: omit,
	transform: transform,
	fastAssign: fastAssign,
	fastDefaults: fastDefaults,
	assign: assign,
	defaults: defaults$$1,
	keys: keys,
	once: once$1,
	notEqual: notEqual
});

/**
 * Mixins and @define metaprogramming class extensions
 *
 * Vlad Balin & Volicon, (c) 2016
 */
/**
 * Base class, holding metaprogramming class extensions.
 * Supports mixins and Class.define metaprogramming method.
 *
 * It's required to use `@define` decorator on inheritace.
 *
 *      @define({ a : 1 }) // add 'a' property to A.prototype
 *      class A extends Mixable {}
 *
 * or
 *      @define
 *      class A extends Mixable {}
 */

var Mixable = function () {
    function Mixable() {
        classCallCheck(this, Mixable);
        this.initialize.apply(this, arguments);
    }

    Mixable.prototype.initialize = function initialize() {};
    /** Generic class factory. May be overridden for abstract classes. Not inherited. */


    Mixable.create = function create(a, b) {
        return new this(a, b);
    };
    /**
     * Attach the sequence of mixins to the class prototype.
     *
     * ```javascript
     *    MyMixableClass.mixins( plainObjMixin, OtherConstructor, ... );
     *    MyOtherClass.mixins([ plainObjMixin, OtherConstructor, ... ]);
     * ```
     *
     * @param mixins The list of class constructors or plain objects. Both static and prototype properties are mixed in for constructors.
     */


    Mixable.mixins = function mixins() {
        var proto = this.prototype,
            mergeRules = this._mixinRules || {},
            _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();
        // Apply mixins in sequence...

        for (var _len = arguments.length, _mixins = Array(_len), _key = 0; _key < _len; _key++) {
            _mixins[_key] = arguments[_key];
        }

        for (var _iterator = _mixins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var mixin = _ref;

            // Mixins array should be flattened.
            if (mixin instanceof Array) {
                return Mixable.mixins.apply(this, mixin);
            }
            // Don't apply mixins twice.
            if (_appliedMixins.indexOf(mixin) >= 0) continue;
            _appliedMixins.push(mixin);
            // For constructors, merge _both_ static and prototype members.
            if (typeof mixin === 'function') {
                // Statics are merged by simple substitution.
                defaults$$1(this, mixin);
                // Prototypes are merged according with a rules.
                mergeProps(proto, mixin.prototype, mergeRules);
            } else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };
    /** Inversion of control version of [[Mixable.mixin]].
     * `Class.mixTo( A, B, ... )` will mix static and prototype `Class` members to the given list of classes.
     * `Mixable.mixTo( A, B, ... )` can be used to convert any classes to mixable.
    */


    Mixable.mixTo = function mixTo() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        for (var _iterator2 = args, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var Ctor = _ref2;

            Mixable.mixins.call(Ctor, this);
        }
        return this;
    };
    /** Define specific rules for mixin some particular class members.
     *  mixinRules of the base class are properly merged on inheritance.
     */


    Mixable.mixinRules = function mixinRules(_mixinRules) {
        var Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(_mixinRules, Base._mixinRules);
        }
        this._mixinRules = _mixinRules;
        return this;
    };
    /**
     * Main metaprogramming method. May be overriden in subclasses to customize the behavior.
     * - Merge definition to the class prototype.
     * - Add native properties with descriptors from `definition.properties` to the prototype.
     * - Prevents inheritance of 'create' factory method.
     * - Assign mixinRules static property, and merge it with parent.
     * - Adds mixins.
     */


    Mixable.define = function define() {
        var definition = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var staticProps = arguments[1];

        // That actually might happen when we're using @define decorator...
        if (!this.define) {
            log.error("[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
            return this;
        }
        this.predefine();
        // Obtain references to prototype and base class.
        var proto = this.prototype;
        // Extract prototype properties from the definition.
        var protoProps = omit(definition, 'properties', 'mixins', 'mixinRules');var _definition$propertie = definition.properties;
        var properties = _definition$propertie === undefined ? {} : _definition$propertie;
        var mixins = definition.mixins;
        var mixinRules = definition.mixinRules;
        // Update prototype and statics.

        assign(proto, protoProps);
        assign(this, staticProps);
        // Define native properties.
        properties && Object.defineProperties(proto, transform({}, properties, toPropertyDescriptor));
        // Apply mixins and mixin rules.
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };
    /** Backbone-compatible extend method to be used in ES5 and for backward compatibility */


    Mixable.extend = function extend(spec, statics) {
        var Subclass = void 0;
        // 1. Create the subclass (ES5 compatibility shim).
        // If constructor function is given...
        if (spec && spec.hasOwnProperty('constructor')) {
            // ...we need to manually call internal TypeScript __extend function. Hack! Hack!
            Subclass = spec.constructor;
            __extends(Subclass, this);
        } else {
            Subclass = function (_ref3) {
                inherits(_Subclass, _ref3);

                function _Subclass() {
                    classCallCheck(this, _Subclass);
                    return possibleConstructorReturn(this, _ref3.apply(this, arguments));
                }

                return _Subclass;
            }(this);
        }
        // 2. Apply definitions
        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
    };
    /** Do the magic necessary for forward declarations.
     *  Can be overriden by subclasses.
     *  Must be written in the way that it's safe to call twice.
     */


    Mixable.predefine = function predefine() {
        var BaseClass = getBaseClass(this);
        // Make sure we don't inherit class factories.
        if (BaseClass.create === this.create) {
            this.create = Mixable.create;
        }
        this.__super__ = BaseClass.prototype;
        return this;
    };

    return Mixable;
}();
Mixable._mixinRules = { properties: 'merge' };
/** @hidden */
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x } : x;
    }
}
/** @decorator `@mixinRules({ ... })`. Has the same effect as [[Mixable.mixinRules]]. Can be used with any ES6 class.
 *  See [[MixinRules]] for rules specification.
 */

/** @decorator `@mixins( A, B, C... )`.
 * Has the same effect as [[Mixable.mixins]]. Can be used with any ES6 class.
 */
function mixins() {
    for (var _len3 = arguments.length, list = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        list[_key3] = arguments[_key3];
    }

    return createDecorator('mixins', list);
}
/** @decorator `@extendable`. Convert ES6 class to be [[Mixable]] one. */
function extendable(Type) {
    Mixable.mixTo(Type);
}
/** @decorator `@predefine` for forward definitions. Can be used with [[Mixable]] classes only.
 * Forwards the call to the [[Mixable.predefine]];
 */

/** @decorator `@define` for metaprogramming magic. Can be used with [[Mixable]] classes only.
 *  Forwards the call to [[Mixable.define]].
 */
function define(spec) {
    // Handle the case when `@define` used without arguments.
    if (typeof spec === 'function') {
        spec.define({});
    } else {
        return createDecorator('define', spec);
    }
}
// Create ES7 class decorator forwarding call to the static class member.
// If there is no such a member, forward the call to Class.
/** @hidden */
function createDecorator(name, spec) {
    return function (Ctor) {
        if (Ctor[name]) {
            Ctor[name](spec);
        } else {
            Mixable[name].call(Ctor, spec);
        }
    };
}
/***********************
 * Mixins helpers
 */
/** @hidden */
function mergeObjects(a, b, rules) {
    var x = assign({}, a);
    return mergeProps(x, b, rules);
}
/** @hidden */
var mergeFunctions = {
    pipe: function pipe(a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    },
    mergeSequence: function mergeSequence(a, b) {
        return function () {
            return defaults$$1(a.call(this), b.call(this));
        };
    },
    overwrite: function overwrite(a, b) {
        return b;
    },
    sequence: function sequence(a, b) {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    },
    reverse: function reverse(a, b) {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    },
    every: function every$$1(a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some: function some$$1(a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
/** @hidden */
function mergeProps(target, source) {
    var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    for (var _iterator3 = Object.keys(source), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref4 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref4 = _i3.value;
        }

        var name = _ref4;

        if (name === 'constructor') continue;
        var sourceProp = Object.getOwnPropertyDescriptor(source, name),
            destProp = getPropertyDescriptor(target, name),
            // Shouldn't be own
        value = destProp && destProp.value;
        if (value != null) {
            var rule = rules[name];
            if (rule) {
                target[name] = (typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) === 'object' ? mergeObjects(value, sourceProp.value, rule) : rule === 'merge' ? mergeObjects(value, sourceProp.value) : mergeFunctions[rule](value, sourceProp.value);
            }
        } else {
            Object.defineProperty(target, name, sourceProp);
        }
    }
    return target;
}

/** @hidden */
var EventMap = function () {
    function EventMap(map) {
        classCallCheck(this, EventMap);

        this.handlers = [];
        if (map) {
            if (map instanceof EventMap) {
                this.handlers = map.handlers.slice();
            } else {
                map && this.addEventsMap(map);
            }
        }
    }

    EventMap.prototype.merge = function merge(map) {
        this.handlers = this.handlers.concat(map.handlers);
    };

    EventMap.prototype.addEventsMap = function addEventsMap(map) {
        for (var names in map) {
            this.addEvent(names, map[names]);
        }
    };

    EventMap.prototype.bubbleEvents = function bubbleEvents(names) {
        for (var _iterator = names.split(eventSplitter$1), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var name = _ref;

            this.addEvent(name, getBubblingHandler(name));
        }
    };

    EventMap.prototype.addEvent = function addEvent(names, callback) {
        var handlers = this.handlers;

        for (var _iterator2 = names.split(eventSplitter$1), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var name = _ref2;

            handlers.push(new EventDescriptor(name, callback));
        }
    };

    EventMap.prototype.subscribe = function subscribe(target, source) {
        for (var _iterator3 = this.handlers, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var event = _ref3;

            on$1(source, event.name, event.callback, target);
        }
    };

    EventMap.prototype.unsubscribe = function unsubscribe(target, source) {
        for (var _iterator4 = this.handlers, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var event = _ref4;

            off$1(source, event.name, event.callback, target);
        }
    };

    return EventMap;
}();
/** @hidden */

var EventDescriptor = function EventDescriptor(name, callback) {
    classCallCheck(this, EventDescriptor);

    this.name = name;
    if (callback === true) {
        this.callback = getBubblingHandler(name);
    } else if (typeof callback === 'string') {
        this.callback = function localCallback() {
            var handler = this[callback];
            handler && handler.apply(this, arguments);
        };
    } else {
        this.callback = callback;
    }
};
/** @hidden */


var _bubblingHandlers = {};
/** @hidden */
function getBubblingHandler(event) {
    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c, d, e) {
        if (d !== void 0 || e !== void 0) trigger5$1(this, event, a, b, c, d, e);
        if (c !== void 0) trigger3$1(this, event, a, b, c);else trigger2$1(this, event, a, b);
    });
}
/** @hidden */
var EventHandler$1 = function EventHandler(callback, context) {
    var next = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    classCallCheck(this, EventHandler);

    this.callback = callback;
    this.context = context;
    this.next = next;
};
/** @hidden */
function listOff(_events, name, callback, context) {
    var head = _events[name];
    var filteredHead = void 0,
        prev = void 0;
    for (var ev = head; ev; ev = ev.next) {
        // Element must be kept
        if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
            prev = ev;
            filteredHead || (filteredHead = ev);
        } else {
            if (prev) prev.next = ev.next;
        }
    }
    if (head !== filteredHead) _events[name] = filteredHead;
}
/** @hidden */
function listSend2(head, a, b) {
    for (var ev = head; ev; ev = ev.next) {
        ev.callback.call(ev.context, a, b);
    }
}
/** @hidden */
function listSend3(head, a, b, c) {
    for (var ev = head; ev; ev = ev.next) {
        ev.callback.call(ev.context, a, b, c);
    }
}
/** @hidden */
function listSend4(head, a, b, c, d) {
    for (var ev = head; ev; ev = ev.next) {
        ev.callback.call(ev.context, a, b, c, d);
    }
}
/** @hidden */
function listSend5(head, a, b, c, d, e) {
    for (var ev = head; ev; ev = ev.next) {
        ev.callback.call(ev.context, a, b, c, d, e);
    }
}
/** @hidden */
function listSend6(head, a, b, c, d, e, f) {
    for (var ev = head; ev; ev = ev.next) {
        ev.callback.call(ev.context, a, b, c, d, e, f);
    }
}
/** @hidden */
function on$1(source, name, callback, context) {
    if (callback) {
        var _events = source._events || (source._events = Object.create(null));
        _events[name] = new EventHandler$1(callback, context, _events[name]);
    }
}
/** @hidden */
function once$2(source, name, callback, context) {
    if (callback) {
        (function () {
            var once$$1 = once$1(function () {
                off$1(source, name, once$$1);
                callback.apply(this, arguments);
            });
            once$$1._callback = callback;
            on$1(source, name, once$$1, context);
        })();
    }
}
/** @hidden */
function off$1(source, name, callback, context) {
    var _events = source._events;

    if (_events) {
        if (callback || context) {
            if (name) {
                listOff(_events, name, callback, context);
            } else {
                for (var _name in _events) {
                    listOff(_events, _name, callback, context);
                }
            }
        } else if (name) {
            _events[name] = void 0;
        } else {
            source._events = void 0;
        }
    }
}
/** @hidden */
var eventSplitter$1 = /\s+/;
/** @hidden */
function strings$1(api, source, events, callback, context) {
    if (eventSplitter$1.test(events)) {
        var names = events.split(eventSplitter$1);
        for (var _iterator5 = names, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref5 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref5 = _i5.value;
            }

            var name = _ref5;

            api(source, name, callback, context);
        }
    } else api(source, events, callback, context);
}
/*********************************
 * Event-triggering API
 */
/** @hidden */
function trigger2$1(self, name, a, b) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        listSend2(queue, a, b);
        listSend3(all, name, a, b);
    }
}

/** @hidden */
function trigger3$1(self, name, a, b, c) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        listSend3(queue, a, b, c);
        listSend4(all, name, a, b, c);
    }
}

/** @hidden */
function trigger5$1(self, name, a, b, c, d, e) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        listSend5(queue, a, b, c, d, e);
        listSend6(all, name, a, b, c, d, e);
    }
}

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var extendable$1 = extendable;
var strings$$1 = strings$1;
var _on = on$1;
var _off = off$1;
var _once = once$2;
var trigger5$$1 = trigger5$1;
var trigger2$$1 = trigger2$1;
var trigger3$$1 = trigger3$1;
/** @hidden */
var _idCount = 0;
/** @hidden */
function uniqueId() {
    return 'l' + _idCount++;
}
/*************************
 * Messenger is mixable class with capabilities of sending and receiving synchronous events.
 * This class itself can serve as both mixin and base class.
 */
var Messenger = Messenger_1 = function () {
    /** @hidden */
    function Messenger() {
        classCallCheck(this, Messenger);

        /** @hidden */
        this._events = void 0;
        /** @hidden */
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }
    /** Method is called at the end of the constructor */


    Messenger.prototype.initialize = function initialize() {};
    /** @private */


    Messenger.define = function define$$1(protoProps, staticProps) {
        var spec = omit(protoProps || {}, 'localEvents');
        if (protoProps) {
            var localEvents = protoProps.localEvents;
            var _localEvents = protoProps._localEvents;

            if (localEvents || _localEvents) {
                var eventsMap = new EventMap(this.prototype._localEvents);
                localEvents && eventsMap.addEventsMap(localEvents);
                _localEvents && eventsMap.merge(_localEvents);
                spec._localEvents = eventsMap;
            }
        }
        return Mixable.define.call(this, spec, staticProps);
    };

    Messenger.prototype.on = function on$$1(events, callback, context) {
        if (typeof events === 'string') strings$$1(_on, this, events, callback, context);else for (var name in events) {
            strings$$1(_on, this, name, events[name], context || callback);
        }return this;
    };

    Messenger.prototype.once = function once$$1(events, callback, context) {
        if (typeof events === 'string') strings$$1(_once, this, events, callback, context);else for (var name in events) {
            strings$$1(_once, this, name, events[name], context || callback);
        }return this;
    };

    Messenger.prototype.off = function off$$1(events, callback, context) {
        if (!events) _off(this, void 0, callback, context);else if (typeof events === 'string') strings$$1(_off, this, events, callback, context);else for (var name in events) {
            strings$$1(_off, this, name, events[name], context || callback);
        }return this;
    };
    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).


    Messenger.prototype.trigger = function trigger(name, a, b, c, d, e) {
        if (d !== void 0 || e !== void 0) trigger5$$1(this, name, a, b, c, d, e);else if (c !== void 0) trigger3$$1(this, name, a, b, c);else trigger2$$1(this, name, a, b);
        return this;
    };

    Messenger.prototype.listenTo = function listenTo(source, a, b) {
        if (source) {
            addReference(this, source);
            source.on(a, !b && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' ? this : b, this);
        }
        return this;
    };

    Messenger.prototype.listenToOnce = function listenToOnce(source, a, b) {
        if (source) {
            addReference(this, source);
            source.once(a, !b && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' ? this : b, this);
        }
        return this;
    };

    Messenger.prototype.stopListening = function stopListening(a_source, a, b) {
        var _listeningTo = this._listeningTo;

        if (_listeningTo) {
            var removeAll = !(a || b),
                second = !b && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' ? this : b;
            if (a_source) {
                var source = _listeningTo[a_source.cid];
                if (source) {
                    if (removeAll) delete _listeningTo[a_source.cid];
                    source.off(a, second, this);
                }
            } else if (a_source == null) {
                for (var cid in _listeningTo) {
                    _listeningTo[cid].off(a, second, this);
                }if (removeAll) this._listeningTo = void 0;
            }
        }
        return this;
    };

    Messenger.prototype.dispose = function dispose() {
        if (this._disposed) return;
        this.stopListening();
        this.off();
        this._disposed = true;
    };

    return Messenger;
}();
Messenger = Messenger_1 = __decorate([extendable$1], Messenger);
/**
 * Backbone 1.2 API conformant Events mixin.
 */
var Events = omit(Messenger.prototype, 'constructor', 'initialize');
/**
 * Messenger Private Helpers
 */
/** @hidden */
function addReference(listener, source) {
    var listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)),
        cid = source.cid || (source.cid = uniqueId());
    listeningTo[cid] = source;
}
var Messenger_1;

// (c) 2016 Vlad Balin and Volicon
// MixtureJS may be freely distributed under the MIT license.
Object.extend = function (protoProps, staticProps) {
  return Mixable.extend(protoProps, staticProps);
};
Object.assign || (Object.assign = assign);
Object.log = log;

// Validation error object.
var ValidationError = function () {
    function ValidationError(obj) {
        classCallCheck(this, ValidationError);

        this.length = obj._validateNested(this.nested = {});
        if (this.error = obj.validate(obj)) {
            this.length++;
        }
    }

    ValidationError.prototype.each = function each(iteratee) {
        var error = this.error;
        var nested = this.nested;

        if (error) iteratee(error, null);
        for (var key in nested) {
            iteratee(nested[key], key);
        }
    };

    ValidationError.prototype.eachError = function eachError(iteratee, object) {
        this.each(function (value, key) {
            if (value instanceof ValidationError) {
                value.eachError(iteratee, object.get(key));
            } else {
                iteratee(value, key, object);
            }
        });
    };

    return ValidationError;
}();

var referenceMask = /\^|([^.]+)/g;
var CompiledReference = function CompiledReference(reference) {
    var splitTail = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    classCallCheck(this, CompiledReference);

    var path = reference.match(referenceMask).map(function (key) {
        if (key === '^') return 'getOwner()';
        if (key[0] === '~') return 'getStore().get("' + key.substr(1) + '")';
        return key;
    });
    this.tail = splitTail && path.pop();
    this.local = !path.length;
    path.unshift('self');
    this.resolve = new Function('self', 'return ' + path.join('.') + ';');
};
function resolveReference(root, reference, action) {
    var path = reference.match(referenceMask),
        skip = path.length - 1;
    var self = root;
    for (var i = 0; i < skip; i++) {
        var key = path[i];
        switch (key) {
            case '~':
                self = self.getStore();
                break;
            case '^':
                self = self.getOwner();
                break;
            default:
                self = self.get(key);
        }
        // Do nothing if object on the path doesn't exist.
        if (!self) return;
    }
    return action(self, path[skip]);
}

var __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var trigger3$2 = trigger3$1;
var on$3 = on$1;
var off$3 = off$1;

var ItemsBehavior;
(function (ItemsBehavior) {
    ItemsBehavior[ItemsBehavior["share"] = 1] = "share";
    ItemsBehavior[ItemsBehavior["listen"] = 2] = "listen";
    ItemsBehavior[ItemsBehavior["persistent"] = 4] = "persistent";
})(ItemsBehavior || (ItemsBehavior = {}));
// Transactional object interface
var Transactional = function () {
    function Transactional(cid) {
        classCallCheck(this, Transactional);

        /** @private */
        this._events = void 0;
        // Unique version token replaced on change
        /** @private */
        this._changeToken = {};
        // true while inside of the transaction
        /** @private */
        this._transaction = false;
        // Holds current transaction's options, when in the middle of transaction and there're changes but is an unsent change event
        /** @private */
        this._isDirty = null;
        // Backreference set by owner (Record, Collection, or other object)
        /** @private */
        this._owner = void 0;
        // Key supplied by owner. Used by record to identify attribute key.
        // Only collections doesn't set the key, which is used to distinguish collections.
        /** @private */
        this._ownerKey = void 0;
        /*********************************
         * Validation API
         */
        // Lazily evaluated validation error
        /** @private */
        this._validationError = void 0;
        this.cid = this.cidPrefix + cid;
    }

    Transactional.prototype.dispose = function dispose() {
        if (this._disposed) return;
        this._owner = void 0;
        this._ownerKey = void 0;
        this.off();
        this.stopListening();
        this._disposed = true;
    };

    Transactional.prototype.initialize = function initialize() {};
    /**
     * Subsribe for the changes.
     */


    Transactional.prototype.onChanges = function onChanges(handler, target) {
        on$3(this, this._changeEventName, handler, target);
    };
    /**
     * Unsubscribe from changes.
     */


    Transactional.prototype.offChanges = function offChanges(handler, target) {
        off$3(this, this._changeEventName, handler, target);
    };
    /**
     * Listen to changes event.
     */


    Transactional.prototype.listenToChanges = function listenToChanges(target, handler) {
        this.listenTo(target, target._changeEventName, handler);
    };
    // Execute given function in the scope of ad-hoc transaction.


    Transactional.prototype.transaction = function transaction(fun) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = transactionApi.begin(this);
        fun.call(this, this);
        isRoot && transactionApi.commit(this);
    };
    // Loop through the members in the scope of transaction.
    // Transactional version of each()


    Transactional.prototype.updateEach = function updateEach(iteratee, options) {
        var isRoot = transactionApi.begin(this);
        this.each(iteratee);
        isRoot && transactionApi.commit(this);
    };
    // Apply bulk in-place object update in scope of ad-hoc transaction


    Transactional.prototype.set = function set$$1(values, options) {
        if (values) {
            var transaction = this._createTransaction(values, options);
            transaction && transaction.commit();
        }
        return this;
    };
    // Parse function applied when 'parse' option is set for transaction.


    Transactional.prototype.parse = function parse(data, options) {
        return data;
    };
    // Get object member by symbolic reference.


    Transactional.prototype.deepGet = function deepGet(reference) {
        return resolveReference(this, reference, function (object, key) {
            return object.get ? object.get(key) : object[key];
        });
    };
    //_isCollection : boolean
    // Return owner skipping collections.


    Transactional.prototype.getOwner = function getOwner() {
        return this._owner;
    };
    // Locate the closest store. Store object stops traversal by overriding this method.


    Transactional.prototype.getStore = function getStore() {
        var _owner = this._owner;

        return _owner ? _owner.getStore() : this._defaultStore;
    };
    // Map members to an array


    Transactional.prototype.map = function map(iteratee, context) {
        var arr = [],
            fun = context !== void 0 ? function (v, k) {
            return iteratee.call(context, v, k);
        } : iteratee;
        this.each(function (val, key) {
            var result = fun(val, key);
            if (result !== void 0) arr.push(result);
        });
        return arr;
    };
    // Map members to an object


    Transactional.prototype.mapObject = function mapObject(iteratee, context) {
        var obj = {},
            fun = context !== void 0 ? function (v, k) {
            return iteratee.call(context, v, k);
        } : iteratee;
        this.each(function (val, key) {
            var result = iteratee(val, key);
            if (result !== void 0) obj[key] = result;
        });
        return obj;
    };
    // Validate ownership tree and return valudation error


    // Object-level validator. Returns validation error.
    Transactional.prototype.validate = function validate(obj) {};
    // Return validation error (or undefined) for nested object with the given key.


    Transactional.prototype.getValidationError = function getValidationError(key) {
        var error = this.validationError;
        return (key ? error && error.nested[key] : error) || null;
    };
    // Get validation error for the given symbolic reference.


    Transactional.prototype.deepValidationError = function deepValidationError(reference) {
        return resolveReference(this, reference, function (object, key) {
            return object.getValidationError(key);
        });
    };
    // Iterate through all validation errors across the ownership tree.


    Transactional.prototype.eachValidationError = function eachValidationError(iteratee) {
        var validationError = this.validationError;

        validationError && validationError.eachError(iteratee, this);
    };
    // Check whenever member with a given key is valid.


    Transactional.prototype.isValid = function isValid(key) {
        return !this.getValidationError(key);
    };

    Transactional.prototype.valueOf = function valueOf() {
        return this.cid;
    };

    Transactional.prototype.toString = function toString() {
        return this.cid;
    };
    // Get class name for an object instance. Works fine with ES6 classes definitions (not in IE).


    Transactional.prototype.getClassName = function getClassName() {
        var name = this.constructor.name;

        if (name !== 'Subclass') return name;
    };

    createClass(Transactional, [{
        key: "validationError",
        get: function get$$1() {
            var error = this._validationError || (this._validationError = new ValidationError(this));
            return error.length ? error : null;
        }
    }]);
    return Transactional;
}();
Transactional = __decorate$2([mixins(Messenger), extendable], Transactional);
/**
 * Low-level transactions API. Must be used like this:
 * const isRoot = begin( record );
 * ...
 * isRoot && commit( record, options );
 *
 * When committing nested transaction, the flag must be set to true.
 * commit( object, options, isNested )
 */
var transactionApi = {
    // Start transaction. Return true if it's the root one.
    /** @private */
    begin: function begin(object) {
        return object._transaction ? false : object._transaction = true;
    },

    // Mark object having changes inside of the current transaction.
    // Returns true whenever there notifications are required.
    /** @private */
    markAsDirty: function markAsDirty(object, options) {
        // If silent option is in effect, don't set isDirty flag.
        var dirty = !options.silent;
        if (dirty) object._isDirty = options;
        // Reset version token.
        object._changeToken = {};
        // Object is changed, so validation must happen again. Clear the cache.
        object._validationError = void 0;
        return dirty;
    },

    // Commit transaction. Send out change event and notify owner. Returns true if there were changes.
    // Must be executed for the root transaction only.
    /** @private */
    commit: function commit(object, initiator) {
        var originalOptions = object._isDirty;
        if (originalOptions) {
            // Send the sequence of change events, handling chained handlers.
            while (object._isDirty) {
                var options = object._isDirty;
                object._isDirty = null;
                trigger3$2(object, object._changeEventName, object, options, initiator);
            }
            // Mark transaction as closed.
            object._transaction = false;
            // Notify owner on changes out of transaction scope.
            var _owner = object._owner;

            if (_owner && _owner !== initiator) {
                _owner._onChildrenChange(object, originalOptions);
            }
        } else {
            // No changes. Silently close transaction.
            object._isDirty = null;
            object._transaction = false;
        }
    },

    /************************************
     * Ownership management
     */
    // Add reference to the record.
    /** @private */
    aquire: function aquire(owner, child, key) {
        if (!child._owner) {
            child._owner = owner;
            child._ownerKey = key;
            return true;
        }
        return child._owner === owner;
    },

    // Remove reference to the record.
    /** @private */
    free: function free(owner, child) {
        if (owner === child._owner) {
            child._owner = void 0;
            child._ownerKey = void 0;
        }
    }
};

/**
 * Record core implementing transactional updates.
 * The root of all definitions.
 */
var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var trigger3$3 = trigger3$1;var assign$4 = assign;
var isEmpty$1 = isEmpty;
var _commit = transactionApi.commit;var _begin = transactionApi.begin;var _markAsDirty = transactionApi.markAsDirty;
// Client unique id counter
var _cidCounter = 0;
var Record = Record_1 = function (_Transactional) {
    inherits(Record, _Transactional);

    /***************************************************
     * Record construction
     */
    // Create record, optionally setting an owner
    function Record(a_values, a_options) {
        classCallCheck(this, Record);

        var _this = possibleConstructorReturn(this, _Transactional.call(this, _cidCounter++));

        _this.attributes = {};
        var options = a_options || {},
            values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
        // TODO: type error for wrong object.
        var attributes = options.clone ? cloneAttributes(_this, values) : _this.defaults(values);
        _this.forEachAttr(attributes, function (value, key, attr) {
            var next = attributes[key] = attr.transform(value, options, void 0, _this);
            attr.handleChange(next, void 0, _this);
        });
        _this.attributes = _this._previousAttributes = attributes;
        _this.initialize(a_values, a_options);
        if (_this._localEvents) _this._localEvents.subscribe(_this, _this);
        return _this;
    }
    // Implemented at the index.ts to avoid circular dependency. Here we have just proper singature.


    Record.define = function define$$1(protoProps, staticProps) {
        return Transactional.define(protoProps, staticProps);
    };

    Record.defaults = function defaults$$1(attrs) {
        return this.extend({ attributes: attrs });
    };

    Record.prototype.previousAttributes = function previousAttributes() {
        return new this.Attributes(this._previousAttributes);
    };
    // Polymorphic accessor for aggregated attribute's canBeUpdated().


    Record.prototype.changedAttributes = function changedAttributes(diff) {
        if (!diff) return this.hasChanged() ? assign$4({}, this.changed) : false;
        var val,
            changed = false,
            old = this._transaction ? this._previousAttributes : this.attributes,
            attrSpecs = this._attributes;
        for (var attr in diff) {
            if (!attrSpecs[attr].isChanged(old[attr], val = diff[attr])) continue;
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };

    Record.prototype.hasChanged = function hasChanged(key) {
        var _previousAttributes = this._previousAttributes;

        if (!_previousAttributes) return false;
        return key ? this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) : !isEmpty$1(this.changed);
    };

    Record.prototype.previous = function previous(key) {
        if (key) {
            var _previousAttributes = this._previousAttributes;

            if (_previousAttributes) return _previousAttributes[key];
        }
        return null;
    };

    Record.prototype.isNew = function isNew() {
        return this.id == null;
    };

    Record.prototype.has = function has(key) {
        return this[key] != void 0;
    };

    Record.prototype.unset = function unset(key, options) {
        this.set(key, void 0, options);
        return this;
    };

    Record.prototype.clear = function clear(options) {
        var _this2 = this;

        var nullify = options && options.nullify;
        this.transaction(function () {
            _this2.forEachAttr(_this2.attributes, function (value, key) {
                return _this2[key] = nullify ? null : void 0;
            });
        }, options);
        return this;
    };
    // Returns Record owner skipping collections. TODO: Move out


    Record.prototype.getOwner = function getOwner() {
        var owner = this._owner;
        // If there are no key, owner must be transactional object, and it's the collection.
        // We don't expect that collection can be the member of collection, so we're skipping just one level up. An optimization.
        return this._ownerKey ? owner : owner && owner._owner;
    };
    // Fixed 'id' property pointing to id attribute


    // Attributes object copy constructor
    // Attributes : CloneAttributesCtor
    Record.prototype.Attributes = function Attributes(x) {
        this.id = x.id;
    };
    // forEach function for traversing through attributes, with protective default implementation
    // Overriden by dynamically compiled loop unrolled function in define.ts


    Record.prototype.forEachAttr = function forEachAttr(attrs, iteratee) {
        var _attributes = this._attributes;

        var unknown = void 0;
        for (var name in attrs) {
            var spec = _attributes[name];
            if (spec) {
                iteratee(attrs[name], name, spec);
            } else {
                unknown || (unknown = []);
                unknown.push("'" + name + "'");
            }
        }
        if (unknown) {
            this._log('warn', "attributes " + unknown.join(', ') + " are not defined", attrs);
        }
        // TODO: try this versus object traversal.
        /*
        const { _attributes, _keys } = this;
         for( let name of _keys ){
            const spec = _attributes[ name ],
                  value = attrs[ name ];
             value && iteratee( value, name, spec );
        }
         // TODO: Try using list of specs instead of _keys.
        // Try to inline this code to the hot spots.
        for( let spec = this._head; spec; spec = spec.next ){
            const value = attrs[ name ];
            value && iteratee( value, name, spec );
        }
         */
    };

    Record.prototype.each = function each(iteratee, context) {
        var fun = context !== void 0 ? function (v, k) {
            return iteratee.call(context, v, k);
        } : iteratee;var attributes = this.attributes;
        var _keys = this._keys;

        for (var _iterator = _keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var key = _ref;

            var value = attributes[key];
            if (value !== void 0) fun(value, key);
        }
    };
    // Get array of attribute keys (Record) or record ids (Collection)


    Record.prototype.keys = function keys() {
        return this.map(function (value, key) {
            if (value !== void 0) return key;
        });
    };
    // Get array of attribute values (Record) or records (Collection)


    Record.prototype.values = function values() {
        return this.map(function (value) {
            return value;
        });
    };
    // Attributes-level serialization


    Record.prototype._toJSON = function _toJSON() {
        return {};
    };
    // Attributes-level parse


    Record.prototype._parse = function _parse(data) {
        return data;
    };
    // Create record default values, optionally augmenting given values.


    Record.prototype.defaults = function defaults$$1(values) {
        return {};
    };
    // Initialization callback, to be overriden by the subclasses


    Record.prototype.initialize = function initialize(values, options) {};
    // Deeply clone record, optionally setting new owner.


    Record.prototype.clone = function clone() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var copy = new this.constructor(this.attributes, { clone: true });
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };
    // Deprecated, every clone is the deep one now.


    Record.prototype.deepClone = function deepClone() {
        return this.clone();
    };

    // Validate attributes.
    Record.prototype._validateNested = function _validateNested(errors) {
        var _this3 = this;

        var length = 0;
        this.forEachAttr(this.attributes, function (value, name, attribute) {
            var error = attribute.validate(_this3, value, name);
            if (error) {
                errors[name] = error;
                length++;
            }
        });
        return length;
    };
    // Get attribute by key


    Record.prototype.get = function get$$1(key) {
        return this[key];
    };
    /**
     * Serialization control
     */
    // Default record-level serializer, to be overriden by subclasses


    Record.prototype.toJSON = function toJSON() {
        var _this4 = this;

        var json = {};
        this.forEachAttr(this.attributes, function (value, key, _ref2) {
            var toJSON = _ref2.toJSON;

            // If attribute serialization is not disabled, and its value is not undefined...
            if (value !== void 0) {
                // ...serialize it according to its spec.
                var asJson = toJSON.call(_this4, value, key);
                // ...skipping undefined values. Such an attributes are excluded.
                if (asJson !== void 0) json[key] = asJson;
            }
        });
        return json;
    };
    // Default record-level parser, to be overriden by the subclasses.


    Record.prototype.parse = function parse(data, options) {
        // Call dynamically compiled loop-unrolled attribute-level parse function.
        return this._parse(data);
    };

    Record.prototype.set = function set$$1(a, b, c) {
        if (typeof a === 'string') {
            if (c) {
                var _Transactional$protot;

                return _Transactional.prototype.set.call(this, (_Transactional$protot = {}, _Transactional$protot[a] = b, _Transactional$protot), c);
            } else {
                setAttribute(this, a, b);
                return this;
            }
        } else {
            return _Transactional.prototype.set.call(this, a, b);
        }
    };

    Record.prototype.deepSet = function deepSet(name, value, options) {
        var _this5 = this;

        // Operation might involve series of nested object updates, thus it's wrapped in transaction.
        this.transaction(function () {
            var path = name.split('.'),
                l = path.length - 1,
                attr = path[l];
            var model = _this5;
            // Locate the model, traversing the path.
            for (var i = 0; i < l; i++) {
                var key = path[i];
                // There might be collections in path, so use `get`.
                var next = model.get ? model.get(key) : model[key];
                // Create models, if they are not exist.
                if (!next) {
                    var attrSpecs = model._attributes;
                    if (attrSpecs) {
                        // If current object is model, create default attribute
                        var newModel = attrSpecs[key].create();
                        // If created object is model, nullify attributes when requested
                        if (options && options.nullify && newModel._attributes) {
                            newModel.clear(options);
                        }
                        model[key] = next = newModel;
                    } else return;
                }
                model = next;
            }
            // Set model attribute.
            if (model.set) {
                model.set(attr, value, options);
            } else {
                model[attr] = value;
            }
        });
        return this;
    };
    // Need to override it here, since begin/end transaction brackets are overriden.


    Record.prototype.transaction = function transaction(fun) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = begin$1(this);
        fun.call(this, this);
        isRoot && _commit(this);
    };
    // Create transaction. TODO: Move to transaction constructor


    Record.prototype._createTransaction = function _createTransaction(a_values) {
        var _this6 = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var isRoot = begin$1(this);var changes = [];var nested = [];var attributes = this.attributes;var values = options.parse ? this.parse(a_values, options) : a_values;
        if (values && values.constructor === Object) {
            this.forEachAttr(values, function (value, key, attr) {
                var prev = attributes[key];
                var update = void 0;
                // handle deep update...
                if (update = attr.canBeUpdated(prev, value, options)) {
                    var nestedTransaction = prev._createTransaction(update, options);
                    if (nestedTransaction) {
                        nested.push(nestedTransaction);
                        if (attr.propagateChanges) changes.push(key);
                    }
                    return;
                }
                // cast and hook...
                var next = attr.transform(value, options, prev, _this6);
                attributes[key] = next;
                if (attr.isChanged(next, prev)) {
                    changes.push(key);
                    // Do the rest of the job after assignment
                    attr.handleChange(next, prev, _this6);
                }
            });
        } else {
            this._log('error', 'incompatible argument type', values);
        }
        if (changes.length && markAsDirty$1(this, options)) {
            return new RecordTransaction(this, isRoot, nested, changes);
        }
        // No changes, but there might be silent attributes with open transactions.
        for (var _iterator2 = nested, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref3 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref3 = _i2.value;
            }

            var pendingTransaction = _ref3;

            pendingTransaction.commit(this);
        }
        isRoot && _commit(this);
    };
    // Handle nested changes. TODO: propagateChanges == false, same in transaction.


    Record.prototype._onChildrenChange = function _onChildrenChange(child, options) {
        var _ownerKey = child._ownerKey;var attribute = this._attributes[_ownerKey];
        if (!attribute /* TODO: Must be an opposite, likely the bug */ || attribute.propagateChanges) this.forceAttributeChange(_ownerKey, options);
    };
    // Simulate attribute change


    Record.prototype.forceAttributeChange = function forceAttributeChange(key) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Touch an attribute in bounds of transaction
        var isRoot = begin$1(this);
        if (markAsDirty$1(this, options)) {
            trigger3$3(this, 'change:' + key, this, this.attributes[key], options);
        }
        isRoot && _commit(this);
    };
    // Returns owner without the key (usually it's collection)


    // Dispose object and all childrens
    Record.prototype.dispose = function dispose() {
        var _this7 = this;

        if (this._disposed) return;
        this.forEachAttr(this.attributes, function (value, key, attribute) {
            attribute.dispose(_this7, value);
        });
        _Transactional.prototype.dispose.call(this);
    };

    Record.prototype._log = function _log(level, text, value) {
        log[level]("[Model Update] " + this.getClassName() + ": " + text, value, 'Attributes spec:', this._attributes);
    };

    Record.prototype.getClassName = function getClassName() {
        return _Transactional.prototype.getClassName.call(this) || 'Model';
    };

    createClass(Record, [{
        key: "__inner_state__",
        get: function get$$1() {
            return this.attributes;
        }
    }, {
        key: "changed",
        get: function get$$1() {
            var changed = this._changedAttributes;
            if (!changed) {
                var prev = this._previousAttributes;
                changed = {};
                var _attributes = this._attributes;
                var attributes = this.attributes;

                for (var _iterator3 = this._keys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref4;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref4 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref4 = _i3.value;
                    }

                    var key = _ref4;

                    var value = attributes[key];
                    if (_attributes[key].isChanged(value, prev[key])) {
                        changed[key] = value;
                    }
                }
                this._changedAttributes = changed;
            }
            return changed;
        }
    }, {
        key: "id",
        get: function get$$1() {
            return this.attributes[this.idAttribute];
        },
        set: function set$$1(x) {
            setAttribute(this, this.idAttribute, x);
        }
    }, {
        key: "collection",
        get: function get$$1() {
            return this._ownerKey ? null : this._owner;
        }
    }]);
    return Record;
}(Transactional);
Record = Record_1 = __decorate$3([define({
    // Default client id prefix
    cidPrefix: 'm',
    // Name of the change event
    _changeEventName: 'change',
    // Default id attribute name
    idAttribute: 'id',
    _keys: ['id']
})], Record);

/***********************************************
 * Helper functions
 */
function begin$1(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.Attributes(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
function markAsDirty$1(record, options) {
    // Need to recalculate changed attributes, when we have nested set in change:attr handler
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
// Deeply clone record attributes
function cloneAttributes(record, a_attributes) {
    var attributes = new record.Attributes(a_attributes);
    record.forEachAttr(attributes, function (value, name, attr) {
        attributes[name] = attr.clone(value, record);
    });
    return attributes;
}
// Optimized single attribute transactional update. To be called from attributes setters
// options.silent === false, parse === false.
function setAttribute(record, name, value) {
    var isRoot = begin$1(record);var options = {};var attributes = record.attributes;var spec = record._attributes[name];var prev = attributes[name];
    var update = void 0;
    // handle deep update...
    if (update = spec.canBeUpdated(prev, value, options)) {
        //TODO: Why not just forward the transaction, without telling that it's nested?
        var nestedTransaction = prev._createTransaction(update, options);
        if (nestedTransaction) {
            nestedTransaction.commit(record); // <- null here, and no need to handle changes. Work with shared and aggregated.
            if (spec.propagateChanges) {
                markAsDirty$1(record, options);
                trigger3$3(record, 'change:' + name, record, prev, options);
            }
        }
    } else {
        // cast and hook...
        var next = spec.transform(value, options, prev, record);
        attributes[name] = next;
        if (spec.isChanged(next, prev)) {
            // Do the rest of the job after assignment
            spec.handleChange(next, prev, record);
            markAsDirty$1(record, options);
            trigger3$3(record, 'change:' + name, record, next, options);
        }
    }
    isRoot && _commit(record);
}
// Transaction class. Implements two-phase transactions on object's tree.
// Transaction must be created if there are actual changes and when markIsDirty returns true.

var RecordTransaction = function () {
    // open transaction
    function RecordTransaction(object, isRoot, nested, changes) {
        classCallCheck(this, RecordTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.nested = nested;
        this.changes = changes;
    }
    // commit transaction


    RecordTransaction.prototype.commit = function commit(initiator) {
        var nested = this.nested;
        var object = this.object;
        var changes = this.changes;
        // Commit all pending nested transactions...

        for (var _iterator4 = nested, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
            }

            var transaction = _ref5;

            transaction.commit(object);
        }
        // Notify listeners on attribute changes...
        // Transaction is never created when silent option is set, so just send events out.
        var attributes = object.attributes;
        var _isDirty = object._isDirty;

        for (var _iterator5 = changes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref6 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref6 = _i5.value;
            }

            var key = _ref6;

            trigger3$3(object, 'change:' + key, object, attributes[key], _isDirty);
        }
        this.isRoot && _commit(object, initiator);
    };

    return RecordTransaction;
}();

var Record_1;

var notEqual$1 = notEqual;
var assign$5 = assign;
// TODO: interface differs from options, do something obout it
/** @private */

var AnyType = function () {
    function AnyType(name, a_options) {
        var _this = this;

        classCallCheck(this, AnyType);

        this.name = name;
        this.getHook = null;
        // Clone options.
        var options = this.options = assign$5({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
        options.getHooks = options.getHooks.slice();
        options.transforms = options.transforms.slice();
        options.changeHandlers = options.changeHandlers.slice();
        var value = options.value;
        var type = options.type;
        var parse = options.parse;
        var toJSON = options.toJSON;
        var changeEvents = options.changeEvents;
        var validate = options.validate;
        var getHooks = options.getHooks;
        var transforms = options.transforms;
        var changeHandlers = options.changeHandlers;

        this.value = value;
        this.type = type;
        // Changes must be bubbled when they are not disabled for an attribute and transactional object.
        this.propagateChanges = changeEvents !== false;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        if (options.isRequired) {
            this.validate = wrapIsRequired(this.validate);
        }
        /**
         * Assemble pipelines...
         */
        // `convert` is default transform, which is always present...
        transforms.unshift(this.convert);
        // Get hook from the attribute will be used first...
        if (this.get) getHooks.unshift(this.get);
        // let subclasses configure the pipeline...
        this.initialize.call(this, options);
        // let attribute spec configure the pipeline...
        if (getHooks.length) {
            (function () {
                var getHook = _this.getHook = getHooks.reduce(chainGetHooks);
                var validate = _this.validate;

                _this.validate = function (record, value, key) {
                    return validate.call(this, record, getHook.call(record, value, key), key);
                };
            })();
        }
        if (transforms.length) {
            this.transform = transforms.reduce(chainTransforms);
        }
        if (changeHandlers.length) {
            this.handleChange = changeHandlers.reduce(chainChangeHandlers);
        }
    }
    // Factory method to create attribute from options


    AnyType.create = function create(options, name) {
        var type = options.type,
            AttributeCtor = options._attribute || (type ? type._attribute : AnyType);
        return new AttributeCtor(name, options);
    };
    /**
     * Update pipeline functions
     * =========================
     *
     * Stage 0. canBeUpdated( value )
     * - presence of this function implies attribute's ability to update in place.
     */


    AnyType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {};
    /**
     * Stage 1. Transform stage
     */


    AnyType.prototype.transform = function transform(value, options, prev, model) {
        return value;
    };
    // convert attribute type to `this.type`.


    AnyType.prototype.convert = function convert(value, options, prev, model) {
        return value;
    };
    /**
     * Stage 2. Check if attr value is changed
     */


    AnyType.prototype.isChanged = function isChanged(a, b) {
        return notEqual$1(a, b);
    };
    /**
     * Stage 3. Handle attribute change
     */


    AnyType.prototype.handleChange = function handleChange(next, prev, model) {};
    /**
     * End update pipeline definitions.
     */
    // create empty object passing backbone options to constructor...


    AnyType.prototype.create = function create() {
        return new this.type();
    };
    // generic clone function for typeless attributes
    // Must be overriden in sublass


    AnyType.prototype.clone = function clone(value, record) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            // delegate to object's clone(), if it exist...
            if (value.clone) return value.clone();
            var proto = Object.getPrototypeOf(value);
            // attempt to deep copy raw objects, assuming they are JSON
            if (proto === Object.prototype || proto === Array.prototype) {
                return JSON.parse(JSON.stringify(value)); // FIXME! This cloning will not work for Dates.
            }
        }
        return value;
    };

    AnyType.prototype.dispose = function dispose(record, value) {};

    AnyType.prototype.validate = function validate(record, value, key) {};

    AnyType.prototype.toJSON = function toJSON(value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };

    AnyType.prototype.createPropertyDescriptor = function createPropertyDescriptor() {
        var name = this.name;
        var getHook = this.getHook;

        if (name !== 'id') {
            return {
                // call to optimized set function for single argument.
                set: function set$$1(value) {
                    setAttribute(this, name, value);
                },

                // attach get hook to the getter function, if present
                get: getHook ? function () {
                    return getHook.call(this, this.attributes[name], name);
                } : function () {
                    return this.attributes[name];
                }
            };
        }
    };

    AnyType.prototype.initialize = function initialize(name, options) {};

    AnyType.prototype._log = function _log(level, text, value, record) {
        log[level]('[Attribute Update] ' + record.getClassName() + '.' + this.name + ': ' + text, value, 'Attributes spec:', record._attributes);
    };

    return AnyType;
}();
Record.prototype._attributes = { id: AnyType.create({ value: void 0 }, 'id') };
Record.prototype.defaults = function () {
    var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return { id: attrs.id };
};
/** @private */
function chainChangeHandlers(prevHandler, nextHandler) {
    return function (next, prev, model) {
        prevHandler.call(this, next, prev, model);
        nextHandler.call(this, next, prev, model);
    };
}
/** @private */
function chainGetHooks(prevHook, nextHook) {
    return function (value, name) {
        return nextHook.call(this, prevHook.call(this, value, name), name);
    };
}
/** @private */
function chainTransforms(prevTransform, nextTransform) {
    return function (value, options, prev, model) {
        return nextTransform.call(this, prevTransform.call(this, value, options, prev, model), options, prev, model);
    };
}
function wrapIsRequired(validate) {
    return function (record, value, key) {
        return value ? validate.call(this, record, value, key) : 'Required';
    };
}

var free$1 = transactionApi.free;
var aquire$1 = transactionApi.aquire;

var AggregatedType = function (_AnyType) {
    inherits(AggregatedType, _AnyType);

    function AggregatedType() {
        classCallCheck(this, AggregatedType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    AggregatedType.prototype.clone = function clone(value) {
        return value ? value.clone() : value;
    };

    AggregatedType.prototype.toJSON = function toJSON(x) {
        return x && x.toJSON();
    };

    AggregatedType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        if (prev && next != null) {
            if (next instanceof this.type) {
                // In case if merge option explicitly specified, force merge.
                if (options.merge) return next.__inner_state__;
            } else {
                return next;
            }
        }
    };

    AggregatedType.prototype.convert = function convert(value, options, prev, record) {
        // Invoke class factory to handle abstract classes
        if (value == null) return value;
        if (value instanceof this.type) {
            if (value._shared && !(value._shared & ItemsBehavior.persistent)) {
                this._log('error', 'aggregated attribute is assigned with shared collection type', value, record);
            }
            return options.merge ? value.clone() : value; // TODO: looks like clone is never called. Remove.
        }
        return this.type.create(value, options);
    };

    AggregatedType.prototype.dispose = function dispose(record, value) {
        if (value) {
            free$1(record, value);
            value.dispose();
        }
    };

    AggregatedType.prototype.validate = function validate(record, value) {
        var error = value && value.validationError;
        if (error) return error;
    };

    AggregatedType.prototype.create = function create() {
        return this.type.create(); // this the subclass of Transactional here.
    };

    AggregatedType.prototype.initialize = function initialize(options) {
        options.changeHandlers.unshift(this._handleChange);
    };

    AggregatedType.prototype._handleChange = function _handleChange(next, prev, record) {
        prev && free$1(record, prev);
        if (next && !aquire$1(record, next, this.name)) {
            this._log('error', 'aggregated attribute assigned with object which is aggregated somewhere else', next, record);
        }
    };

    return AggregatedType;
}(AnyType);
Record._attribute = AggregatedType;

// Date Attribute
/** @private */
var DateType = function (_AnyType) {
    inherits(DateType, _AnyType);

    function DateType() {
        classCallCheck(this, DateType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    DateType.prototype.convert = function convert(value, a, b, record) {
        if (value == null || value instanceof Date) return value;
        var date = new Date(value),
            timestamp = date.getTime();
        if (timestamp !== timestamp) {
            this._log('warn', 'assigned with Invalid Date', value, record);
        }
        return date;
    };

    DateType.prototype.validate = function validate(model, value, name) {
        if (value != null) {
            var timestamp = value.getTime();
            if (timestamp !== timestamp) return name + ' is Invalid Date';
        }
    };

    DateType.prototype.toJSON = function toJSON(value) {
        return value && value.toISOString();
    };

    DateType.prototype.isChanged = function isChanged(a, b) {
        return (a && a.getTime()) !== (b && b.getTime());
    };

    DateType.prototype.clone = function clone(value) {
        return value && new Date(value.getTime());
    };

    return DateType;
}(AnyType);
Date._attribute = DateType;
var msDatePattern = /\/Date\(([0-9]+)\)\//;
var MSDateType = function (_DateType) {
    inherits(MSDateType, _DateType);

    function MSDateType() {
        classCallCheck(this, MSDateType);
        return possibleConstructorReturn(this, _DateType.apply(this, arguments));
    }

    MSDateType.prototype.convert = function convert(value) {
        if (typeof value === 'string') {
            var msDate = msDatePattern.exec(value);
            if (msDate) {
                return new Date(Number(msDate[1]));
            }
        }
        return DateType.prototype.convert.apply(this, arguments);
    };

    MSDateType.prototype.toJSON = function toJSON(value) {
        return value && '/Date(' + value.getTime() + ')/';
    };

    return MSDateType;
}(DateType);
var TimestampType = function (_DateType2) {
    inherits(TimestampType, _DateType2);

    function TimestampType() {
        classCallCheck(this, TimestampType);
        return possibleConstructorReturn(this, _DateType2.apply(this, arguments));
    }

    TimestampType.prototype.toJSON = function toJSON(value) {
        return value.getTime();
    };

    return TimestampType;
}(DateType);
// If ISO date is not supported by date constructor (such as in Safari), polyfill it.
function supportsDate(date) {
    return !isNaN(new Date(date).getTime());
}
if (!supportsDate('2011-11-29T15:52:30.5') || !supportsDate('2011-11-29T15:52:30.52') || !supportsDate('2011-11-29T15:52:18.867') || !supportsDate('2011-11-29T15:52:18.867Z') || !supportsDate('2011-11-29T15:52:18.867-03:30')) {
    DateType.prototype.convert = function (value) {
        return value == null || value instanceof Date ? value : new Date(safeParseDate(value));
    };
}
var numericKeys = [1, 4, 5, 6, 7, 10, 11];
var isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
function safeParseDate(date) {
    var timestamp,
        struct,
        minutesOffset = 0;
    if (struct = isoDatePattern.exec(date)) {
        // avoid NaN timestamps caused by undefined values being passed to Date.UTC
        for (var i = 0, k; k = numericKeys[i]; ++i) {
            struct[k] = +struct[k] || 0;
        }
        // allow undefined days and months
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;
        if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];
            if (struct[9] === '+') {
                minutesOffset = 0 - minutesOffset;
            }
        }
        timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    } else {
        timestamp = Date.parse(date);
    }
    return timestamp;
}

// Default attribute type for all constructor functions...
/** @private */

var ConstructorType = function (_AnyType) {
    inherits(ConstructorType, _AnyType);

    function ConstructorType() {
        classCallCheck(this, ConstructorType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    ConstructorType.prototype.convert = function convert(value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };

    ConstructorType.prototype.clone = function clone(value) {
        // delegate to clone function or deep clone through serialization
        return value && value.clone ? value.clone() : this.convert(JSON.parse(JSON.stringify(value)));
    };

    return ConstructorType;
}(AnyType);

Function.prototype._attribute = ConstructorType;
// Primitive Types.
/** @private */
var PrimitiveType = function (_AnyType2) {
    inherits(PrimitiveType, _AnyType2);

    function PrimitiveType() {
        classCallCheck(this, PrimitiveType);
        return possibleConstructorReturn(this, _AnyType2.apply(this, arguments));
    }

    PrimitiveType.prototype.create = function create() {
        return this.type();
    };

    PrimitiveType.prototype.toJSON = function toJSON(value) {
        return value;
    };

    PrimitiveType.prototype.convert = function convert(value) {
        return value == null ? value : this.type(value);
    };

    PrimitiveType.prototype.isChanged = function isChanged(a, b) {
        return a !== b;
    };

    PrimitiveType.prototype.clone = function clone(value) {
        return value;
    };

    return PrimitiveType;
}(AnyType);
Boolean._attribute = String._attribute = PrimitiveType;
// Number type with special validation algothim.
/** @private */
var NumericType = function (_PrimitiveType) {
    inherits(NumericType, _PrimitiveType);

    function NumericType() {
        classCallCheck(this, NumericType);
        return possibleConstructorReturn(this, _PrimitiveType.apply(this, arguments));
    }

    NumericType.prototype.convert = function convert(value, a, b, record) {
        var num = value == null ? value : this.type(value);
        if (num !== num) {
            this._log('warn', 'assigned with Invalid Number', value, record);
        }
        return num;
    };

    NumericType.prototype.validate = function validate(model, value, name) {
        // Whatever is not symmetrically serializable to JSON, is not valid by default.
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };

    return NumericType;
}(PrimitiveType);
Number._attribute = NumericType;
/**
 * Compatibility wrapper for Array type.
 * @private
 */
var ArrayType = function (_AnyType3) {
    inherits(ArrayType, _AnyType3);

    function ArrayType() {
        classCallCheck(this, ArrayType);
        return possibleConstructorReturn(this, _AnyType3.apply(this, arguments));
    }

    ArrayType.prototype.toJSON = function toJSON(value) {
        return value;
    };

    ArrayType.prototype.convert = function convert(value, a, b, record) {
        // Fix incompatible constructor behaviour of Array...
        if (value == null || Array.isArray(value)) return value;
        this._log('warn', 'assigned with non-array', value, record);
        return [];
    };

    ArrayType.prototype.clone = function clone(value) {
        return value && value.slice();
    };

    return ArrayType;
}(AnyType);
Array._attribute = ArrayType;

var on$4 = on$1;
var off$4 = off$1;var free$2 = transactionApi.free;
var aquire$2 = transactionApi.aquire;
/************************
 * Shared attribute definition.
 * - Not serialized.
 * - Listening to the changes.
 * - Doesn't take ownership when assigned with object of proper type.
 * - Takes ownership on objects which are converted.
 */

var shareAndListen = ItemsBehavior.listen | ItemsBehavior.share;
/** @private */
var SharedType = function (_AnyType) {
    inherits(SharedType, _AnyType);

    function SharedType() {
        classCallCheck(this, SharedType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    SharedType.prototype.clone = function clone(value, record) {
        // References are not cloned.
        if (!value || value._owner !== record) return value;
        // Implicitly created objects are cloned.
        var clone = value.clone();
        aquire$2(record, clone, this.name);
        return clone;
    };
    // Do not serialize by default.


    SharedType.prototype.toJSON = function toJSON() {};

    SharedType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {
        // If an object already exists, and new value is of incompatible type, let object handle the update.
        if (prev && next != null) {
            if (next instanceof this.type) {
                // In case if merge option explicitly specified, force merge.
                if (options.merge) return next.__inner_state__;
            } else {
                return next;
            }
        }
    };

    SharedType.prototype.convert = function convert(value, options, prev, record) {
        if (value == null || value instanceof this.type) return value;
        // Convert type using implicitly created rtransactional object.
        var implicitObject = new this.type(value, options, shareAndListen);
        // To prevent a leak, we need to take an ownership on it.
        aquire$2(record, implicitObject, this.name);
        return implicitObject;
    };
    // Refs are always valid.


    SharedType.prototype.validate = function validate(model, value, name) {};
    // They are always created as null.


    SharedType.prototype.create = function create() {
        return null;
    };
    // Listening to the change events


    SharedType.prototype._handleChange = function _handleChange(next, prev, record) {
        if (prev) {
            // If there was an implicitly created object, remove an ownership.
            if (prev._owner === record) {
                free$2(record, prev);
            } else {
                off$4(prev, prev._changeEventName, this._onChange, record);
            }
        }
        if (next) {
            // No need to take an ownership for an implicit object - already done in convert or clone.
            if (next._owner !== record) {
                on$4(next, next._changeEventName, this._onChange, record);
            }
        }
    };

    SharedType.prototype.dispose = function dispose(record, value) {
        if (value) {
            // If the object was implicitly created, dispose it.
            if (value._owner === record) {
                free$2(record, value);
                value.dispose();
            } else {
                off$4(value, value._changeEventName, this._onChange, record);
            }
        }
    };

    SharedType.prototype.initialize = function initialize(options) {
        // Create change event handler which knows current attribute name.
        var attribute = this;
        this._onChange = this.propagateChanges ? function (child, options, initiator) {
            this === initiator || this.forceAttributeChange(attribute.name, options);
        } : ignore;
        options.changeHandlers.unshift(this._handleChange);
    };

    return SharedType;
}(AnyType);
function ignore() {}

/**
 * Type spec engine. Declare attributes using chainable syntax,
 * and returns object with spec.
 */
var assign$6 = assign;

var ChainableAttributeSpec = function () {
    function ChainableAttributeSpec(options) {
        classCallCheck(this, ChainableAttributeSpec);

        // Shallow copy options, fill it with defaults.
        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        if (options) assign$6(this.options, options);
    }

    ChainableAttributeSpec.prototype.check = function check(_check, error) {
        function validate(model, value, name) {
            if (!_check.call(model, value, name)) {
                var msg = error || _check.error || name + ' is not valid';
                return typeof msg === 'function' ? msg.call(model, name) : msg;
            }
        }
        var prev = this.options.validate;
        return this.metadata({
            validate: prev ? function (model, value, name) {
                return prev(model, value, name) || validate(model, value, name);
            } : validate
        });
    };

    ChainableAttributeSpec.prototype.watcher = function watcher(ref) {
        return this.metadata({ _onChange: ref });
    };

    ChainableAttributeSpec.prototype.parse = function parse(fun) {
        return this.metadata({ parse: fun });
    };

    ChainableAttributeSpec.prototype.toJSON = function toJSON(fun) {
        return this.metadata({
            toJSON: typeof fun === 'function' ? fun : fun ? function (x) {
                return x && x.toJSON();
            } : emptyFunction
        });
    };
    // Attribute get hook.


    ChainableAttributeSpec.prototype.get = function get$$1(fun) {
        return this.metadata({
            getHooks: this.options.getHooks.concat(fun)
        });
    };
    // Attribute set hook.


    ChainableAttributeSpec.prototype.set = function set$$1(fun) {
        function handleSetHook(next, options, prev, model) {
            if (this.isChanged(next, prev)) {
                var changed = fun.call(model, next, this.name);
                return changed === void 0 ? prev : this.convert(changed, options, prev, model);
            }
            return prev;
        }
        return this.metadata({
            transforms: this.options.transforms.concat(handleSetHook)
        });
    };

    ChainableAttributeSpec.prototype.changeEvents = function changeEvents(events) {
        return this.metadata({ changeEvents: events });
    };
    // Subsribe to events from an attribute.


    ChainableAttributeSpec.prototype.events = function events(map) {
        var eventMap = new EventMap(map);
        function handleEventsSubscribtion(next, prev, record) {
            prev && prev.trigger && eventMap.unsubscribe(record, prev);
            next && next.trigger && eventMap.subscribe(record, next);
        }
        return this.metadata({
            changeHandlers: this.options.changeHandlers.concat(handleEventsSubscribtion)
        });
    };
    // Creates a copy of the spec.


    ChainableAttributeSpec.prototype.metadata = function metadata(options) {
        var cloned = new ChainableAttributeSpec(this.options);
        assign$6(cloned.options, options);
        return cloned;
    };

    ChainableAttributeSpec.prototype.value = function value(x) {
        return this.metadata({ value: x });
    };

    createClass(ChainableAttributeSpec, [{
        key: 'isRequired',
        get: function get$$1() {
            return this.metadata({ isRequired: true });
        }
    }, {
        key: 'has',
        get: function get$$1() {
            return this;
        }
    }]);
    return ChainableAttributeSpec;
}();

function emptyFunction() {}
Function.prototype.value = function (x) {
    return new ChainableAttributeSpec({ type: this, value: x });
};
Object.defineProperty(Function.prototype, 'isRequired', {
    get: function get$$1() {
        return this._isRequired || this.has.isRequired;
    },
    set: function set$$1(x) {
        this._isRequired = x;
    }
});
Object.defineProperty(Function.prototype, 'has', {
    get: function get$$1() {
        // workaround for sinon.js and other libraries overriding 'has'
        return this._has || new ChainableAttributeSpec({ type: this, value: this._attribute.defaultValue });
    },
    set: function set$$1(value) {
        this._has = value;
    }
});
function toAttributeDescriptor(spec) {
    var attrSpec = void 0;
    if (typeof spec === 'function') {
        attrSpec = spec.has;
    } else if (spec && spec instanceof ChainableAttributeSpec) {
        attrSpec = spec;
    } else {
        // Infer type from value.
        var type = inferType(spec);
        // Transactional types inferred from values must have shared type.
        if (type && type.prototype instanceof Transactional) {
            attrSpec = type.shared.value(spec);
        } else {
            attrSpec = new ChainableAttributeSpec({ type: type, value: spec });
        }
    }
    return attrSpec.options;
}
function inferType(value) {
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'number':
            return Number;
        case 'string':
            return String;
        case 'boolean':
            return Boolean;
        case 'undefined':
            return void 0;
        case 'object':
            return value ? value.constructor : void 0;
    }
}

var defaults$4 = defaults$$1;
var isValidJSON$1 = isValidJSON;
var transform$1 = transform;
var log$3 = log;var EventMap$1 = EventMap;
// Compile attributes spec
/** @private */

function compile(rawSpecs, baseAttributes) {
    var myAttributes = transform$1({}, rawSpecs, createAttribute),
        allAttributes = defaults$4({}, myAttributes, baseAttributes),
        Attributes = createCloneCtor(allAttributes),
        mixin = {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: transform$1({}, myAttributes, function (x) {
            return x.createPropertyDescriptor();
        }),
        defaults: createDefaults(allAttributes),
        _toJSON: createToJSON(allAttributes),
        _localEvents: createEventMap(myAttributes),
        _keys: Object.keys(allAttributes)
    };
    var _parse = createParse(myAttributes, allAttributes);
    if (_parse) {
        mixin._parse = _parse;
    }
    // Enable optimized forEach if warnings are disabled.
    if (!log$3.level) {
        mixin.forEachAttr = createForEach(allAttributes);
    }
    return mixin;
}
// Create attribute from the type spec.
/** @private */
function createAttribute(spec, name) {
    return AnyType.create(toAttributeDescriptor(spec), name);
}
// Build events map for attribute change events.
/** @private */
function createEventMap(attrSpecs) {
    var events = void 0;
    for (var key in attrSpecs) {
        var attribute = attrSpecs[key];var _onChange = attribute.options._onChange;

        if (_onChange) {
            events || (events = new EventMap$1());
            events.addEvent('change:' + key, typeof _onChange === 'string' ? createWatcherFromRef(_onChange, key) : wrapWatcher(_onChange, key));
        }
    }
    return events;
}
/** @private */
function wrapWatcher(watcher, key) {
    return function (record, value) {
        watcher.call(record, value, key);
    };
}
/** @private */
function createWatcherFromRef(ref, key) {
    var _ref = new CompiledReference(ref, true);

    var local = _ref.local;
    var resolve = _ref.resolve;
    var tail = _ref.tail;

    return local ? function (record, value) {
        record[tail](value, key);
    } : function (record, value) {
        resolve(record)[tail](value, key);
    };
}
/** @private */
function createForEach(attrSpecs) {
    var statements = ['var v, _a=this._attributes;'];
    for (var name in attrSpecs) {
        statements.push('( v = a.' + name + ' ) === void 0 || f( v, "' + name + '", _a.' + name + ' );');
    }
    return new Function('a', 'f', statements.join(''));
}
/** @private */
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name in attrSpecs) {
        statements.push('this.' + name + ' = x.' + name + ';');
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
// Create optimized model.defaults( attrs, options ) function
/** @private */
function createDefaults(attrSpecs) {
    var assign_f = ['var v;'],
        create_f = [];
    function appendExpr(name, expr) {
        assign_f.push('this.' + name + ' = ( v = a.' + name + ' ) === void 0 ? ' + expr + ' : v;');
        create_f.push('this.' + name + ' = ' + expr + ';');
    }
    // Compile optimized constructor function for efficient deep copy of JSON literals in defaults.
    for (var name in attrSpecs) {
        var attrSpec = attrSpecs[name];var value = attrSpec.value;
        var type = attrSpec.type;

        if (value === void 0 && type) {
            // if type with no value is given, create an empty object
            appendExpr(name, 'i.' + name + '.create()'); //TODO: consider adding owner reference
        } else {
            // If value is given, type casting logic will do the job later, converting value to the proper type.
            if (isValidJSON$1(value)) {
                // JSON literals must be deep copied.
                appendExpr(name, JSON.stringify(value));
            } else if (value === void 0) {
                // handle undefined value separately. Usual case for model ids.
                appendExpr(name, 'void 0');
            } else {
                // otherwise, copy value by reference.
                appendExpr(name, 'i.' + name + '.value');
            }
        }
    }
    var CreateDefaults = new Function('i', create_f.join('')),
        AssignDefaults = new Function('a', 'i', assign_f.join(''));
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    // Create model.defaults( attrs, options ) function
    // 'attrs' will override default values, options will be passed to nested backbone types
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
/** @private */
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'],
        create = false;
    for (var name in allAttrSpecs) {
        var local = attrSpecs[name];
        // Is there any 'parse' option in local model definition?
        if (local && local.parse) create = true;
        // Add statement for each attribute with 'parse' option.
        if (allAttrSpecs[name].parse) {
            var s = 'r.' + name + ' === void 0 ||( r.' + name + ' = a.' + name + '.parse.call( this, r.' + name + ', "' + name + '") );';
            statements.push(s);
        }
    }
    if (create) {
        statements.push('return r;');
        return new Function('r', statements.join(''));
    }
}
/** @private */
function createToJSON(attrSpecs) {
    var statements = ['var json = {},v=this.attributes,a=this._attributes;'];
    for (var key in attrSpecs) {
        var toJSON = attrSpecs[key].toJSON;
        if (toJSON) {
            statements.push('json.' + key + ' = a.' + key + '.toJSON.call( this, v.' + key + ', \'' + key + '\' );');
        }
    }
    statements.push('return json;');
    return new Function(statements.join(''));
}

var assign$3 = assign;
var omit$2 = omit;
var getBaseClass$1 = getBaseClass;

Record.define = function () {
    var protoProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var staticProps = arguments[1];

    var BaseConstructor = getBaseClass$1(this),
        baseProto = BaseConstructor.prototype,

    // Extract record definition from static members, if any.
    staticsDefinition = getChangedStatics(this, 'attributes', 'collection', 'Collection'),

    // Definition can be made either through statics or define argument.
    // Merge them together, so we won't care about it below.
    definition = assign$3(staticsDefinition, protoProps);
    if ('Collection' in this && this.Collection === void 0) {
        log.error('[Model Definition] ' + this.prototype.getClassName() + '.Collection is undefined. It must be defined _before_ the model.', definition);
    }
    // Compile attributes spec, creating definition mixin.
    var dynamicMixin = compile(getAttributes(definition), baseProto._attributes);
    // Explicit 'properties' declaration overrides auto-generated attribute properties.
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    assign$3(dynamicMixin.properties, protoProps.properties || {});
    // Merge in definition.
    assign$3(dynamicMixin, omit$2(definition, 'attributes', 'collection', 'defaults', 'properties', 'forEachAttr'));
    Mixable.define.call(this, dynamicMixin, staticProps);
    defineCollection.call(this, definition.collection || definition.Collection);
    return this;
};
Record.predefine = function () {
    Transactional.predefine.call(this);
    this.Collection = getBaseClass$1(this).Collection.extend();
    this.Collection.prototype.model = this;
    createSharedTypeSpec(this, SharedType);
    return this;
};
Record._attribute = AggregatedType;
createSharedTypeSpec(Record, SharedType);
function getAttributes(_ref) {
    var defaults = _ref.defaults;
    var attributes = _ref.attributes;
    var idAttribute = _ref.idAttribute;

    var definition = typeof defaults === 'function' ? defaults() : attributes || defaults || {};
    // If there is an undeclared idAttribute, add its definition as untyped generic attribute.
    if (idAttribute && !(idAttribute in definition)) {
        definition[idAttribute] = void 0;
    }
    return definition;
}
function defineCollection(collection) {
    // If collection constructor is specified, take it as it is.
    if (typeof collection === 'function') {
        this.Collection = collection;
        // Link collection with the record
        this.Collection.prototype.model = this;
    } else {
        this.Collection.define(collection || {});
    }
}
Object.defineProperties(Date, {
    microsoft: {
        get: function get() {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: MSDateType
            });
        }
    },
    timestamp: {
        get: function get() {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: TimestampType
            });
        }
    }
});
Number.integer = function (x) {
    return x ? Math.round(x) : 0;
};
Number.integer._attribute = NumericType;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
/** @private */
function createSharedTypeSpec(Constructor, Attribute) {
    Constructor.hasOwnProperty('shared') || Object.defineProperty(Constructor, 'shared', {
        get: function get() {
            return new ChainableAttributeSpec({
                value: null,
                type: Constructor,
                _attribute: Attribute
            });
        }
    });
}

var trigger2$4 = trigger2$1;
var trigger3$4 = trigger3$1;
var on$5 = on$1;
var off$5 = off$1;var _commit$1 = transactionApi.commit;
var _aquire = transactionApi.aquire;var _free = transactionApi.free;
/** @private */
function dispose(collection) {
    var models = collection.models;
    collection.models = [];
    collection._byId = {};
    freeAll(collection, models);
    return models;
}
/** @private */
function convertAndAquire(collection, attrs, options) {
    var model = collection.model;

    var record = void 0;
    if (collection._shared) {
        record = attrs instanceof model ? attrs : model.create(attrs, options);
        if (collection._shared & ItemsBehavior.listen) {
            on$5(record, record._changeEventName, collection._onChildrenChange, collection);
        }
    } else {
        record = attrs instanceof model ? options.merge ? attrs.clone() : attrs : model.create(attrs, options);
        if (!_aquire(collection, record)) {
            var errors = collection._aggregationError || (collection._aggregationError = []);
            errors.push(record);
        }
    }
    // Subscribe for events...
    var _itemEvents = collection._itemEvents;

    _itemEvents && _itemEvents.subscribe(collection, record);
    return record;
}
/** @private */
function free$3(owner, child) {
    if (owner._shared) {
        if (owner._shared & ItemsBehavior.listen) {
            off$5(child, child._changeEventName, owner._onChildrenChange, owner);
        }
    } else {
        _free(owner, child);
    }
    var _itemEvents = owner._itemEvents;

    _itemEvents && _itemEvents.unsubscribe(owner, child);
}
/** @private */
function freeAll(collection, children) {
    for (var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var child = _ref;

        free$3(collection, child);
    }
    return children;
}
/**
 * Silently sort collection, if its required. Returns true if sort happened.
 * @private
 */
function sortElements(collection, options) {
    var _comparator = collection._comparator;

    if (_comparator && options.sort !== false) {
        collection.models.sort(_comparator);
        return true;
    }
    return false;
}
/** @private Add record */
function addIndex(index, model) {
    index[model.cid] = model;
    var id = model.id;
    if (id != null) {
        index[id] = model;
    }
}
/** @private Remove record */
function removeIndex(index, model) {
    delete index[model.cid];
    var id = model.id;
    if (id != null) {
        delete index[id];
    }
}
function updateIndex(index, model) {
    delete index[model.previous(model.idAttribute)];
    var id = model.id;

    id == null || (index[id] = model);
}
/***
 * In Collections, transactions appears only when
 * add remove or change events might be emitted.
 * reset doesn't require transaction.
 *
 * Transaction holds information regarding events, and knows how to emit them.
 *
 * Two major optimization cases.
 * 1) Population of an empty collection
 * 2) Update of the collection (no or little changes) - it's crucial to reject empty transactions.
 */
// Transaction class. Implements two-phase transactions on object's tree.
/** @private */
var CollectionTransaction = function () {
    // open transaction
    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
        classCallCheck(this, CollectionTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.added = added;
        this.removed = removed;
        this.nested = nested;
        this.sorted = sorted;
    }
    // commit transaction


    CollectionTransaction.prototype.commit = function commit(initiator) {
        var nested = this.nested;
        var object = this.object;var _isDirty = object._isDirty;
        // Commit all nested transactions...

        for (var _iterator2 = nested, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var transaction = _ref2;

            transaction.commit(object);
        }
        if (object._aggregationError) {
            logAggregationError(object);
        }
        // Just trigger 'change' on collection, it must be already triggered for models during nested commits.
        // ??? TODO: do it in nested transactions loop? This way appears to be more correct.
        for (var _iterator3 = nested, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var _transaction = _ref3;

            trigger2$4(object, 'change', _transaction.object, _isDirty);
        }
        // Notify listeners on attribute changes...
        var added = this.added;
        var removed = this.removed;
        // Trigger `add` events for both model and collection.

        for (var _iterator4 = added, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var record = _ref4;

            trigger3$4(record, 'add', record, object, _isDirty);
            trigger3$4(object, 'add', record, object, _isDirty);
        }
        // Trigger `remove` events for both model and collection.
        for (var _iterator5 = removed, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref5 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref5 = _i5.value;
            }

            var _record = _ref5;

            trigger3$4(_record, 'remove', _record, object, _isDirty);
            trigger3$4(object, 'remove', _record, object, _isDirty);
        }
        if (this.sorted) {
            trigger2$4(object, 'sort', object, _isDirty);
        }
        if (added.length || removed.length) {
            trigger2$4(object, 'update', object, _isDirty);
        }
        this.isRoot && _commit$1(object, initiator);
    };

    return CollectionTransaction;
}();
function logAggregationError(collection) {
    collection._log('error', 'added records already have an owner', collection._aggregationError);
    collection._aggregationError = void 0;
}

var begin$2 = transactionApi.begin;
var commit$1 = transactionApi.commit;
var markAsDirty$3 = transactionApi.markAsDirty;
/** @private */

function addTransaction(collection, items, options, merge) {
    var isRoot = begin$2(collection),
        nested = [];
    var added = appendElements(collection, items, nested, options, merge);
    if (added.length || nested.length) {
        var needSort = sortOrMoveElements(collection, added, options);
        if (markAsDirty$3(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, [], nested, needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    // No changes...
    isRoot && commit$1(collection);
}

// Handle sort or insert at options for add operation. Reurns true if sort happened.
/** @private */
function sortOrMoveElements(collection, added, options) {
    var at = options.at;
    // if `at` option is given, it overrides sorting option...
    if (at != null) {
        // Take an original collection's length.
        var length = collection.models.length - added.length;
        // Crazy Backbone rules about `at` index. I don't know what that guys smoke.
        at = Number(at);
        if (at < 0) at += length + 1;
        if (at < 0) at = 0;
        if (at > length) at = length;
        // Move added elements to desired position. In place.
        moveElements(collection.models, at, added);
        return false;
    }
    return sortElements(collection, options);
}
/** @private */
function moveElements(source, at, added) {
    for (var j = source.length - 1, i = j - added.length; i >= at; i--, j--) {
        source[j] = source[i];
    }
    for (i = 0, j = at; i < added.length; i++, j++) {
        source[j] = added[i];
    }
}
// append data to model and index
/** @private */
function appendElements(collection, a_items, nested, a_options, forceMerge) {
    var _byId = collection._byId;
    var models = collection.models;var merge = (forceMerge || a_options.merge) && !collection._shared;var parse = a_options.parse;var idAttribute = collection.model.prototype.idAttribute;var prevLength = models.length;
    for (var _iterator = a_items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var item = _ref;

        var model = item ? _byId[item[idAttribute]] || _byId[item.cid] : null;
        if (model) {
            if (merge && item !== model) {
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, a_options);
                transaction && nested.push(transaction);
                if (model.hasChanged(idAttribute)) {
                    updateIndex(_byId, model);
                }
            }
        } else {
            model = convertAndAquire(collection, item, a_options);
            models.push(model);
            addIndex(_byId, model);
        }
    }
    return models.slice(prevLength);
}

var begin$3 = transactionApi.begin;
var commit$2 = transactionApi.commit;
var markAsDirty$4 = transactionApi.markAsDirty;
/** @private */

var silentOptions$1 = { silent: true };
/** @private */
function emptySetTransaction(collection, items, options, silent) {
    var isRoot = begin$3(collection);
    var added = _reallocateEmpty(collection, items, options);
    if (added.length) {
        var needSort = sortElements(collection, options);
        if (markAsDirty$4(collection, silent ? silentOptions$1 : options)) {
            // 'added' is the reference to this.models. Need to copy it.
            return new CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    // No changes...
    isRoot && commit$2(collection);
}

/** @private */
function setTransaction(collection, items, options) {
    var isRoot = begin$3(collection),
        nested = [];
    var previous = collection.models,
        added = _reallocate(collection, items, nested, options);
    var reusedCount = collection.models.length - added.length,
        removed = reusedCount < previous.length ? reusedCount ? _garbageCollect(collection, previous) : freeAll(collection, previous) : [];
    var addedOrChanged = nested.length || added.length,

    // As we are reallocating models array, it needs to be sorted even if there are no changes.
    sorted = sortElements(collection, options) && addedOrChanged || added.length || options.sorted;
    if (addedOrChanged || removed.length || sorted) {
        if (markAsDirty$4(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$2(collection);
}

// Remove references to all previous elements, which are not present in collection.
// Returns an array with removed elements.
/** @private */
function _garbageCollect(collection, previous) {
    var _byId = collection._byId;var removed = [];
    // Filter out removed models and remove them from the index...
    for (var _iterator = previous, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var record = _ref;

        if (!_byId[record.cid]) {
            removed.push(record);
            free$3(collection, record);
        }
    }
    return removed;
}
// reallocate model and index
/** @private */
function _reallocate(collection, source, nested, options) {
    var models = Array(source.length),
        _byId = {},
        merge = (options.merge == null ? true : options.merge) && !collection._shared,
        _prevById = collection._byId,
        prevModels = collection.models,
        idAttribute = collection.model.prototype.idAttribute,
        toAdd = [],
        orderKept = true;
    // for each item in source set...
    for (var i = 0, j = 0; i < source.length; i++) {
        var item = source[i],
            model = null;
        if (item) {
            var id = item[idAttribute],
                cid = item.cid;
            if (_byId[id] || _byId[cid]) continue;
            model = _prevById[id] || _prevById[cid];
        }
        if (model) {
            if (merge && item !== model) {
                if (orderKept && prevModels[j] !== model) orderKept = false;
                var attrs = item.attributes || item;
                var transaction = model._createTransaction(attrs, options);
                transaction && nested.push(transaction);
            }
        } else {
            model = convertAndAquire(collection, item, options);
            toAdd.push(model);
        }
        models[j++] = model;
        addIndex(_byId, model);
    }
    models.length = j;
    collection.models = models;
    collection._byId = _byId;
    if (!orderKept) options.sorted = true;
    return toAdd;
}
/** @private */
function _reallocateEmpty(self, source, options) {
    var len = source ? source.length : 0,
        models = Array(len),
        _byId = {},
        idAttribute = self.model.prototype.idAttribute;
    for (var i = 0, j = 0; i < len; i++) {
        var src = source[i];
        if (src && (_byId[src[idAttribute]] || _byId[src.cid])) {
            continue;
        }
        var model = convertAndAquire(self, src, options);
        models[j++] = model;
        addIndex(_byId, model);
    }
    models.length = j;
    self._byId = _byId;
    return self.models = models;
}

/*************
 * Remove items from collections.
 *
 * Cannot be a part of two-phase transaction on object tree.
 * Can be executed in the scope of ad-hoc transaction or from the trigger, though.
 *
 * Implemented with low-level API.
 * Most frequent operation - single element remove. Thus, it have the fast-path.
 */
var trigger2$5 = trigger2$1;
var trigger3$5 = trigger3$1;var markAsDirty$5 = transactionApi.markAsDirty;
var begin$4 = transactionApi.begin;
var commit$3 = transactionApi.commit;
/** @private */

function removeOne(collection, el, options) {
    var model = collection.get(el);
    if (model) {
        var isRoot = begin$4(collection),
            models = collection.models;
        // Remove model form the collection.
        models.splice(models.indexOf(model), 1);
        removeIndex(collection._byId, model);
        // Mark transaction as dirty.
        var notify = markAsDirty$5(collection, options);
        // Send out events.
        if (notify) {
            trigger3$5(model, 'remove', model, collection, options);
            trigger3$5(collection, 'remove', model, collection, options);
        }
        free$3(collection, model);
        notify && trigger2$5(collection, 'update', collection, options);
        // Commit transaction.
        isRoot && commit$3(collection);
        return model;
    }
}

/** Optimized for removing many elements
 * 1. Remove elements from the index, checking for duplicates
 * 2. Create new models array matching index
 * 3. Send notifications and remove references
 */
/** @private */
function removeMany(collection, toRemove, options) {
    var removed = _removeFromIndex(collection, toRemove);
    if (removed.length) {
        var isRoot = begin$4(collection);
        _reallocate$1(collection, removed.length);
        if (markAsDirty$5(collection, options)) {
            var transaction = new CollectionTransaction(collection, isRoot, [], removed, [], false);
            transaction.commit();
        } else {
            // Commit transaction.
            isRoot && commit$3(collection);
        }
    }
    return removed;
}

// remove models from the index...
/** @private */
function _removeFromIndex(collection, toRemove) {
    var removed = Array(toRemove.length),
        _byId = collection._byId;
    for (var i = 0, j = 0; i < toRemove.length; i++) {
        var model = collection.get(toRemove[i]);
        if (model) {
            removed[j++] = model;
            removeIndex(_byId, model);
            free$3(collection, model);
        }
    }
    removed.length = j;
    return removed;
}
// Allocate new models array removing models not present in the index.
/** @private */
function _reallocate$1(collection, removed) {
    var prev = collection.models,
        models = collection.models = Array(prev.length - removed),
        _byId = collection._byId;
    for (var i = 0, j = 0; i < prev.length; i++) {
        var model = prev[i];
        if (_byId[model.cid]) {
            models[j++] = model;
        }
    }
    models.length = j;
}

var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var trigger2$2 = trigger2$1;
var begin = transactionApi.begin;
var commit = transactionApi.commit;
var markAsDirty = transactionApi.markAsDirty;var omit$1 = omit;
var assign$1 = assign;
var defaults$2 = defaults$$1;

var _count = 0;
var _slice = Array.prototype.slice;

var CollectionRefsType = function (_SharedType) {
    inherits(CollectionRefsType, _SharedType);

    function CollectionRefsType() {
        classCallCheck(this, CollectionRefsType);
        return possibleConstructorReturn(this, _SharedType.apply(this, arguments));
    }

    return CollectionRefsType;
}(SharedType);

CollectionRefsType.defaultValue = [];
var Collection = Collection_1 = function (_Transactional) {
    inherits(Collection, _Transactional);

    function Collection(records) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var shared = arguments[2];
        classCallCheck(this, Collection);

        var _this2 = possibleConstructorReturn(this, _Transactional.call(this, _count++));

        _this2.models = [];
        _this2._byId = {};
        _this2.comparator = _this2.comparator;
        if (options.comparator !== void 0) {
            _this2.comparator = options.comparator;
            options.comparator = void 0;
        }
        _this2.model = _this2.model;
        if (options.model) {
            _this2.model = options.model;
            options.model = void 0;
        }
        _this2.idAttribute = _this2.model.prototype.idAttribute; //TODO: Remove?
        _this2._shared = shared || 0;
        if (records) {
            var elements = toElements(_this2, records, options);
            emptySetTransaction(_this2, elements, options, true);
        }
        _this2.initialize.apply(_this2, arguments);
        if (_this2._localEvents) _this2._localEvents.subscribe(_this2, _this2);
        return _this2;
    }

    Collection.prototype.createSubset = function createSubset(models, options) {
        var SubsetOf = this.constructor.subsetOf(this).options.type,
            subset = new SubsetOf(models, options);
        subset.resolve(this);
        return subset;
    };

    Collection.predefine = function predefine$$1() {
        // Cached subset collection must not be inherited.
        var Ctor = this;
        this._SubsetOf = null;
        function RefsCollection(a, b, listen) {
            Ctor.call(this, a, b, ItemsBehavior.share | (listen ? ItemsBehavior.listen : 0));
        }
        Mixable.mixTo(RefsCollection);
        RefsCollection.prototype = this.prototype;
        RefsCollection._attribute = CollectionRefsType;
        this.Refs = this.Subset = RefsCollection;
        Transactional.predefine.call(this);
        createSharedTypeSpec(this, SharedType);
        return this;
    };

    Collection.define = function define$$1() {
        var protoProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var staticProps = arguments[1];

        // Extract record definition from static members, if any.
        var staticsDefinition = getChangedStatics(this, 'comparator', 'model', 'itemEvents'),

        // Definition can be made either through statics or define argument.
        // Merge them together, so we won't care about it below.
        definition = assign$1(staticsDefinition, protoProps);
        var spec = omit$1(definition, 'itemEvents');
        if (definition.itemEvents) {
            var eventsMap = new EventMap(this.prototype._itemEvents);
            eventsMap.addEventsMap(definition.itemEvents);
            spec._itemEvents = eventsMap;
        }
        return Transactional.define.call(this, spec, staticProps);
    };
    // Polymorphic accessor for aggregated attribute's canBeUpdated().


    // TODO: Improve typing
    Collection.prototype.getStore = function getStore() {
        return this._store || (this._store = this._owner ? this._owner.getStore() : this._defaultStore);
    };

    Collection.prototype._onChildrenChange = function _onChildrenChange(record) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var initiator = arguments[2];

        // Ignore updates from nested transactions.
        if (initiator === this) return;
        var idAttribute = this.idAttribute;

        if (record.hasChanged(idAttribute)) {
            updateIndex(this._byId, record);
        }
        var isRoot = begin(this);
        if (markAsDirty(this, options)) {
            // Forward change event from the record.
            trigger2$2(this, 'change', record, options);
        }
        isRoot && commit(this);
    };

    Collection.prototype.get = function get$$1(objOrId) {
        if (objOrId == null) return;
        if ((typeof objOrId === "undefined" ? "undefined" : _typeof(objOrId)) === 'object') {
            var id = objOrId[this.idAttribute];
            return id !== void 0 && this._byId[id] || this._byId[objOrId.cid];
        } else {
            return this._byId[objOrId];
        }
    };

    Collection.prototype.each = function each(iteratee, context) {
        var fun = context !== void 0 ? function (v, k) {
            return iteratee.call(context, v, k);
        } : iteratee;var models = this.models;

        for (var i = 0; i < models.length; i++) {
            fun(models[i], i);
        }
    };
    // this solution does not support iteratee shorthands, and we use that alot :/


    Collection.prototype.map = function map(iteratee, context) {
        return _map(this.models, iteratee);
        /*const fun = arguments.length === 2 ? ( v, k ) => iteratee.call( context, v, k ) : iteratee,
            { models } = this,
            mapped = Array( models.length );
         let j = 0;
         for( let i = 0; i < models.length; i++ ){
            const x = fun( models[ i ], i );
            x === void 0 || ( mapped[ j++ ] = x );
        }
         mapped.length = j;
         return mapped;*/
    };

    Collection.prototype._validateNested = function _validateNested(errors) {
        // Don't validate if not aggregated.
        if (this._shared) return 0;
        var count = 0;
        this.each(function (record) {
            var error = record.validationError;
            if (error) {
                errors[record.cid] = error;
                count++;
            }
        });
        return count;
    };

    Collection.prototype.initialize = function initialize() {};

    Collection.prototype.first = function first() {
        return this.models[0];
    };

    Collection.prototype.last = function last() {
        return this.models[this.models.length - 1];
    };

    Collection.prototype.at = function at(a_index) {
        var index = a_index < 0 ? a_index + this.models.length : a_index;
        return this.models[index];
    };
    // Deeply clone collection, optionally setting new owner.


    Collection.prototype.clone = function clone() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var models = this._shared & ItemsBehavior.share ? this.models : this.map(function (model) {
            return model.clone();
        }),
            copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };

    Collection.prototype.toJSON = function toJSON() {
        return this.models.map(function (model) {
            return model.toJSON();
        });
    };
    // Apply bulk in-place object update in scope of ad-hoc transaction


    Collection.prototype.set = function set$$1() {
        var elements = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (options.add !== void 0) {
            this._log('warn', "Collection.set doesn't support 'add' option, behaving as if options.add === true.", options);
        }
        // Handle reset option here - no way it will be populated from the top as nested transaction.
        if (options.reset) {
            this.reset(elements, options);
        } else {
            var transaction = this._createTransaction(elements, options);
            transaction && transaction.commit();
        }
        return this;
    };

    Collection.prototype.dispose = function dispose$$1() {
        if (this._disposed) return;
        var aggregated = !this._shared;
        for (var _iterator = this.models, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var record = _ref;

            free$3(this, record);
            if (aggregated) record.dispose();
        }
        _Transactional.prototype.dispose.call(this);
    };

    Collection.prototype.reset = function reset(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = begin(this),
            previousModels = dispose(this);
        // Make all changes required, but be silent.
        if (a_elements) {
            emptySetTransaction(this, toElements(this, a_elements, options), options, true);
        }
        markAsDirty(this, options);
        options.silent || trigger2$2(this, 'reset', this, defaults$2({ previousModels: previousModels }, options));
        isRoot && commit(this);
        return this.models;
    };
    // Add elements to collection.


    Collection.prototype.add = function add(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var elements = toElements(this, a_elements, options),
            transaction = this.models.length ? addTransaction(this, elements, options) : emptySetTransaction(this, elements, options);
        if (transaction) {
            transaction.commit();
            return transaction.added;
        }
    };
    // Remove elements.


    Collection.prototype.remove = function remove(recordsOrIds) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (recordsOrIds) {
            return Array.isArray(recordsOrIds) ? removeMany(this, recordsOrIds, options) : removeOne(this, recordsOrIds, options);
        }
        return [];
    };
    // Apply bulk object update without any notifications, and return open transaction.
    // Used internally to implement two-phase commit.


    Collection.prototype._createTransaction = function _createTransaction(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var elements = toElements(this, a_elements, options);
        if (this.models.length) {
            return options.remove === false ? addTransaction(this, elements, options, true) : setTransaction(this, elements, options);
        } else {
            return emptySetTransaction(this, elements, options);
        }
    };
    /***********************************
     * Collection manipulation methods
     */


    Collection.prototype.pluck = function pluck(key) {
        return this.models.map(function (model) {
            return model[key];
        });
    };

    Collection.prototype.sort = function sort() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        if (sortElements(this, options)) {
            var isRoot = begin(this);
            if (markAsDirty(this, options)) {
                trigger2$2(this, 'sort', this, options);
            }
            isRoot && commit(this);
        }
        return this;
    };
    // Add a model to the end of the collection.


    Collection.prototype.push = function push(model, options) {
        return this.add(model, assign$1({ at: this.length }, options));
    };
    // Remove a model from the end of the collection.


    Collection.prototype.pop = function pop(options) {
        var model = this.at(this.length - 1);
        this.remove(model, options);
        return model;
    };
    // Add a model to the beginning of the collection.


    Collection.prototype.unshift = function unshift(model, options) {
        return this.add(model, assign$1({ at: 0 }, options));
    };
    // Remove a model from the beginning of the collection.


    Collection.prototype.shift = function shift(options) {
        var model = this.at(0);
        this.remove(model, options);
        return model;
    };
    // Slice out a sub-array of models from the collection.


    Collection.prototype.slice = function slice() {
        return _slice.apply(this.models, arguments);
    };

    Collection.prototype.indexOf = function indexOf(modelOrId) {
        var record = this.get(modelOrId);
        return this.models.indexOf(record);
    };

    Collection.prototype.modelId = function modelId(attrs) {
        return attrs[this.model.prototype.idAttribute];
    };
    // Toggle model in collection.


    Collection.prototype.toggle = function toggle(model, a_next) {
        var prev = Boolean(this.get(model)),
            next = a_next === void 0 ? !prev : Boolean(a_next);
        if (prev !== next) {
            if (prev) {
                this.remove(model);
            } else {
                this.add(model);
            }
        }
        return next;
    };

    Collection.prototype._log = function _log(level, text, value) {
        log[level]("[Collection Update] " + this.model.prototype.getClassName() + "." + this.getClassName() + ": " + text, value, 'Attributes spec:', this.model.prototype._attributes);
    };

    Collection.prototype.getClassName = function getClassName() {
        return _Transactional.prototype.getClassName.call(this) || 'Collection';
    };

    createClass(Collection, [{
        key: "__inner_state__",
        get: function get$$1() {
            return this.models;
        }
    }, {
        key: "comparator",
        set: function set$$1(x) {
            var _this3 = this;

            var compare = void 0;
            switch (typeof x === "undefined" ? "undefined" : _typeof(x)) {
                case 'string':
                    this._comparator = function (a, b) {
                        var aa = a[x],
                            bb = b[x];
                        if (aa === bb) return 0;
                        return aa < bb ? -1 : +1;
                    };
                    break;
                case 'function':
                    if (x.length === 1) {
                        this._comparator = function (a, b) {
                            var aa = x.call(_this3, a),
                                bb = x.call(_this3, b);
                            if (aa === bb) return 0;
                            return aa < bb ? -1 : +1;
                        };
                    } else {
                        this._comparator = function (a, b) {
                            return x.call(_this3, a, b);
                        };
                    }
                    break;
                default:
                    this._comparator = null;
            }
        },
        get: function get$$1() {
            return this._comparator;
        }
    }, {
        key: "length",
        get: function get$$1() {
            return this.models.length;
        }
    }]);
    return Collection;
}(Transactional);
Collection._attribute = AggregatedType;
Collection = Collection_1 = __decorate$1([define({
    // Default client id prefix
    cidPrefix: 'c',
    model: Record,
    _changeEventName: 'changes',
    _aggregationError: null
})], Collection);
// TODO: make is safe for parse to return null (?)
function toElements(collection, elements, options) {
    var parsed = options.parse ? collection.parse(elements, options) : elements;
    return Array.isArray(parsed) ? parsed : [parsed];
}
createSharedTypeSpec(Collection, SharedType);
Record.Collection = Collection;
var Collection_1;

/** @private */
function parseReference(collectionRef) {
    switch (typeof collectionRef === 'undefined' ? 'undefined' : _typeof(collectionRef)) {
        case 'function':
            return function (root) {
                return collectionRef.call(root);
            };
        case 'object':
            return function () {
                return collectionRef;
            };
        case 'string':
            var _ref = new CompiledReference(collectionRef);

            var resolve = _ref.resolve;

            return resolve;
    }
}

/** @private */

var RecordRefType = function (_AnyType) {
    inherits(RecordRefType, _AnyType);

    function RecordRefType() {
        classCallCheck(this, RecordRefType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    // It is always serialized as an id, whenever it's resolved or not.
    RecordRefType.prototype.toJSON = function toJSON(value) {
        return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.id : value;
    };
    // Wne


    RecordRefType.prototype.clone = function clone(value) {
        return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.id : value;
    };
    // Model refs by id are equal when their ids are equal.


    RecordRefType.prototype.isChanged = function isChanged(a, b) {
        var aId = a && (a.id == null ? a : a.id),
            bId = b && (b.id == null ? b : b.id);
        return aId !== bId;
    };
    // Refs are always valid.


    RecordRefType.prototype.validate = function validate(model, value, name) {};

    return RecordRefType;
}(AnyType);

Record.from = function from(masterCollection) {
    var getMasterCollection = parseReference(masterCollection);
    var typeSpec = new ChainableAttributeSpec({
        value: null,
        _attribute: RecordRefType
    });
    return typeSpec.get(function (objOrId, name) {
        if ((typeof objOrId === 'undefined' ? 'undefined' : _typeof(objOrId)) === 'object') return objOrId;
        // So, we're dealing with an id reference. Resolve it.
        var collection = getMasterCollection(this);
        var record = null;
        // If master collection exists and is not empty...
        if (collection && collection.length) {
            // Silently update attribute with record from this collection.
            record = collection.get(objOrId) || null;
            this.attributes[name] = record;
            // Subscribe for events manually. delegateEvents won't be invoked.
            record && this._attributes[name].handleChange(record, null, this);
        }
        return record;
    });
};

var __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var fastDefaults$1 = fastDefaults;

Collection.subsetOf = function subsetOf(masterCollection) {
    var SubsetOf = this._SubsetOf || (this._SubsetOf = defineSubsetCollection(this)),
        getMasterCollection = parseReference(masterCollection),
        typeSpec = new ChainableAttributeSpec({
        type: SubsetOf
    });
    return typeSpec.get(function (refs) {
        !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
        return refs;
    });
};
/** @private */
function subsetOptions(options) {
    var subsetOptions = { parse: true };
    if (options) fastDefaults$1(subsetOptions, options);
    return subsetOptions;
}
var subsetOfBehavior = ItemsBehavior.share | ItemsBehavior.persistent;
function defineSubsetCollection(CollectionConstructor) {
    var SubsetOfCollection = function (_CollectionConstructo) {
        inherits(SubsetOfCollection, _CollectionConstructo);

        function SubsetOfCollection(recordsOrIds, options) {
            classCallCheck(this, SubsetOfCollection);

            var _this = possibleConstructorReturn(this, _CollectionConstructo.call(this, recordsOrIds, subsetOptions(options), subsetOfBehavior));

            _this.resolvedWith = null;
            return _this;
        }

        SubsetOfCollection.prototype.add = function add(elements, options) {
            return _CollectionConstructo.prototype.add.call(this, elements, subsetOptions(options));
        };

        SubsetOfCollection.prototype.reset = function reset(elements, options) {
            return _CollectionConstructo.prototype.reset.call(this, elements, subsetOptions(options));
        };

        SubsetOfCollection.prototype._createTransaction = function _createTransaction(elements, options) {
            return _CollectionConstructo.prototype._createTransaction.call(this, elements, subsetOptions(options));
        };
        // Serialized as an array of model ids.


        SubsetOfCollection.prototype.toJSON = function toJSON() {
            return this.refs ? this.refs.map(function (objOrId) {
                return objOrId.id || objOrId;
            }) : this.models.map(function (model) {
                return model.id;
            });
        };
        // Subset is always valid.


        SubsetOfCollection.prototype._validateNested = function _validateNested() {
            return 0;
        };
        // Must be shallow copied on clone.


        SubsetOfCollection.prototype.clone = function clone(owner) {
            var Ctor = this.constructor,
                copy = new Ctor([], {
                model: this.model,
                comparator: this.comparator
            });
            if (this.resolvedWith) {
                copy.resolvedWith = this.resolvedWith;
                copy.reset(this.models, { silent: true });
            } else {
                copy.refs = this.refs;
            }
            return copy;
        };
        // Parse is always invoked. Careful, performance-sensitive.


        SubsetOfCollection.prototype.parse = function parse(raw) {
            var resolvedWith = this.resolvedWith;var elements = Array.isArray(raw) ? raw : [raw];var records = [];
            if (resolvedWith) {
                for (var _iterator = elements, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var element = _ref;

                    var record = resolvedWith.get(element);
                    if (record) records.push(record);
                }
            } else if (elements.length) {
                this.refs = elements;
            }
            return records;
        };

        SubsetOfCollection.prototype.resolve = function resolve(collection) {
            if (collection && collection.length) {
                this.resolvedWith = collection;
                if (this.refs) {
                    this.reset(this.refs, { silent: true });
                    this.refs = null;
                }
            }
            return this;
        };

        SubsetOfCollection.prototype.getModelIds = function getModelIds() {
            return this.toJSON();
        };

        SubsetOfCollection.prototype.toggle = function toggle(modelOrId, val) {
            return _CollectionConstructo.prototype.toggle.call(this, this.resolvedWith.get(modelOrId), val);
        };

        SubsetOfCollection.prototype.addAll = function addAll() {
            return this.reset(this.resolvedWith.models);
        };

        SubsetOfCollection.prototype.toggleAll = function toggleAll() {
            return this.length ? this.reset() : this.addAll();
        };

        createClass(SubsetOfCollection, [{
            key: "__inner_state__",
            get: function get$$1() {
                return this.refs || this.models;
            }
        }]);
        return SubsetOfCollection;
    }(CollectionConstructor);
    SubsetOfCollection = __decorate$4([define({})], SubsetOfCollection);
    return SubsetOfCollection;
}

var _store = null;
var Store = function (_Record) {
    inherits(Store, _Record);

    function Store() {
        classCallCheck(this, Store);
        return possibleConstructorReturn(this, _Record.apply(this, arguments));
    }

    Store.prototype.getStore = function getStore() {
        return this;
    };
    // delegate item lookup to owner, and to the global store if undefined


    Store.prototype.get = function get$$1(name) {
        // Lookup for resource in the current store.
        var local = this[name];
        // If something is found or it's the global store, return result.
        if (local || this === this._defaultStore) return local;
        // Forward failed lookup to owner or global store.
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };

    createClass(Store, null, [{
        key: 'global',
        get: function get$$1() {
            return _store;
        },
        set: function set$$1(store) {
            if (_store) {
                _store.dispose();
            }
            Transactional.prototype._defaultStore = _store = store;
        }
    }]);
    return Store;
}(Record);
Store.global = new Store();

/**
 * Export everything
 */
// Exported module itself is the global event bus.
/** Typeless attribute declaration with default value. */

/** Wrap model or collection method in transaction. */

var slice$1 = Array.prototype.slice;

var UnderscoreModel = {
    pick: function pick() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _pick(this, args);
    },
    escape: function escape(attr) {
        return _escape(this[attr]);
    },
    matches: function matches(attrs) {
        return !!_iteratee(attrs, this)(this);
    },
    omit: function omit() {
        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            keys[_key2] = arguments[_key2];
        }

        return this.mapObject(function (value, key) {
            if (keys.indexOf(key) < 0) {
                return value;
            }
        });
    },
    invert: function invert() {
        var inverted = {};
        this.each(function (value, key) {
            return inverted[value] = key;
        });
        return inverted;
    },
    pairs: function pairs() {
        return this.map(function (value, key) {
            return [key, value];
        });
    },
    isEmpty: function isEmpty() {
        return !this.values().length;
    } //,

    //  chain(){
    //      return _.chain( this.mapObject( x => x ) );
    //  }

};

var UnderscoreCollection = {
    where: function where(attrs, first) {
        return this[first ? 'find' : 'filter'](attrs);
    },
    findWhere: function findWhere(attrs) {
        return this.where(attrs, true);
    }
};

addUnderscoreMethods(UnderscoreCollection, 'models', {
    forEach: { l: 3, m: _forEach },
    //  each : { l:3, m: each},
    map: { l: 3, m: _map },
    //  collect : { l:3, m: collect},
    reduce: { l: 4, m: _reduce },
    //  foldl    : { l:4, m: foldl},
    //  inject : { l:4, m: inject},
    //  reduceRight : { l:4, m: reduceRight},
    //  foldr : { l:4, m: foldr},
    find: { l: 3, m: _find },
    findIndex: { l: 3, m: _findIndex },
    findLastIndex: { l: 3, m: _findLastIndex },
    //  detect : { l:3, m: detect},
    filter: { l: 3, m: _filter },
    //  select   : { l:3, m: select},
    //  reject : { l:3, m: reject},
    every: { l: 3, m: _every },
    //  all : { l:3, m:all },
    some: { l: 3, m: _some },
    //  any : { l:3, m:any },
    //  include : { l:3, m:include },
    includes: { l: 3, m: _includes },
    //  contains : { l:3, m:contains },
    invoke: { l: 0, m: _invoke },
    max: { l: 3, m: _max },
    min: { l: 3, m: _min },
    toArray: { l: 1, m: _toArray },
    //  size : { l:1, m:size },
    //  first : { l:3, m:first },
    head: { l: 3, m: _head },
    //  take : { l:3, m:take },
    //  initial : { l:3, m:initial },
    //  rest : { l:3, m:rest },
    tail: { l: 3, m: _tail },
    //  drop : { l:3, m:drop },
    last: { l: 3, m: _last },
    without: { l: 0, m: _without },
    difference: { l: 0, m: _difference },
    indexOf: { l: 3, m: _indexOf },
    //  shuffle : { l:1, m: shuffle},
    lastIndexOf: { l: 3, m: _lastIndexOf },
    isEmpty: { l: 1, m: _isEmpty },
    //  chain : { l:1, m:chain },
    sample: { l: 3, m: _sample },
    partition: { l: 3, m: _partition },
    groupBy: { l: 3, m: _groupBy },
    countBy: { l: 3, m: _countBy },
    sortBy: { l: 3, m: _sortBy }
});

function addUnderscoreMethods(Mixin, attribute, methods) {
    _each(methods, function (_ref, methodName) {
        var l = _ref.l;
        var m = _ref.m;

        Mixin[methodName] = addMethod(l, m, attribute);
    });
}

// Proxy Backbone class methods to Underscore functions, wrapping the model's
// `attributes` object or collection's `models` array behind the scenes.
//
// collection.filter(function(model) { return model.get('age') > 10 });
// collection.each(this.addView);
//
// `Function#apply` can be slow so we use the method's arg count, if we know it.
function addMethod(length, method, attribute) {
    switch (length) {
        case 1:
            return function () {
                return method(this[attribute]);
            };
        case 2:
            return function (value) {
                return method(this[attribute], value);
            };
        case 3:
            return function (iteratee, context) {
                var value = this[attribute],
                    callback = cb(iteratee, this);

                return arguments.length > 1 ? method(value, callback, context) : method(value, callback);
            };
        case 4:
            return function (iteratee, defaultVal, context) {
                var value = this[attribute],
                    callback = cb(iteratee, this);

                return arguments.length > 1 ? method(value, callback, defaultVal, context) : method(value, callback);
            };
        default:
            return function () {
                var args = slice$1.call(arguments);
                args.unshift(this[attribute]);
                return method.apply(method, args);
            };
    }
}

// Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
function cb(iteratee, instance) {
    switch (typeof iteratee === 'undefined' ? 'undefined' : _typeof(iteratee)) {
        case 'function':
            return iteratee;
        case 'string':
            return function (model) {
                return model.get(iteratee);
            };
        case 'object':
            if (!(iteratee instanceof instance.model)) return _matches(iteratee);
    }

    return iteratee;
}

/**
 * Prepare backbone View, Router, History, and Events.
 */
//export = Nested;
//import * as Backbone from './backbone'
//import { RestCollection, RestModel } from './rest'
//import { Store } from '../type-r/src'
//import * as Sync from './sync'
//import { RestStore, LazyStore } from './rest-store'

Mixable.mixins(Events);
//Nested.Mixable.mixTo( Backbone.View, Backbone.Router, Backbone.History );

Record.mixins(UnderscoreModel);
Collection.mixins(UnderscoreCollection);

export { Mixable, Record as Model, Collection, Events, define, tools, mergeProps };
