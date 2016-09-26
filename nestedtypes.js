import { countBy, difference, each as each$1, escape as escape$1, every as every$1, filter, find, findIndex, findLastIndex, forEach, groupBy, head, includes, indexOf as indexOf$1, invoke, isEmpty, iteratee, last as last$1, lastIndexOf, map as map$1, matches, max, min, partition, pick as pick$1, reduce, sample, some as some$1, sortBy, tail, toArray, without } from 'lodash';

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







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

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



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Log = function () {
    function Log() {
        classCallCheck(this, Log);

        this.stops = {};
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

    Log.prototype.reset = function reset() {
        this.level = 2;
        this.counts = { error: 0, warn: 0, info: 0, debug: 0 };
        this.stops = {};
        return this;
    };

    Log.prototype.developer = function developer(trueDeveloper) {
        this.level = 3;
        this.stops = { error: true, warn: Boolean(trueDeveloper) };
        return this;
    };

    Log.prototype.error = function error() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (this.level > 0) this.doLogging('error', args);
    };

    Log.prototype.warn = function warn() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        if (this.level > 1) this.doLogging('warn', args);
    };

    Log.prototype.info = function info() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        if (this.level > 2) this.doLogging('info', args);
    };

    Log.prototype.debug = function debug() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        if (this.level > 3) this.doLogging('debug', args);
    };

    createClass(Log, [{
        key: 'state',
        get: function get() {
            return '\nObject.log - Object+ Logging and Debugging Utility\n--------------------------------------------------\nObject.log.counts: Number of logged events by type\n    { errors : ' + this.counts.error + ', warns : ' + this.counts.warn + ', info : ' + this.counts.info + ', debug : ' + this.counts.debug + ' }\n\nObject.log.level == ' + this.level + ' : Ignore events which are above specified level \n    - 0 - logging is off;\n    - 1 - Object.log.error(...) only;\n    - 2 - .error() and .warn();\n    - 3 - .error(), .warn(), and .info();\n    - 4 - all of above plus .debug().\n\nObject.log.stops: Stops in debugger for some certain event types\n     { error : ' + (this.stops.error || false) + ', warn  : ' + (this.stops.warn || false) + ', info  : ' + (this.stops.info || false) + ', debug : ' + (this.stops.debug || false) + ' } \n\nObject.log.throws: Throws expection on some certain event types\n     { error : ' + (this.throws.error || false) + ', warn  : ' + (this.throws.warn || false) + ', info  : ' + (this.throws.info || false) + ', debug : ' + (this.throws.debug || false) + ' }\n';
        }
    }]);
    return Log;
}();
var log = new Log();
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
                return every$2(value, isValidJSON);
            }
    }
    return false;
}
function getBaseClass(Class) {
    return Object.getPrototypeOf(Class.prototype).constructor;
}
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
function isEmpty$1(obj) {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
function someArray(arr, fun) {
    var result = void 0;
    for (var i = 0; i < arr.length; i++) {
        if (result = fun(arr[i], i)) {
            return result;
        }
    }
}
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
function some$2(obj, fun) {
    if (Object.getPrototypeOf(obj) === ArrayProto) {
        return someArray(obj, fun);
    } else {
        return someObject(obj, fun);
    }
}
function every$2(obj, predicate) {
    return !some$2(obj, function (x) {
        return !predicate(x);
    });
}
function getPropertyDescriptor(obj, prop) {
    var desc = void 0;
    for (var proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
        desc = Object.getOwnPropertyDescriptor(obj, prop);
    }
    return desc;
}
function omit$1(source) {
    var dest = {},
        discard = {};
    for (var i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard[name] && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
function transform$1(dest, source, fun) {
    for (var name in source) {
        if (source.hasOwnProperty(name)) {
            var value = fun(source[name], name);
            value === void 0 || (dest[name] = value);
        }
    }
    return dest;
}
function fastAssign(dest, source) {
    for (var name in source) {
        dest[name] = source[name];
    }
    return dest;
}
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
function defaults$1(dest, source) {
    for (var name in source) {
        if (source.hasOwnProperty(name) && dest[name] === void 0) {
            dest[name] = source[name];
        }
    }
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var other = arguments[i];
            other && defaults$1(dest, other);
        }
    }
    return dest;
}
function keys$1(o) {
    return o ? Object.keys(o) : [];
}
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
var ArrayProto = Array.prototype;
var DateProto = Date.prototype;
var ObjectProto = Object.prototype;
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
	isEmpty: isEmpty$1,
	some: some$2,
	every: every$2,
	getPropertyDescriptor: getPropertyDescriptor,
	omit: omit$1,
	transform: transform$1,
	fastAssign: fastAssign,
	fastDefaults: fastDefaults,
	assign: assign,
	defaults: defaults$1,
	keys: keys$1,
	once: once$1,
	notEqual: notEqual
});

var Mixable = function () {
    function Mixable() {
        classCallCheck(this, Mixable);

        this.initialize.apply(this, arguments);
    }

    Mixable.prototype.initialize = function initialize() {};

    Mixable.create = function create(a, b) {
        return new this(a, b);
    };

    Mixable.mixins = function mixins() {
        var proto = this.prototype,
            mergeRules = this._mixinRules || {},
            _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();

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

            if (mixin instanceof Array) {
                return Mixable.mixins.apply(this, mixin);
            }
            if (_appliedMixins.indexOf(mixin) >= 0) continue;
            _appliedMixins.push(mixin);
            if (typeof mixin === 'function') {
                defaults$1(this, mixin);
                mergeProps(proto, mixin.prototype, mergeRules);
            } else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };

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

    Mixable.mixinRules = function mixinRules(_mixinRules) {
        var Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(_mixinRules, Base._mixinRules);
        }
        this._mixinRules = _mixinRules;
        return this;
    };

    Mixable.define = function define() {
        var definition = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var staticProps = arguments[1];

        if (!this.define) {
            log.error("[Class.define] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
            return this;
        }
        this.predefine();
        var proto = this.prototype;
        var protoProps = omit$1(definition, 'properties', 'mixins', 'mixinRules');var _definition$propertie = definition.properties;
        var properties = _definition$propertie === undefined ? {} : _definition$propertie;
        var mixins = definition.mixins;
        var mixinRules = definition.mixinRules;

        assign(proto, protoProps);
        assign(this, staticProps);
        properties && Object.defineProperties(proto, transform$1({}, properties, toPropertyDescriptor));
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };

    Mixable.extend = function extend(spec, statics) {
        var Subclass = void 0;
        if (spec && spec.hasOwnProperty('constructor')) {
            Subclass = spec.constructor;
            __extends(Subclass, this);
        } else {
            Subclass = function (_ref3) {
                inherits(Subclass, _ref3);

                function Subclass() {
                    classCallCheck(this, Subclass);
                    return possibleConstructorReturn(this, _ref3.apply(this, arguments));
                }

                return Subclass;
            }(this);
        }
        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
    };

    Mixable.predefine = function predefine$1() {
        var BaseClass = getBaseClass(this);
        if (BaseClass.create === this.create) {
            this.create = Mixable.create;
        }
        this.__super__ = BaseClass.prototype;
        return this;
    };

    return Mixable;
}();

Mixable._mixinRules = { properties: 'merge' };
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x } : x;
    }
}
function mixinRules(rules) {
    return createDecorator('mixinRules', rules);
}
function mixins() {
    for (var _len3 = arguments.length, list = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        list[_key3] = arguments[_key3];
    }

    return createDecorator('mixins', list);
}
function extendable(Type) {
    Mixable.mixTo(Type);
}
function predefine$1(Constructor) {
    Constructor.predefine();
}
function define(spec) {
    if (typeof spec === 'function') {
        spec.define({});
    } else {
        return createDecorator('define', spec);
    }
}
function createDecorator(name, spec) {
    return function (Ctor) {
        if (Ctor[name]) {
            Ctor[name](spec);
        } else {
            Mixable[name].call(Ctor, spec);
        }
    };
}
function mergeObjects(a, b, rules) {
    var x = assign({}, a);
    return mergeProps(x, b, rules);
}
var mergeFunctions = {
    pipe: function pipe(a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
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
    every: function every(a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some: function some(a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
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

var eventSplitter$1 = /\s+/;
var EventHandler$1 = function () {
    function EventHandler(context, ctx, listening, callback) {
        classCallCheck(this, EventHandler);

        this.context = context;
        this.ctx = ctx;
        this.listening = listening;
        this.callback = callback;
    }

    EventHandler.prototype.clone = function clone(callback) {
        var context = this.context;
        var listening = this.listening;

        if (listening) listening.count++;
        return new EventHandler(context, context || this.ctx, listening, callback);
    };

    return EventHandler;
}();
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
        var _events = source._events || (source._events = {});
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

            _on(_events, event.name, event.callback, target);
        }
    };

    EventMap.prototype.unsubscribe = function unsubscribe(target, source) {
        var _events = source._events;

        if (_events) {
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

                _off(_events, event.name, event.callback, target);
            }
        }
    };

    return EventMap;
}();

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

function on$2(self, name, callback, context) {
    var _events = self._events || (self._events = {});
    _on(_events, name, callback, context);
}
function off$2(self, name, callback, context) {
    var _events = self._events;

    _events && _off(_events, name, callback, context);
}
function trigger0$1(self, name) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        if (queue) _fireEvent0(queue);
        if (all) _fireEvent1(all, name);
    }
}

function trigger1$1(self, name, a) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        if (queue) _fireEvent1(queue, a);
        if (all) _fireEvent2(all, name, a);
    }
}

function trigger2$1(self, name, a, b) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        if (queue) _fireEvent2(queue, a, b);
        if (all) _fireEvent3(all, name, a, b);
    }
}

function trigger3$1(self, name, a, b, c) {
    var _events = self._events;

    if (_events) {
        var queue = _events[name];var all = _events.all;

        if (queue) _fireEvent3(queue, a, b, c);
        if (all) _fireEvent4(all, name, a, b, c);
    }
}

function _fireEvent0(events) {
    for (var _iterator5 = events, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
            if (_i5 >= _iterator5.length) break;
            _ref5 = _iterator5[_i5++];
        } else {
            _i5 = _iterator5.next();
            if (_i5.done) break;
            _ref5 = _i5.value;
        }

        var ev = _ref5;

        ev.callback.call(ev.ctx);
    }
}
function _fireEvent1(events, a) {
    for (var _iterator6 = events, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray6) {
            if (_i6 >= _iterator6.length) break;
            _ref6 = _iterator6[_i6++];
        } else {
            _i6 = _iterator6.next();
            if (_i6.done) break;
            _ref6 = _i6.value;
        }

        var ev = _ref6;

        ev.callback.call(ev.ctx, a);
    }
}
function _fireEvent2(events, a, b) {
    for (var _iterator7 = events, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray7) {
            if (_i7 >= _iterator7.length) break;
            _ref7 = _iterator7[_i7++];
        } else {
            _i7 = _iterator7.next();
            if (_i7.done) break;
            _ref7 = _i7.value;
        }

        var ev = _ref7;

        ev.callback.call(ev.ctx, a, b);
    }
}
function _fireEvent3(events, a, b, c) {
    for (var _iterator8 = events, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
            if (_i8 >= _iterator8.length) break;
            _ref8 = _iterator8[_i8++];
        } else {
            _i8 = _iterator8.next();
            if (_i8.done) break;
            _ref8 = _i8.value;
        }

        var ev = _ref8;

        ev.callback.call(ev.ctx, a, b, c);
    }
}
function _fireEvent4(events, a, b, c, d) {
    for (var _iterator9 = events, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray9) {
            if (_i9 >= _iterator9.length) break;
            _ref9 = _iterator9[_i9++];
        } else {
            _i9 = _iterator9.next();
            if (_i9.done) break;
            _ref9 = _i9.value;
        }

        var ev = _ref9;

        ev.callback.call(ev.ctx, a, b, c, d);
    }
}
function _on(_events, name, callback, context, ctx) {
    var events = _events[name],
        handler = new EventHandler$1(context, ctx || context, null, callback);
    if (events) {
        events.push(handler);
    } else {
        _events[name] = [handler];
    }
}

function _off(_events, name, callback, context) {
    var events = _events[name];
    if (events) {
        var retain = [];
        for (var _iterator10 = events, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
            var _ref10;

            if (_isArray10) {
                if (_i10 >= _iterator10.length) break;
                _ref10 = _iterator10[_i10++];
            } else {
                _i10 = _iterator10.next();
                if (_i10.done) break;
                _ref10 = _i10.value;
            }

            var ev = _ref10;

            if (callback && callback !== ev.callback || context !== ev.context) {
                retain.push(ev);
            }
        }
        _events[name] = retain.length ? retain : void 0;
    }
}

var _bubblingHandlers = {};
function getBubblingHandler(event) {
    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c) {
        switch (arguments.length) {
            case 0:
                trigger0$1(this, event);
                break;
            case 1:
                trigger1$1(this, event, a);
                break;
            case 2:
                trigger2$1(this, event, a, b);
                break;
            case 3:
                trigger3$1(this, event, a, b, c);
                break;
            default:
                var args = [event, a, b, c];
                for (var i = 3; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                this.trigger.apply(this, args);
        }
    });
}

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var define$1 = define;
var extendable$1 = extendable;var omit$2 = omit$1;
var once$2 = once$1;
var isEmpty$2 = isEmpty$1;
var keys$2 = keys$1;var EventHandler$$1 = EventHandler$1;
var trigger0$$1 = trigger0$1;
var trigger1$$1 = trigger1$1;
var trigger2$$1 = trigger2$1;
var trigger3$$1 = trigger3$1;

var eventSplitter$$1 = /\s+/;
var _idCount = 0;
function uniqueId() {
    return 'l' + _idCount++;
}
var Messenger_1 = function () {
    function Messenger() {
        classCallCheck(this, Messenger);

        this._events = void 0;
        this._listeners = void 0;
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }

    Messenger.define = function define$1(protoProps, staticProps) {
        var spec = omit$2(protoProps || {}, 'localEvents');
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

    Messenger.prototype.initialize = function initialize() {};

    Messenger.prototype.on = function on(name, callback, context) {
        return internalOn(this, name, callback, context);
    };

    Messenger.prototype.off = function off(name, callback, context) {
        if (!this._events) return this;
        this._events = eventsApi(offApi, this._events, name, callback, new OffOptions(context, this._listeners));
        return this;
    };

    Messenger.prototype.stopListening = function stopListening(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) return this;
        var ids = obj ? [obj.cid] : keys$2(listeningTo);
        for (var i = 0; i < ids.length; i++) {
            var listening = listeningTo[ids[i]];
            if (!listening) break;
            listening.obj.off(name, callback, this);
        }
        if (isEmpty$2(listeningTo)) this._listeningTo = void 0;
        return this;
    };

    Messenger.prototype.listenTo = function listenTo(obj, name, callback) {
        if (!obj) return this;
        var id = obj.cid || (obj.cid = uniqueId()),
            listeningTo = this._listeningTo || (this._listeningTo = {});
        var listening = listeningTo[id];
        if (!listening) {
            var thisId = this.cid || (this.cid = uniqueId());
            listening = listeningTo[id] = new ListeningTo(obj, id, thisId, listeningTo);
        }
        internalOn(obj, name, callback, this, listening);
        return this;
    };

    Messenger.prototype.once = function once$2(name, callback, context) {
        var events = eventsApi(onceMap, {}, name, callback, this.off.bind(this));
        return this.on(events, void 0, context);
    };

    Messenger.prototype.listenToOnce = function listenToOnce(obj, name, callback) {
        var events = eventsApi(onceMap, {}, name, callback, this.stopListening.bind(this, obj));
        return this.listenTo(obj, events);
    };

    Messenger.prototype.trigger = function trigger(name, a, b, c) {
        if (!this._events) return this;
        switch (arguments.length) {
            case 1:
                trigger0$$1(this, name);
                break;
            case 2:
                trigger1$$1(this, name, a);
                break;
            case 3:
                trigger2$$1(this, name, a, b);
                break;
            case 4:
                trigger3$$1(this, name, a, b, c);
                break;
            default:
                var allArgs = Array(arguments.length);
                for (var i = 0; i < allArgs.length; i++) {
                    allArgs[i] = arguments[i];
                }
                var _events = this._events;

                var queue = _events[name];
                if (queue) _fireEventAll(queue, allArgs.slice(1));
                if (queue = _events.all) _fireEventAll(queue, allArgs);
        }
        return this;
    };

    Messenger.prototype.dispose = function dispose() {
        this.stopListening();
        this.off();
    };

    return Messenger;
}();
var Messenger = Messenger_1;
Messenger = Messenger_1 = __decorate([extendable$1], Messenger);
var Events = omit$2(Messenger.prototype, 'constructor', 'initialize');
function eventsApi(iteratee$$1, events, name, callback, opts) {
    var i = 0,
        names = void 0;
    if (name && (typeof name === "undefined" ? "undefined" : _typeof(name)) === 'object') {
        if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
        for (names = keys$2(name); i < names.length; i++) {
            events = eventsApi(iteratee$$1, events, names[i], name[names[i]], opts);
        }
    } else if (name && eventSplitter$$1.test(name)) {
        for (names = name.split(eventSplitter$$1); i < names.length; i++) {
            events = iteratee$$1(events, names[i], callback, opts);
        }
    } else {
        events = iteratee$$1(events, name, callback, opts);
    }
    return events;
}


var ListeningTo = function ListeningTo(obj, objId, id, listeningTo) {
    classCallCheck(this, ListeningTo);

    this.obj = obj;
    this.objId = objId;
    this.id = id;
    this.listeningTo = listeningTo;
    this.count = 0;
};

function internalOn(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, new EventHandler$$1(context, obj, listening));
    if (listening) {
        var listeners = obj._listeners || (obj._listeners = {});
        listeners[listening.id] = listening;
    }
    return obj;
}

function onApi(events, name, callback, options) {
    if (callback) {
        var handlers = events[name],
            toAdd = [options.clone(callback)];
        events[name] = handlers ? handlers.concat(toAdd) : toAdd;
    }
    return events;
}


var OffOptions = function OffOptions(context, listeners) {
    classCallCheck(this, OffOptions);

    this.context = context;
    this.listeners = listeners;
};

function offApi(events, name, callback, options) {
    if (!events) return;
    var i = 0,
        listening = void 0;
    var context = options.context,
        listeners = options.listeners;
    if (!name && !callback && !context) {
        var ids = keys$2(listeners);
        for (; i < ids.length; i++) {
            listening = listeners[ids[i]];
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
        }
        return {};
    }
    var names = name ? [name] : keys$2(events);
    for (; i < names.length; i++) {
        name = names[i];
        var handlers = events[name];
        if (!handlers) break;
        var remaining = [];
        for (var j = 0; j < handlers.length; j++) {
            var handler = handlers[j];
            if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
                remaining.push(handler);
            } else {
                listening = handler.listening;
                if (listening && --listening.count === 0) {
                    delete listeners[listening.id];
                    delete listening.listeningTo[listening.objId];
                }
            }
        }
        if (remaining.length) {
            events[name] = remaining;
        } else {
            delete events[name];
        }
    }
    return events;
}

function onceMap(map, name, callback, offer) {
    if (callback) {
        (function () {
            var _once = map[name] = once$2(function () {
                offer(name, _once);
                callback.apply(this, arguments);
            });
            _once._callback = callback;
        })();
    }
    return map;
}

function _fireEventAll(events, a) {
    for (var _iterator = events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var ev = _ref;

        ev.callback.apply(ev.ctx, a);
    }
}

Object.extend = function (protoProps, staticProps) {
  return Mixable.extend(protoProps, staticProps);
};
Object.assign || (Object.assign = assign);
Object.log = log;

var ValidationError = function () {
    function ValidationError(obj) {
        classCallCheck(this, ValidationError);

        this.length = obj._validateNested(this.nested = {});
        if (this.error = obj.validate(obj)) {
            this.length++;
        }
    }

    ValidationError.prototype.each = function each(iteratee$$1) {
        var error = this.error;
        var nested = this.nested;

        if (error) iteratee$$1(error, null);
        for (var key in nested) {
            iteratee$$1(nested[key], key);
        }
    };

    ValidationError.prototype.eachError = function eachError(iteratee$$1, object) {
        this.each(function (value, key) {
            if (value instanceof ValidationError) {
                value.eachError(iteratee$$1, object.get(key));
            } else {
                iteratee$$1(value, key, object);
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
var trigger2$3 = trigger2$1;
var on$3 = on$2;
var off$3 = off$2;

var Transactional = function () {
    function Transactional(cid) {
        classCallCheck(this, Transactional);

        this._events = void 0;
        this._changeToken = {};
        this._transaction = false;
        this._isDirty = null;
        this._owner = void 0;
        this._ownerKey = void 0;
        this._validationError = void 0;
        this.cid = this.cidPrefix + cid;
    }

    Transactional.prototype.dispose = function dispose() {
        this._owner = void 0;
        this._ownerKey = void 0;
        this.off();
        this.stopListening();
        this._disposed = true;
    };

    Transactional.prototype.initialize = function initialize() {};

    Transactional.prototype.onChanges = function onChanges(handler, target) {
        on$3(this, this._changeEventName, handler, target);
    };

    Transactional.prototype.offChanges = function offChanges(handler, target) {
        off$3(this, this._changeEventName, handler, target);
    };

    Transactional.prototype.listenToChanges = function listenToChanges(target, handler) {
        this.listenTo(target, target._changeEventName, handler);
    };

    Transactional.prototype.transaction = function transaction(fun) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = transactionApi.begin(this);
        fun.call(this, this);
        isRoot && transactionApi.commit(this);
    };

    Transactional.prototype.updateEach = function updateEach(iteratee$$1, options) {
        var isRoot = transactionApi.begin(this);
        this.each(iteratee$$1);
        isRoot && transactionApi.commit(this);
    };

    Transactional.prototype.set = function set(values, options) {
        if (values) {
            var transaction = this._createTransaction(values, options);
            transaction && transaction.commit();
        }
        return this;
    };

    Transactional.prototype.parse = function parse(data, options) {
        return data;
    };

    Transactional.prototype.deepGet = function deepGet(reference) {
        return resolveReference(this, reference, function (object, key) {
            return object.get ? object.get(key) : object[key];
        });
    };

    Transactional.prototype.getOwner = function getOwner() {
        return this._owner;
    };

    Transactional.prototype.getStore = function getStore() {
        var _owner = this._owner;

        return _owner ? _owner.getStore() : this._defaultStore;
    };

    Transactional.prototype.map = function map(iteratee$$1, context) {
        var arr = [],
            fun = arguments.length === 2 ? function (v, k) {
            return iteratee$$1.call(context, v, k);
        } : iteratee$$1;
        this.each(function (val, key) {
            var result = fun(val, key);
            if (result !== void 0) arr.push(result);
        });
        return arr;
    };

    Transactional.prototype.mapObject = function mapObject(iteratee$$1, context) {
        var obj = {},
            fun = arguments.length === 2 ? function (v, k) {
            return iteratee$$1.call(context, v, k);
        } : iteratee$$1;
        this.each(function (val, key) {
            var result = iteratee$$1(val, key);
            if (result !== void 0) obj[key] = result;
        });
        return obj;
    };

    Transactional.prototype.keys = function keys() {
        return this.map(function (value, key) {
            if (value !== void 0) return key;
        });
    };

    Transactional.prototype.values = function values() {
        return this.map(function (value) {
            return value;
        });
    };

    Transactional.prototype.validate = function validate(obj) {};

    Transactional.prototype.getValidationError = function getValidationError(key) {
        var error = this.validationError;
        return (key ? error && error.nested[key] : error) || null;
    };

    Transactional.prototype.deepValidationError = function deepValidationError(reference) {
        return resolveReference(this, reference, function (object, key) {
            return object.getValidationError(key);
        });
    };

    Transactional.prototype.eachValidationError = function eachValidationError(iteratee$$1) {
        var validationError = this.validationError;

        validationError && validationError.eachError(iteratee$$1, this);
    };

    Transactional.prototype.isValid = function isValid(key) {
        return !this.getValidationError(key);
    };

    createClass(Transactional, [{
        key: "validationError",
        get: function get() {
            var error = this._validationError || (this._validationError = new ValidationError(this));
            return error.length ? error : null;
        }
    }]);
    return Transactional;
}();
Transactional = __decorate$2([mixins(Messenger), extendable], Transactional);
var transactionApi = {
    begin: function begin(object) {
        return object._transaction ? false : object._transaction = true;
    },
    markAsDirty: function markAsDirty(object, options) {
        var dirty = !options.silent;
        if (dirty) object._isDirty = options;
        object._changeToken = {};
        object._validationError = void 0;
        return dirty;
    },
    commit: function commit(object, isNested) {
        var originalOptions = object._isDirty;
        if (originalOptions) {
            while (object._isDirty) {
                var options = object._isDirty;
                object._isDirty = null;
                trigger2$3(object, object._changeEventName, object, options);
            }
            object._transaction = false;
            var _owner = object._owner;

            if (_owner && !isNested) {
                _owner._onChildrenChange(object, originalOptions);
            }
        } else {
            object._isDirty = null;
            object._transaction = false;
        }
    },
    aquire: function aquire(owner, child, key) {
        if (!child._owner) {
            child._owner = owner;
            child._ownerKey = key;
            return true;
        }
        return child._owner === owner;
    },
    free: function free(owner, child) {
        if (owner === child._owner) {
            child._owner = void 0;
            child._ownerKey = void 0;
        }
    }
};

var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var trigger3$3 = trigger3$1;var assign$4 = assign;
var isEmpty$3 = isEmpty$1;
var log$2 = log;var _commit = transactionApi.commit;var _begin = transactionApi.begin;var _markAsDirty = transactionApi.markAsDirty;
var _cidCounter = 0;
var Record_1 = function (_Transactional) {
    inherits(Record, _Transactional);

    function Record(a_values, a_options) {
        classCallCheck(this, Record);

        var _this = possibleConstructorReturn(this, _Transactional.call(this, _cidCounter++));

        _this.attributes = {};
        var options = a_options || {},
            values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
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

    Record.define = function define(protoProps, staticProps) {
        return Transactional.define(protoProps, staticProps);
    };

    Record.defaults = function defaults(attrs) {
        return this.extend({ attributes: attrs });
    };

    Record.prototype.previousAttributes = function previousAttributes() {
        return new this.Attributes(this._previousAttributes);
    };

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
        return key ? this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) : !isEmpty$3(this.changed);
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

    Record.prototype.getOwner = function getOwner() {
        var owner = this._owner;
        return this._ownerKey ? owner : owner && owner._owner;
    };

    Record.prototype.Attributes = function Attributes(x) {
        this.id = x.id;
    };

    Record.prototype.forEachAttr = function forEachAttr(attrs, iteratee$$1) {
        var _attributes = this._attributes;

        var unknown = void 0;
        for (var name in attrs) {
            var spec = _attributes[name];
            if (spec) {
                iteratee$$1(attrs[name], name, spec);
            } else {
                unknown || (unknown = []);
                unknown.push(name);
            }
        }
        if (unknown) {
            log$2.warn("[Record] Unknown attributes are ignored (" + unknown.join(', ') + "). Record:", _attributes, 'Attributes:', attrs);
        }
    };

    Record.prototype.each = function each(iteratee$$1, context) {
        var fun = arguments.length === 2 ? function (v, k) {
            return iteratee$$1.call(context, v, k);
        } : iteratee$$1;var attributes = this.attributes;
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

    Record.prototype._toJSON = function _toJSON() {
        return {};
    };

    Record.prototype._parse = function _parse(data) {
        return data;
    };

    Record.prototype.defaults = function defaults(values) {
        return {};
    };

    Record.prototype.initialize = function initialize(values, options) {};

    Record.prototype.clone = function clone() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var copy = new this.constructor(this.attributes, { clone: true });
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };

    Record.prototype.deepClone = function deepClone() {
        return this.clone();
    };

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

    Record.prototype.get = function get(key) {
        return this[key];
    };

    Record.prototype.toJSON = function toJSON() {
        var _this4 = this;

        var json = {};
        this.forEachAttr(this.attributes, function (value, key, _ref2) {
            var toJSON = _ref2.toJSON;

            if (toJSON && value !== void 0) {
                var asJson = toJSON.call(_this4, value, key);
                if (asJson !== void 0) json[key] = asJson;
            }
        });
        return json;
    };

    Record.prototype.parse = function parse(data, options) {
        return this._parse(data);
    };

    Record.prototype.set = function set(a, b, c) {
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

        this.transaction(function () {
            var path = name.split('.'),
                l = path.length - 1,
                attr = path[l];
            var model = _this5;
            for (var i = 0; i < l; i++) {
                var key = path[i];
                var next = model.get ? model.get(key) : model[key];
                if (!next) {
                    var attrSpecs = model._attributes;
                    if (attrSpecs) {
                        var newModel = attrSpecs[key].create();
                        if (options && options.nullify && newModel._attributes) {
                            newModel.clear(options);
                        }
                        model[key] = next = newModel;
                    } else return;
                }
                model = next;
            }
            if (model.set) {
                model.set(attr, value, options);
            } else {
                model[attr] = value;
            }
        });
        return this;
    };

    Record.prototype.transaction = function transaction(fun) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = begin$2(this);
        fun.call(this, this);
        isRoot && _commit(this);
    };

    Record.prototype._createTransaction = function _createTransaction(a_values) {
        var _this6 = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var isRoot = begin$2(this);var changes = [];var nested = [];var attributes = this.attributes;var values = options.parse ? this.parse(a_values, options) : a_values;
        if (Object.getPrototypeOf(values) === Object.prototype) {
            this.forEachAttr(values, function (value, key, attr) {
                var prev = attributes[key];
                var update = void 0;
                if (update = attr.canBeUpdated(prev, value, options)) {
                    var nestedTransaction = prev._createTransaction(update, options);
                    if (nestedTransaction && attr.propagateChanges) {
                        nested.push(nestedTransaction);
                        changes.push(key);
                    }
                    return;
                }
                var next = attr.transform(value, options, prev, _this6);
                attributes[key] = next;
                if (attr.isChanged(next, prev)) {
                    changes.push(key);
                    attr.handleChange(next, prev, _this6);
                }
            });
        } else {
            log$2.error('[Type Error]', this, 'Record update rejected (', values, '). Incompatible type.');
        }
        if ((nested.length || changes.length) && markAsDirty$2(this, options)) {
            return new RecordTransaction(this, isRoot, nested, changes);
        }
        isRoot && _commit(this);
    };

    Record.prototype._onChildrenChange = function _onChildrenChange(child, options) {
        var _ownerKey = child._ownerKey;var attribute = this._attributes[_ownerKey];
        if (!attribute || attribute.propagateChanges) this.forceAttributeChange(_ownerKey, options);
    };

    Record.prototype.forceAttributeChange = function forceAttributeChange(key) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = begin$2(this);
        if (markAsDirty$2(this, options)) {
            trigger3$3(this, 'change:' + key, this, this.attributes[key], options);
        }
        isRoot && _commit(this);
    };

    Record.prototype.dispose = function dispose() {
        var _this7 = this;

        this.forEachAttr(this.attributes, function (value, key) {
            if (value && _this7 === value._owner) {
                value.dispose();
            }
        });
        _Transactional.prototype.dispose.call(this);
    };

    createClass(Record, [{
        key: "_state",
        get: function get() {
            return this.attributes;
        }
    }, {
        key: "changed",
        get: function get() {
            var changed = this._changedAttributes;
            if (!changed) {
                var prev = this._previousAttributes;
                changed = {};
                var _attributes = this._attributes;
                var attributes = this.attributes;

                for (var _iterator2 = this._keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref3 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref3 = _i2.value;
                    }

                    var key = _ref3;

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
        get: function get() {
            return this.attributes[this.idAttribute];
        },
        set: function set(x) {
            setAttribute(this, this.idAttribute, x);
        }
    }, {
        key: "collection",
        get: function get() {
            return this._ownerKey ? null : this._owner;
        }
    }]);
    return Record;
}(Transactional);
var Record = Record_1;
Record = Record_1 = __decorate$3([define({
    cidPrefix: 'm',
    _changeEventName: 'change',
    idAttribute: 'id',
    _keys: ['id']
})], Record);

function begin$2(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.Attributes(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
function markAsDirty$2(record, options) {
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
function cloneAttributes(record, a_attributes) {
    var attributes = new record.Attributes(a_attributes);
    record.forEachAttr(attributes, function (value, name, attr) {
        attributes[name] = attr.clone(value);
    });
    return attributes;
}
function setAttribute(record, name, value) {
    var isRoot = begin$2(record);var options = {};var attributes = record.attributes;var spec = record._attributes[name];var prev = attributes[name];
    var update = void 0;
    if (update = spec.canBeUpdated(prev, value, options)) {
        var nestedTransaction = prev._createTransaction(update, options);
        if (nestedTransaction && spec.propagateChanges) {
            nestedTransaction.commit(true);
            markAsDirty$2(record, options);
            trigger3$3(record, 'change:' + name, record, prev, options);
        }
    } else {
        var next = spec.transform(value, options, prev, record);
        attributes[name] = next;
        if (spec.isChanged(next, prev)) {
            spec.handleChange(next, prev, record);
            markAsDirty$2(record, options);
            trigger3$3(record, 'change:' + name, record, next, options);
        }
    }
    isRoot && _commit(record);
}

var RecordTransaction = function () {
    function RecordTransaction(object, isRoot, nested, changes) {
        classCallCheck(this, RecordTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.nested = nested;
        this.changes = changes;
    }

    RecordTransaction.prototype.commit = function commit(isNested) {
        var nested = this.nested;
        var object = this.object;
        var changes = this.changes;

        for (var _iterator3 = nested, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref4 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref4 = _i3.value;
            }

            var transaction = _ref4;

            transaction.commit(true);
        }
        var attributes = object.attributes;
        var _isDirty = object._isDirty;

        for (var _iterator4 = changes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref5 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref5 = _i4.value;
            }

            var key = _ref5;

            trigger3$3(object, 'change:' + key, object, attributes[key], _isDirty);
        }
        this.isRoot && _commit(object, isNested);
    };

    return RecordTransaction;
}();

var notEqual$1 = notEqual;
var assign$5 = assign;

var GenericAttribute = function () {
    function GenericAttribute(name, a_options) {
        classCallCheck(this, GenericAttribute);

        this.name = name;
        this.getHook = null;
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
        this.propagateChanges = changeEvents !== false;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        transforms.unshift(this.convert);
        if (this.get) getHooks.unshift(this.get);
        this.initialize.call(this, options);
        if (getHooks.length) {
            this.getHook = getHooks.reduce(chainGetHooks);
        }
        if (transforms.length) {
            this.transform = transforms.reduce(chainTransforms);
        }
        if (changeHandlers.length) {
            this.handleChange = changeHandlers.reduce(chainChangeHandlers);
        }
    }

    GenericAttribute.create = function create(options, name) {
        var type = options.type,
            AttributeCtor = options._attribute || (type ? type._attribute : GenericAttribute);
        return new AttributeCtor(name, options);
    };

    GenericAttribute.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {};

    GenericAttribute.prototype.transform = function transform(value, options, prev, model) {
        return value;
    };

    GenericAttribute.prototype.convert = function convert(value, options, prev, model) {
        return value;
    };

    GenericAttribute.prototype.isChanged = function isChanged(a, b) {
        return notEqual$1(a, b);
    };

    GenericAttribute.prototype.handleChange = function handleChange(next, prev, model) {};

    GenericAttribute.prototype.create = function create() {
        return new this.type();
    };

    GenericAttribute.prototype.clone = function clone(value) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            if (value.clone) return value.clone();
            var proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return JSON.parse(JSON.stringify(value));
            }
        }
        return value;
    };

    GenericAttribute.prototype.validate = function validate(record, value, key) {};

    GenericAttribute.prototype.toJSON = function toJSON(value, key) {
        return value && value.toJSON ? value.toJSON() : value;
    };

    GenericAttribute.prototype.createPropertyDescriptor = function createPropertyDescriptor() {
        var name = this.name;
        var getHook = this.getHook;

        if (name !== 'id') {
            return {
                set: function set(value) {
                    setAttribute(this, name, value);
                },

                get: getHook ? function () {
                    return getHook.call(this, this.attributes[name], name);
                } : function () {
                    return this.attributes[name];
                }
            };
        }
    };

    GenericAttribute.prototype.initialize = function initialize(name, options) {};

    return GenericAttribute;
}();
Record.prototype._attributes = { id: GenericAttribute.create({ value: void 0 }, 'id') };
Record.prototype.defaults = function () {
    var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return { id: attrs.id };
};
function chainChangeHandlers(prevHandler, nextHandler) {
    return function (next, prev, model) {
        prevHandler.call(this, next, prev, model);
        nextHandler.call(this, next, prev, model);
    };
}
function chainGetHooks(prevHook, nextHook) {
    return function (value, name) {
        return nextHook.call(prevHook.call(value, name), name);
    };
}
function chainTransforms(prevTransform, nextTransform) {
    return function (value, options, prev, model) {
        return nextTransform.call(this, prevTransform.call(this, value, options, prev, model), options, prev, model);
    };
}

var free$2 = transactionApi.free;
var aquire$2 = transactionApi.aquire;

var TransactionalType = function (_GenericAttribute) {
    inherits(TransactionalType, _GenericAttribute);

    function TransactionalType() {
        classCallCheck(this, TransactionalType);
        return possibleConstructorReturn(this, _GenericAttribute.apply(this, arguments));
    }

    TransactionalType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge) return next._state;
            } else {
                return next;
            }
        }
    };

    TransactionalType.prototype.convert = function convert(value, options, prev, record) {
        if (value == null) return value;
        if (value instanceof this.type) {
            if (value._shared === 1) {
                log.warn('[Record] Aggregated attribute "' + this.name + ' : ' + (this.type.name || 'Collection') + '" is assigned with shared collection type.', value, record._attributes);
            }
            return options.merge ? value.clone() : value;
        }
        return this.type.create(value, options);
    };

    TransactionalType.prototype.validate = function validate(record, value) {
        var error = value && value.validationError;
        if (error) return error;
    };

    TransactionalType.prototype.create = function create() {
        return new this.type();
    };

    TransactionalType.prototype.initialize = function initialize(options) {
        options.changeHandlers.unshift(this._handleChange);
    };

    TransactionalType.prototype._handleChange = function _handleChange(next, prev, record) {
        prev && free$2(record, prev);
        if (next && !aquire$2(record, next, this.name)) {
            log.warn('[Record] aggregated \'' + this.name + '\' attribute value already has an owner.', next, record._attributes);
        }
    };

    return TransactionalType;
}(GenericAttribute);
Record._attribute = TransactionalType;

var DateType = function (_GenericAttribute) {
    inherits(DateType, _GenericAttribute);

    function DateType() {
        classCallCheck(this, DateType);
        return possibleConstructorReturn(this, _GenericAttribute.apply(this, arguments));
    }

    DateType.prototype.convert = function convert(value) {
        if (value == null || value instanceof Date) return value;
        var date = new Date(value);
        if (isNaN(+date)) logInvalidDate(this, value, arguments[3]);
        return date;
    };

    DateType.prototype.validate = function validate(model, value, name) {
        if (value != null && isNaN(+value)) return name + ' is Invalid Date';
    };

    DateType.prototype.toJSON = function toJSON(value) {
        return value && value.toISOString();
    };

    DateType.prototype.isChanged = function isChanged(a, b) {
        return (a && +a) !== (b && +b);
    };

    DateType.prototype.clone = function clone(value) {
        return value && new Date(+value);
    };

    return DateType;
}(GenericAttribute);
function logInvalidDate(attribute, value, record) {
    log.warn('[Invalid Date] in ' + (record.constructor.name || 'Model') + '.' + attribute.name + ' attribute.', value, record);
}
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
        for (var i = 0, k; k = numericKeys[i]; ++i) {
            struct[k] = +struct[k] || 0;
        }
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

var ConstructorType = function (_GenericAttribute) {
    inherits(ConstructorType, _GenericAttribute);

    function ConstructorType() {
        classCallCheck(this, ConstructorType);
        return possibleConstructorReturn(this, _GenericAttribute.apply(this, arguments));
    }

    ConstructorType.prototype.convert = function convert(value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };

    ConstructorType.prototype.clone = function clone(value) {
        return value.clone ? value.clone() : this.convert(JSON.parse(JSON.stringify(value)));
    };

    return ConstructorType;
}(GenericAttribute);

Function.prototype._attribute = ConstructorType;
var PrimitiveType = function (_GenericAttribute2) {
    inherits(PrimitiveType, _GenericAttribute2);

    function PrimitiveType() {
        classCallCheck(this, PrimitiveType);
        return possibleConstructorReturn(this, _GenericAttribute2.apply(this, arguments));
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
}(GenericAttribute);
Boolean._attribute = String._attribute = PrimitiveType;
var NumericType = function (_PrimitiveType) {
    inherits(NumericType, _PrimitiveType);

    function NumericType() {
        classCallCheck(this, NumericType);
        return possibleConstructorReturn(this, _PrimitiveType.apply(this, arguments));
    }

    NumericType.prototype.convert = function convert(value) {
        var num = value == null ? value : this.type(value);
        if (num !== num) logInvalidNumber(this, value, arguments[3]);
        return num;
    };

    NumericType.prototype.validate = function validate(model, value, name) {
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };

    return NumericType;
}(PrimitiveType);
function logInvalidNumber(attribute, value, record) {
    log.warn('[Invalid Number] in ' + (record.constructor.name || 'Model') + '.' + attribute.name + ' attribute.', value, record);
}
Number._attribute = NumericType;
var ArrayType = function (_GenericAttribute3) {
    inherits(ArrayType, _GenericAttribute3);

    function ArrayType() {
        classCallCheck(this, ArrayType);
        return possibleConstructorReturn(this, _GenericAttribute3.apply(this, arguments));
    }

    ArrayType.prototype.toJSON = function toJSON(value) {
        return value;
    };

    ArrayType.prototype.convert = function convert(value) {
        if (value == null || Array.isArray(value)) return value;
        return [];
    };

    return ArrayType;
}(GenericAttribute);
Array._attribute = ArrayType;

var on$4 = on$2;
var off$4 = off$2;var SharedRecordType = function (_GenericAttribute) {
    inherits(SharedRecordType, _GenericAttribute);

    function SharedRecordType() {
        classCallCheck(this, SharedRecordType);
        return possibleConstructorReturn(this, _GenericAttribute.apply(this, arguments));
    }

    SharedRecordType.prototype.clone = function clone(value) {
        return value;
    };

    SharedRecordType.prototype.canBeUpdated = function canBeUpdated(prev, next) {};

    SharedRecordType.prototype.convert = function convert(value, options, prev, record) {
        return value == null || value instanceof this.type ? value : this.type.create(value, options);
    };

    SharedRecordType.prototype.validate = function validate(model, value, name) {};

    SharedRecordType.prototype.create = function create() {
        return null;
    };

    SharedRecordType.prototype._handleChange = function _handleChange(next, prev, record) {
        prev && off$4(prev, prev._changeEventName, this._onChange, record);
        next && on$4(next, next._changeEventName, this._onChange, record);
    };

    SharedRecordType.prototype.initialize = function initialize(options) {
        var _this2 = this;

        this.toJSON = null;
        if (this.propagateChanges) {
            (function () {
                var attribute = _this2;
                _this2._onChange = function (child, options) {
                    this.forceAttributeChange(attribute.name, options);
                };
                options.changeHandlers.unshift(_this2._handleChange);
            })();
        }
    };

    return SharedRecordType;
}(GenericAttribute);

var assign$6 = assign;

var ChainableAttributeSpec = function () {
    function ChainableAttributeSpec() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        classCallCheck(this, ChainableAttributeSpec);

        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        assign$6(this.options, options);
    }

    ChainableAttributeSpec.prototype.check = function check(_check, error) {
        function validate(model, value, name) {
            if (!_check.call(model, value, name)) {
                return error || _check.error || name + ' is not valid';
            }
        }
        var prev = this.options.validate;
        this.options.validate = prev ? function (model, value, name) {
            return prev(model, value, name) || validate(model, value, name);
        } : validate;
        return this;
    };

    ChainableAttributeSpec.prototype.watcher = function watcher(ref) {
        this.options._onChange = ref;
        return this;
    };

    ChainableAttributeSpec.prototype.parse = function parse(fun) {
        this.options.parse = fun;
        return this;
    };

    ChainableAttributeSpec.prototype.toJSON = function toJSON(fun) {
        this.options.toJSON = fun || null;
        return this;
    };

    ChainableAttributeSpec.prototype.get = function get(fun) {
        this.options.getHooks.push(fun);
        return this;
    };

    ChainableAttributeSpec.prototype.set = function set(fun) {
        this.options.transforms.push(function (next, options, prev, model) {
            if (this.isChanged(next, prev)) {
                var changed = fun.call(model, next, this.name);
                return changed === void 0 ? prev : this.convert(changed, options, prev, model);
            }
            return prev;
        });
        return this;
    };

    ChainableAttributeSpec.prototype.changeEvents = function changeEvents(events) {
        this.options.changeEvents = events;
        return this;
    };

    ChainableAttributeSpec.prototype.events = function events(map) {
        var eventMap = new EventMap(map);
        this.options.changeHandlers.push(function (next, prev, record) {
            prev && prev.trigger && eventMap.unsubscribe(record, prev);
            next && next.trigger && eventMap.subscribe(record, next);
        });
        return this;
    };

    ChainableAttributeSpec.prototype.value = function value(x) {
        this.options.value = x;
        return this;
    };

    createClass(ChainableAttributeSpec, [{
        key: 'has',
        get: function get() {
            return this;
        }
    }]);
    return ChainableAttributeSpec;
}();

Function.prototype.value = function (x) {
    return new ChainableAttributeSpec({ type: this, value: x });
};
function toAttributeDescriptor(spec) {
    var attrSpec = void 0;
    if (typeof spec === 'function') {
        attrSpec = new ChainableAttributeSpec({ type: spec });
    } else if (spec && spec instanceof ChainableAttributeSpec) {
        attrSpec = spec;
    } else {
        var type = inferType(spec);
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

var defaults$5 = defaults$1;
var isValidJSON$1 = isValidJSON;
var transform$2 = transform$1;
var log$3 = log;var EventMap$1 = EventMap;

function compile(rawSpecs, baseAttributes) {
    var myAttributes = transform$2({}, rawSpecs, createAttribute),
        allAttributes = defaults$5({}, myAttributes, baseAttributes),
        Attributes = createCloneCtor(allAttributes),
        mixin = {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: transform$2({}, myAttributes, function (x) {
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
    if (!log$3.level) {
        mixin.forEachAttr = createForEach(allAttributes);
    }
    return mixin;
}
function createAttribute(spec, name) {
    return GenericAttribute.create(toAttributeDescriptor(spec), name);
}
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
function wrapWatcher(watcher, key) {
    return function (record, value) {
        watcher.call(record, value, key);
    };
}
function createWatcherFromRef(ref, key) {
    var _ref = new CompiledReference(ref, true);

    var local = _ref.local;
    var resolve = _ref.resolve;
    var tail$$1 = _ref.tail;

    return local ? function (record, value) {
        record[tail$$1](value, key);
    } : function (record, value) {
        resolve(record)[tail$$1](value, key);
    };
}
function createForEach(attrSpecs) {
    var statements = ['var v, _a=this._attributes;'];
    for (var name in attrSpecs) {
        statements.push('( v = a.' + name + ' ) === void 0 || f( v, "' + name + '", _a.' + name + ' );');
    }
    return new Function('a', 'f', statements.join(''));
}
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (var name in attrSpecs) {
        statements.push('this.' + name + ' = x.' + name + ';');
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
function createDefaults(attrSpecs) {
    var assign_f = ['var v;'],
        create_f = [];
    function appendExpr(name, expr) {
        assign_f.push('this.' + name + ' = ( v = a.' + name + ' ) === void 0 ? ' + expr + ' : v;');
        create_f.push('this.' + name + ' = ' + expr + ';');
    }
    for (var name in attrSpecs) {
        var attrSpec = attrSpecs[name];var value = attrSpec.value;
        var type = attrSpec.type;

        if (value === void 0 && type) {
            appendExpr(name, 'i.' + name + '.create()');
        } else {
            if (isValidJSON$1(value)) {
                appendExpr(name, JSON.stringify(value));
            } else if (value === void 0) {
                appendExpr(name, 'void 0');
            } else {
                appendExpr(name, 'i.' + name + '.value');
            }
        }
    }
    var CreateDefaults = new Function('i', create_f.join('')),
        AssignDefaults = new Function('a', 'i', assign_f.join(''));
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'],
        create = false;
    for (var name in allAttrSpecs) {
        var local = attrSpecs[name];
        if (local && local.parse) create = true;
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
var defaults$4 = defaults$1;
var omit$4 = omit$1;
var getBaseClass$1 = getBaseClass;

Record.define = function () {
    var protoProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var staticProps = arguments[1];

    var BaseConstructor = getBaseClass$1(this),
        baseProto = BaseConstructor.prototype,
        staticsDefinition = getChangedStatics(this, 'attributes', 'collection', 'Collection'),
        definition = assign$3(staticsDefinition, protoProps);
    if ('Collection' in this && this.Collection === void 0) {
        log.error('[Model.define] Model.Collection is undefined. It must be defined _before_ the model.', definition);
    }
    var dynamicMixin = compile(getAttributes(definition), baseProto._attributes);
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    assign$3(dynamicMixin.properties, protoProps.properties || {});
    defaults$4(dynamicMixin, omit$4(definition, 'attributes', 'collection'));
    Mixable.define.call(this, dynamicMixin, staticProps);
    defineCollection.call(this, definition.collection || definition.Collection);
    return this;
};
Record.predefine = function () {
    Transactional.predefine.call(this);
    this.Collection = getBaseClass$1(this).Collection.extend();
    this.Collection.prototype.model = this;
    createSharedTypeSpec(this, SharedRecordType);
    return this;
};
Record._attribute = TransactionalType;
createSharedTypeSpec(Record, SharedRecordType);
function getAttributes(_ref) {
    var defaults = _ref.defaults;
    var attributes = _ref.attributes;
    var idAttribute = _ref.idAttribute;

    var definition = typeof defaults === 'function' ? defaults() : attributes || defaults || {};
    if (idAttribute && !(idAttribute in definition)) {
        definition[idAttribute] = void 0;
    }
    return definition;
}
function defineCollection(collection) {
    if (typeof collection === 'function') {
        this.Collection = collection;
        this.Collection.prototype.model = this;
    } else {
        this.Collection.define(collection || {});
    }
}
Number.integer = function (x) {
    return x ? Math.round(x) : 0;
};
Number.integer._attribute = NumericType;
if (typeof window !== 'undefined') {
    window.Integer = Number.integer;
}
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
var on$5 = on$2;
var off$5 = off$2;var _commit$1 = transactionApi.commit;
var _aquire = transactionApi.aquire;var _free = transactionApi.free;
function dispose$1(collection) {
    var models = collection.models;
    collection.models = [];
    collection._byId = {};
    freeAll(collection, models);
    return models;
}
function convertAndAquire(collection, attrs, options) {
    var model = collection.model;

    var record = void 0;
    if (collection._shared) {
        record = attrs instanceof model ? attrs : model.create(attrs, options);
        if (collection._shared === 1) {
            on$5(record, record._changeEventName, collection._onChildrenChange, collection);
        }
    } else {
        record = attrs instanceof model ? options.merge ? attrs.clone() : attrs : model.create(attrs, options);
        if (!_aquire(collection, record)) {
            var errors = collection._aggregationError || (collection._aggregationError = []);
            errors.push(record);
        }
    }
    var _itemEvents = collection._itemEvents;

    _itemEvents && _itemEvents.subscribe(collection, record);
    return record;
}
function free$4(owner, child) {
    if (owner._shared) {
        if (owner._shared === 1) {
            off$5(child, child._changeEventName, owner._onChildrenChange, owner);
        }
    } else {
        _free(owner, child);
    }
    var _itemEvents = owner._itemEvents;

    _itemEvents && _itemEvents.unsubscribe(owner, child);
}
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

        free$4(collection, child);
    }
    return children;
}
function sortElements(collection, options) {
    var _comparator = collection._comparator;

    if (_comparator && options.sort !== false) {
        collection.models.sort(_comparator);
        return true;
    }
    return false;
}
function addIndex(index, model) {
    index[model.cid] = model;
    var id = model.id;
    if (id != null) {
        index[id] = model;
    }
}
function removeIndex(index, model) {
    delete index[model.cid];
    var id = model.id;
    if (id != null) {
        delete index[id];
    }
}
var CollectionTransaction = function () {
    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
        classCallCheck(this, CollectionTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.added = added;
        this.removed = removed;
        this.nested = nested;
        this.sorted = sorted;
    }

    CollectionTransaction.prototype.commit = function commit(isNested) {
        var nested = this.nested;
        var object = this.object;var _isDirty = object._isDirty;

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

            transaction.commit(true);
        }
        if (object._aggregationError) {
            logAggregationError(object);
        }
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
        var added = this.added;
        var removed = this.removed;

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
        this.isRoot && _commit$1(object, isNested);
    };

    return CollectionTransaction;
}();
function logAggregationError(collection) {
    log.warn('[Collection] Added records which already has an owner:', collection._aggregationError, collection);
    collection._aggregationError = void 0;
}

var begin$3 = transactionApi.begin;
var commit$2 = transactionApi.commit;
var markAsDirty$4 = transactionApi.markAsDirty;

function addTransaction(collection, items, options, merge) {
    var isRoot = begin$3(collection),
        nested = [];
    var added = appendElements(collection, items, nested, options, merge);
    if (added.length || nested.length) {
        var needSort = sortOrMoveElements(collection, added, options);
        if (markAsDirty$4(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, [], nested, needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$2(collection);
}

function sortOrMoveElements(collection, added, options) {
    var at = options.at;
    if (at != null) {
        var length = collection.models.length - added.length;
        at = Number(at);
        if (at < 0) at += length + 1;
        if (at < 0) at = 0;
        if (at > length) at = length;
        moveElements(collection.models, at, added);
        return false;
    }
    return sortElements(collection, options);
}
function moveElements(source, at, added) {
    for (var j = source.length - 1, i = j - added.length; i >= at; i--, j--) {
        source[j] = source[i];
    }
    for (i = 0, j = at; i < added.length; i++, j++) {
        source[j] = added[i];
    }
}
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
            }
        } else {
            model = convertAndAquire(collection, item, a_options);
            models.push(model);
            addIndex(_byId, model);
        }
    }
    return models.slice(prevLength);
}

var begin$4 = transactionApi.begin;
var commit$3 = transactionApi.commit;
var markAsDirty$5 = transactionApi.markAsDirty;

var silentOptions$1 = { silent: true };
function emptySetTransaction(collection, items, options, silent) {
    var isRoot = begin$4(collection);
    var added = _reallocateEmpty(collection, items, options);
    if (added.length) {
        var needSort = sortElements(collection, options);
        if (markAsDirty$5(collection, silent ? silentOptions$1 : options)) {
            return new CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$3(collection);
}

function setTransaction(collection, items, options) {
    var isRoot = begin$4(collection),
        nested = [];
    var previous = collection.models,
        added = _reallocate(collection, items, nested, options);
    var reusedCount = collection.models.length - added.length,
        removed = reusedCount < previous.length ? reusedCount ? _garbageCollect(collection, previous) : freeAll(collection, previous) : [];
    var addedOrChanged = nested.length || added.length,
        sorted = addedOrChanged && sortElements(collection, options) || added.length || options.sorted;
    if (addedOrChanged || removed.length || sorted) {
        if (markAsDirty$5(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$3(collection);
}

function _garbageCollect(collection, previous) {
    var _byId = collection._byId;var removed = [];
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
            free$4(collection, record);
        }
    }
    return removed;
}
function _reallocate(collection, source, nested, options) {
    var models = Array(source.length),
        _byId = {},
        merge = (options.merge == null ? true : options.merge) && !collection._shared,
        _prevById = collection._byId,
        prevModels = collection.models,
        idAttribute = collection.model.prototype.idAttribute,
        toAdd = [],
        orderKept = true;
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

var trigger2$5 = trigger2$1;
var trigger3$5 = trigger3$1;var markAsDirty$6 = transactionApi.markAsDirty;
var begin$5 = transactionApi.begin;
var commit$4 = transactionApi.commit;

function removeOne(collection, el, options) {
    var model = collection.get(el);
    if (model) {
        var isRoot = begin$5(collection),
            models = collection.models;
        models.splice(models.indexOf(model), 1);
        removeIndex(collection._byId, model);
        var notify = markAsDirty$6(collection, options);
        if (notify) {
            trigger3$5(model, 'remove', model, collection, options);
            trigger3$5(collection, 'remove', model, collection, options);
        }
        free$4(collection, model);
        notify && trigger2$5(collection, 'update', collection, options);
        isRoot && commit$4(collection);
        return model;
    }
}

function removeMany(collection, toRemove, options) {
    var removed = _removeFromIndex(collection, toRemove);
    if (removed.length) {
        var isRoot = begin$5(collection);
        _reallocate$1(collection, removed.length);
        if (markAsDirty$6(collection, options)) {
            var transaction = new CollectionTransaction(collection, isRoot, [], removed, [], false);
            transaction.commit();
        } else {
            isRoot && commit$4(collection);
        }
    }
    return removed;
}

function _removeFromIndex(collection, toRemove) {
    var removed = Array(toRemove.length),
        _byId = collection._byId;
    for (var i = 0, j = 0; i < toRemove.length; i++) {
        var model = collection.get(toRemove[i]);
        if (model) {
            removed[j++] = model;
            removeIndex(_byId, model);
            free$4(collection, model);
        }
    }
    removed.length = j;
    return removed;
}
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
var trigger2$2 = trigger2$1;var begin$1 = transactionApi.begin;
var commit$1 = transactionApi.commit;
var markAsDirty$1 = transactionApi.markAsDirty;var omit$3 = omit$1;
var log$1 = log;
var assign$1 = assign;
var defaults$3 = defaults$1;

var _count = 0;
var Collection_1 = function (_Transactional) {
    inherits(Collection, _Transactional);

    function Collection(records) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var shared = arguments[2];
        classCallCheck(this, Collection);

        var _this = possibleConstructorReturn(this, _Transactional.call(this, _count++));

        _this.models = [];
        _this._byId = {};
        _this.comparator = _this.comparator;
        if (options.comparator !== void 0) {
            _this.comparator = options.comparator;
            options.comparator = void 0;
        }
        _this.model = _this.model;
        if (options.model) {
            _this.model = options.model;
            options.model = void 0;
        }
        _this.idAttribute = _this.model.prototype.idAttribute;
        _this._shared = shared || 0;
        if (records) {
            var elements = toElements(_this, records, options);
            emptySetTransaction(_this, elements, options, true);
        }
        _this.initialize.apply(_this, arguments);
        if (_this._localEvents) _this._localEvents.subscribe(_this, _this);
        return _this;
    }

    Collection.prototype.createSubset = function createSubset(models, options) {
        var SubsetOf = this.constructor.subsetOf(this).options.type,
            subset = new SubsetOf(models, options);
        subset.resolve(this);
        return subset;
    };

    Collection.predefine = function predefine() {
        var Ctor = this;
        this._SubsetOf = null;
        function Subset(a, b, listen) {
            Ctor.call(this, a, b, listen ? 1 : 2);
        }
        Mixable.mixTo(Subset);
        Subset.prototype = this.prototype;
        Subset._attribute = TransactionalType;
        Subset['of'] = function (path) {
            return Ctor.subsetOf(path);
        };
        this.Set = this.Subset = Subset;
        Transactional.predefine.call(this);
        createSharedTypeSpec(this, SharedCollectionType);
        return this;
    };

    Collection.define = function define() {
        var protoProps = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var staticProps = arguments[1];

        var staticsDefinition = getChangedStatics(this, 'model', 'itemEvents'),
            definition = assign$1(staticsDefinition, protoProps);
        var spec = omit$3(definition, 'itemEvents');
        if (definition.itemEvents) {
            var eventsMap = new EventMap(this.prototype._itemEvents);
            eventsMap.addEventsMap(definition.itemEvents);
            spec._itemEvents = eventsMap;
        }
        return Transactional.define.call(this, spec, staticProps);
    };

    Collection.prototype.getStore = function getStore() {
        return this._store || (this._store = this._owner ? this._owner.getStore() : this._defaultStore);
    };

    Collection.prototype._onChildrenChange = function _onChildrenChange(record) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var isRoot = begin$1(this);var idAttribute = this.idAttribute;

        if (record.hasChanged(idAttribute)) {
            var _byId = this._byId;

            delete _byId[record.previous(idAttribute)];
            var id = record.id;

            id == null || (_byId[id] = record);
        }
        if (markAsDirty$1(this, options)) {
            trigger2$2(this, 'change', record, options);
        }
        isRoot && commit$1(this);
    };

    Collection.prototype.get = function get(objOrId) {
        if (objOrId == null) return;
        if ((typeof objOrId === "undefined" ? "undefined" : _typeof(objOrId)) === 'object') {
            var id = objOrId[this.idAttribute];
            return id !== void 0 && this._byId[id] || this._byId[objOrId.cid];
        } else {
            return this._byId[objOrId];
        }
    };

    Collection.prototype.each = function each(iteratee$$1, context) {
        var fun = arguments.length === 2 ? function (v, k) {
            return iteratee$$1.call(context, v, k);
        } : iteratee$$1;var models = this.models;

        for (var i = 0; i < models.length; i++) {
            fun(models[i], i);
        }
    };

    Collection.prototype._validateNested = function _validateNested(errors) {
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

    Collection.prototype.clone = function clone() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var models = this.map(function (model) {
            return model.clone();
        }),
            copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };

    Collection.prototype.toJSON = function toJSON() {
        if (!this._shared) {
            return this.models.map(function (model) {
                return model.toJSON();
            });
        }
    };

    Collection.prototype.set = function set() {
        var elements = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (options.add !== void 0) {
            log$1.error("Collection.set doesn't support 'add' option, behaving as if options.add === true.");
        }
        if (options.reset) {
            this.reset(elements, options);
        } else {
            var transaction = this._createTransaction(elements, options);
            transaction && transaction.commit();
        }
        return this;
    };

    Collection.prototype.dispose = function dispose$1() {
        if (!this._shared) {
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

                if (record._owner === this) record.dispose();
            }
        }
        _Transactional.prototype.dispose.call(this);
    };

    Collection.prototype.reset = function reset(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var isRoot = begin$1(this),
            previousModels = dispose$1(this);
        if (a_elements) {
            emptySetTransaction(this, toElements(this, a_elements, options), options, true);
        }
        markAsDirty$1(this, options);
        options.silent || trigger2$2(this, 'reset', this, defaults$3({ previousModels: previousModels }, options));
        isRoot && commit$1(this);
        return this.models;
    };

    Collection.prototype.add = function add(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var elements = toElements(this, a_elements, options),
            transaction = this.models.length ? addTransaction(this, elements, options) : emptySetTransaction(this, elements, options);
        if (transaction) {
            transaction.commit();
            return transaction.added;
        }
    };

    Collection.prototype.remove = function remove(recordsOrIds) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (recordsOrIds) {
            return Array.isArray(recordsOrIds) ? removeMany(this, recordsOrIds, options) : removeOne(this, recordsOrIds, options);
        }
        return [];
    };

    Collection.prototype._createTransaction = function _createTransaction(a_elements) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var elements = toElements(this, a_elements, options);
        if (this.models.length) {
            return options.remove === false ? addTransaction(this, elements, options, true) : setTransaction(this, elements, options);
        } else {
            return emptySetTransaction(this, elements, options);
        }
    };

    Collection.prototype.pluck = function pluck(key) {
        return this.models.map(function (model) {
            return model[key];
        });
    };

    Collection.prototype.sort = function sort() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        if (sortElements(this, options)) {
            var isRoot = begin$1(this);
            if (markAsDirty$1(this, options)) {
                trigger2$2(this, 'sort', this, options);
            }
            isRoot && commit$1(this);
        }
        return this;
    };

    Collection.prototype.push = function push(model, options) {
        return this.add(model, assign$1({ at: this.length }, options));
    };

    Collection.prototype.pop = function pop(options) {
        var model = this.at(this.length - 1);
        this.remove(model, options);
        return model;
    };

    Collection.prototype.unshift = function unshift(model, options) {
        return this.add(model, assign$1({ at: 0 }, options));
    };

    Collection.prototype.shift = function shift(options) {
        var model = this.at(0);
        this.remove(model, options);
        return model;
    };

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

    createClass(Collection, [{
        key: "_state",
        get: function get() {
            return this.models;
        }
    }, {
        key: "comparator",
        set: function set(x) {
            var _this2 = this;

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
                            var aa = x.call(_this2, a),
                                bb = x.call(_this2, b);
                            if (aa === bb) return 0;
                            return aa < bb ? -1 : +1;
                        };
                    } else {
                        this._comparator = function (a, b) {
                            return x.call(_this2, a, b);
                        };
                    }
                    break;
                default:
                    this._comparator = null;
            }
        },
        get: function get() {
            return this._comparator;
        }
    }, {
        key: "length",
        get: function get() {
            return this.models.length;
        }
    }]);
    return Collection;
}(Transactional);
var Collection = Collection_1;
Collection._attribute = TransactionalType;
Collection = Collection_1 = __decorate$1([define({
    cidPrefix: 'c',
    model: Record,
    _changeEventName: 'changes',
    _aggregationError: null
})], Collection);
function toElements(collection, elements, options) {
    var parsed = options.parse ? collection.parse(elements, options) : elements;
    return Array.isArray(parsed) ? parsed : [parsed];
}
var _slice = Array.prototype.slice;

var SharedCollectionType = function (_SharedRecordType) {
    inherits(SharedCollectionType, _SharedRecordType);

    function SharedCollectionType() {
        classCallCheck(this, SharedCollectionType);
        return possibleConstructorReturn(this, _SharedRecordType.apply(this, arguments));
    }

    SharedCollectionType.prototype.convert = function convert(value, options, prev, record) {
        return value == null || value instanceof this.type ? value : new this.type(value, options, 1);
    };

    return SharedCollectionType;
}(SharedRecordType);

createSharedTypeSpec(Collection, SharedCollectionType);
Record.Collection = Collection;

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

var RecordRefAttribute = function (_GenericAttribute) {
    inherits(RecordRefAttribute, _GenericAttribute);

    function RecordRefAttribute() {
        classCallCheck(this, RecordRefAttribute);
        return possibleConstructorReturn(this, _GenericAttribute.apply(this, arguments));
    }

    RecordRefAttribute.prototype.toJSON = function toJSON(value) {
        return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.id : value;
    };

    RecordRefAttribute.prototype.clone = function clone(value) {
        return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.id : value;
    };

    RecordRefAttribute.prototype.isChanged = function isChanged(a, b) {
        var aId = a && (a.id == null ? a : a.id),
            bId = b && (b.id == null ? b : b.id);
        return aId !== bId;
    };

    RecordRefAttribute.prototype.validate = function validate(model, value, name) {};

    return RecordRefAttribute;
}(GenericAttribute);

Record.from = function from(masterCollection) {
    var getMasterCollection = parseReference(masterCollection);
    var typeSpec = new ChainableAttributeSpec({
        value: null,
        _attribute: RecordRefAttribute
    });
    typeSpec.get(function (objOrId, name) {
        if ((typeof objOrId === 'undefined' ? 'undefined' : _typeof(objOrId)) === 'object') return objOrId;
        var collection = getMasterCollection(this);
        var record = null;
        if (collection && collection.length) {
            record = collection.get(objOrId) || null;
            this.attributes[name] = record;
            record && this._attributes[name].handleChange(record, null, this);
        }
        return record;
    });
    return typeSpec;
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
    typeSpec.get(function (refs) {
        !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
        return refs;
    });
    return typeSpec;
};
function subsetOptions(options) {
    var subsetOptions = { parse: true };
    if (options) fastDefaults$1(subsetOptions, options);
    return subsetOptions;
}
function defineSubsetCollection(CollectionConstructor) {
    var SubsetOfCollection = function (_CollectionConstructo) {
        inherits(SubsetOfCollection, _CollectionConstructo);

        function SubsetOfCollection(recordsOrIds, options) {
            classCallCheck(this, SubsetOfCollection);

            var _this = possibleConstructorReturn(this, _CollectionConstructo.call(this, recordsOrIds, subsetOptions(options), 2));

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

        SubsetOfCollection.prototype.toJSON = function toJSON() {
            return this.refs ? this.refs.map(function (objOrId) {
                return objOrId.id || objOrId;
            }) : this.models.map(function (model) {
                return model.id;
            });
        };

        SubsetOfCollection.prototype._validateNested = function _validateNested() {
            return 0;
        };

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

    Store.prototype.get = function get(name) {
        var local = this[name];
        if (local || this === this._defaultStore) return local;
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };

    createClass(Store, null, [{
        key: 'global',
        get: function get() {
            return _store;
        },
        set: function set(store) {
            if (_store) {
                _store.dispose();
            }
            Transactional.prototype._defaultStore = _store = store;
        }
    }]);
    return Store;
}(Record);
Store.global = new Store();

//import * as _ from 'underscore'
var slice$2 = Array.prototype.slice;

var UnderscoreModel = {
    pick: function pick() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return pick$1(this, args);
    },
    escape: function escape(attr) {
        return escape$1(this[attr]);
    },
    matches: function matches(attrs) {
        return !!iteratee(attrs, this)(this);
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
    forEach: { l: 3, m: forEach },
    //  each : { l:3, m: each},
    map: { l: 3, m: map$1 },
    //  collect : { l:3, m: collect},
    reduce: { l: 4, m: reduce },
    //  foldl    : { l:4, m: foldl},
    //  inject : { l:4, m: inject},
    //  reduceRight : { l:4, m: reduceRight},
    //  foldr : { l:4, m: foldr},
    find: { l: 3, m: find },
    findIndex: { l: 3, m: findIndex },
    findLastIndex: { l: 3, m: findLastIndex },
    //  detect : { l:3, m: detect},
    filter: { l: 3, m: filter },
    //  select   : { l:3, m: select},
    //  reject : { l:3, m: reject},
    every: { l: 3, m: every$1 },
    //  all : { l:3, m:all },
    some: { l: 3, m: some$1 },
    //  any : { l:3, m:any },
    //  include : { l:3, m:include },
    includes: { l: 3, m: includes },
    //  contains : { l:3, m:contains },
    invoke: { l: 0, m: invoke },
    max: { l: 3, m: max },
    min: { l: 3, m: min },
    toArray: { l: 1, m: toArray },
    //  size : { l:1, m:size },
    //  first : { l:3, m:first },
    head: { l: 3, m: head },
    //  take : { l:3, m:take },
    //  initial : { l:3, m:initial },
    //  rest : { l:3, m:rest },
    tail: { l: 3, m: tail },
    //  drop : { l:3, m:drop },
    last: { l: 3, m: last$1 },
    without: { l: 0, m: without },
    difference: { l: 0, m: difference },
    indexOf: { l: 3, m: indexOf$1 },
    //  shuffle : { l:1, m: shuffle},
    lastIndexOf: { l: 3, m: lastIndexOf },
    isEmpty: { l: 1, m: isEmpty },
    //  chain : { l:1, m:chain },
    sample: { l: 3, m: sample },
    partition: { l: 3, m: partition },
    groupBy: { l: 3, m: groupBy },
    countBy: { l: 3, m: countBy },
    sortBy: { l: 3, m: sortBy }
});

function addUnderscoreMethods(Mixin, attribute, methods) {
    each$1(methods, function (_ref, methodName) {
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
            return function (iteratee$$1, context) {
                var value = this[attribute],
                    callback = cb(iteratee$$1, this);

                return arguments.length > 1 ? method(value, callback, context) : method(value, callback);
            };
        case 4:
            return function (iteratee$$1, defaultVal, context) {
                var value = this[attribute],
                    callback = cb(iteratee$$1, this);

                return arguments.length > 1 ? method(value, callback, defaultVal, context) : method(value, callback);
            };
        default:
            return function () {
                var args = slice$2.call(arguments);
                args.unshift(this[attribute]);
                return method.apply(method, args);
            };
    }
}

// Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
function cb(iteratee$$1, instance) {
    switch (typeof iteratee$$1 === 'undefined' ? 'undefined' : _typeof(iteratee$$1)) {
        case 'function':
            return iteratee$$1;
        case 'string':
            return function (model) {
                return model.get(iteratee$$1);
            };
        case 'object':
            if (!(iteratee$$1 instanceof instance.model)) return matches(iteratee$$1);
    }

    return iteratee$$1;
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
