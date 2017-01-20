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

let Log = function () {
    function Log() {
        classCallCheck(this, Log);

        this.stops = {};
        this.throws = {};
        this.logger = typeof console !== 'undefined' ? console : null;
        this.reset();
    }

    Log.prototype.doLogging = function doLogging(type, args) {
        const { logger } = this,
              logMethod = logger && logger[type];
        if (logMethod) logMethod.apply(logger, args);
        if (this.stops[type]) debugger;
        if (this.throws[type]) throw new Error(`[${ type }] ${ args[0] }`);
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

    Log.prototype.error = function error(...args) {
        if (this.level > 0) this.doLogging('error', args);
    };

    Log.prototype.warn = function warn(...args) {
        if (this.level > 1) this.doLogging('warn', args);
    };

    Log.prototype.info = function info(...args) {
        if (this.level > 2) this.doLogging('info', args);
    };

    Log.prototype.debug = function debug(...args) {
        if (this.level > 3) this.doLogging('debug', args);
    };

    createClass(Log, [{
        key: 'state',
        get: function () {
            return `
Object.log - Object+ Logging and Debugging Utility
--------------------------------------------------
Object.log.counts: Number of logged events by type
    { errors : ${ this.counts.error }, warns : ${ this.counts.warn }, info : ${ this.counts.info }, debug : ${ this.counts.debug } }

Object.log.level == ${ this.level } : Ignore events which are above specified level
    - 0 - logging is off;
    - 1 - Object.log.error(...) only;
    - 2 - .error() and .warn();
    - 3 - .error(), .warn(), and .info();
    - 4 - all of above plus .debug().

Object.log.stops: Stops in debugger for some certain event types
     { error : ${ this.stops.error || false }, warn  : ${ this.stops.warn || false }, info  : ${ this.stops.info || false }, debug : ${ this.stops.debug || false } }

Object.log.throws: Throws expection on some certain event types
     { error : ${ this.throws.error || false }, warn  : ${ this.throws.warn || false }, info  : ${ this.throws.info || false }, debug : ${ this.throws.debug || false } }
`;
        }
    }]);
    return Log;
}();
let log = new Log();
function isValidJSON(value) {
    if (value === null) {
        return true;
    }
    switch (typeof value) {
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
function getBaseClass(Class) {
    return Object.getPrototypeOf(Class.prototype).constructor;
}
function getChangedStatics(Ctor, ...names) {
    const Base = getBaseClass(Ctor),
          props = {};
    for (let name of names) {
        const value = Ctor[name];
        if (value !== void 0 && value !== Base[name]) {
            props[name] = value;
        }
    }
    return props;
}
function isEmpty(obj) {
    if (obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}
function someArray(arr, fun) {
    let result;
    for (let i = 0; i < arr.length; i++) {
        if (result = fun(arr[i], i)) {
            return result;
        }
    }
}
function someObject(obj, fun) {
    let result;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (result = fun(obj[key], key)) {
                return result;
            }
        }
    }
}
function some(obj, fun) {
    if (Object.getPrototypeOf(obj) === ArrayProto) {
        return someArray(obj, fun);
    } else {
        return someObject(obj, fun);
    }
}
function every(obj, predicate) {
    return !some(obj, x => !predicate(x));
}
function getPropertyDescriptor(obj, prop) {
    let desc;
    for (let proto = obj; !desc && proto; proto = Object.getPrototypeOf(proto)) {
        desc = Object.getOwnPropertyDescriptor(proto, prop);
    }
    return desc;
}
function omit(source) {
    const dest = {},
          discard = {};
    for (let i = 1; i < arguments.length; i++) {
        discard[arguments[i]] = true;
    }
    for (var name in source) {
        if (!discard.hasOwnProperty(name) && source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
function transform(dest, source, fun) {
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
        for (let i = 2; i < arguments.length; i++) {
            const other = arguments[i];
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
        for (let i = 2; i < arguments.length; i++) {
            const other = arguments[i];
            other && defaults$$1(dest, other);
        }
    }
    return dest;
}
Object.setPrototypeOf || (Object.setPrototypeOf = defaults$$1);
function keys(o) {
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
const ArrayProto = Array.prototype;
const DateProto = Date.prototype;
const ObjectProto = Object.prototype;
function notEqual(a, b) {
    if (a === b) return false;
    if (a && b && typeof a == 'object' && typeof b == 'object') {
        const protoA = Object.getPrototypeOf(a);
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
    const keysA = Object.keys(a);
    if (keysA.length !== Object.keys(b).length) return true;
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!b.hasOwnProperty(key) || notEqual(a[key], b[key])) {
            return true;
        }
    }
    return false;
}
function arraysNotEqual(a, b) {
    if (a.length !== b.length) return true;
    for (let i = 0; i < a.length; i++) {
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

let Mixable = function () {
    function Mixable() {
        classCallCheck(this, Mixable);
        this.initialize.apply(this, arguments);
    }

    Mixable.prototype.initialize = function initialize() {};

    Mixable.create = function create(a, b) {
        return new this(a, b);
    };

    Mixable.mixins = function mixins(..._mixins) {
        const proto = this.prototype,
              mergeRules = this._mixinRules || {},
              _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();
        for (let mixin of _mixins) {
            if (mixin instanceof Array) {
                return Mixable.mixins.apply(this, mixin);
            }
            if (_appliedMixins.indexOf(mixin) >= 0) continue;
            _appliedMixins.push(mixin);
            if (typeof mixin === 'function') {
                defaults$$1(this, mixin);
                mergeProps(proto, mixin.prototype, mergeRules);
            } else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };

    Mixable.mixTo = function mixTo(...args) {
        for (let Ctor of args) {
            Mixable.mixins.call(Ctor, this);
        }
        return this;
    };

    Mixable.mixinRules = function mixinRules(_mixinRules) {
        const Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(_mixinRules, Base._mixinRules);
        }
        this._mixinRules = _mixinRules;
        return this;
    };

    Mixable.define = function define(definition = {}, staticProps) {
        if (!this.define) {
            log.error("[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
            return this;
        }
        this.predefine();
        const proto = this.prototype;
        const protoProps = omit(definition, 'properties', 'mixins', 'mixinRules'),
              { properties = {}, mixins, mixinRules } = definition;
        assign(proto, protoProps);
        assign(this, staticProps);
        properties && Object.defineProperties(proto, transform({}, properties, toPropertyDescriptor));
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };

    Mixable.extend = function extend(spec, statics) {
        let Subclass;
        if (spec && spec.hasOwnProperty('constructor')) {
            Subclass = spec.constructor;
            __extends(Subclass, this);
        } else {
            Subclass = function (_ref) {
                inherits(_Subclass, _ref);

                function _Subclass() {
                    classCallCheck(this, _Subclass);
                    return possibleConstructorReturn(this, _ref.apply(this, arguments));
                }

                return _Subclass;
            }(this);
        }
        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
    };

    Mixable.predefine = function predefine() {
        const BaseClass = getBaseClass(this);
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
function mixins(...list) {
    return createDecorator('mixins', list);
}
function extendable(Type) {
    Mixable.mixTo(Type);
}
function predefine(Constructor) {
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
    const x = assign({}, a);
    return mergeProps(x, b, rules);
}
const mergeFunctions = {
    pipe(a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    },
    mergeSequence(a, b) {
        return function () {
            return defaults$$1(a.call(this), b.call(this));
        };
    },
    overwrite(a, b) {
        return b;
    },
    sequence(a, b) {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    },
    reverse(a, b) {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    },
    every(a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some(a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
function mergeProps(target, source, rules = {}) {
    for (let name of Object.keys(source)) {
        if (name === 'constructor') continue;
        const sourceProp = Object.getOwnPropertyDescriptor(source, name),
              destProp = getPropertyDescriptor(target, name),
              value = destProp && destProp.value;
        if (value != null) {
            const rule = rules[name];
            if (rule) {
                target[name] = typeof rule === 'object' ? mergeObjects(value, sourceProp.value, rule) : rule === 'merge' ? mergeObjects(value, sourceProp.value) : mergeFunctions[rule](value, sourceProp.value);
            }
        } else {
            Object.defineProperty(target, name, sourceProp);
        }
    }
    return target;
}



var Mixins = Object.freeze({
	Mixable: Mixable,
	mixinRules: mixinRules,
	mixins: mixins,
	extendable: extendable,
	predefine: predefine,
	define: define,
	mergeProps: mergeProps
});

let EventMap = function () {
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
        for (let names in map) {
            this.addEvent(names, map[names]);
        }
    };

    EventMap.prototype.bubbleEvents = function bubbleEvents(names) {
        for (let name of names.split(eventSplitter$1)) {
            this.addEvent(name, getBubblingHandler(name));
        }
    };

    EventMap.prototype.addEvent = function addEvent(names, callback) {
        const { handlers } = this;
        for (let name of names.split(eventSplitter$1)) {
            handlers.push(new EventDescriptor(name, callback));
        }
    };

    EventMap.prototype.subscribe = function subscribe(target, source) {
        for (let event of this.handlers) {
            on$1(source, event.name, event.callback, target);
        }
    };

    EventMap.prototype.unsubscribe = function unsubscribe(target, source) {
        for (let event of this.handlers) {
            off$1(source, event.name, event.callback, target);
        }
    };

    return EventMap;
}();

let EventDescriptor = function EventDescriptor(name, callback) {
    classCallCheck(this, EventDescriptor);

    this.name = name;
    if (callback === true) {
        this.callback = getBubblingHandler(name);
    } else if (typeof callback === 'string') {
        this.callback = function localCallback() {
            const handler = this[callback];
            handler && handler.apply(this, arguments);
        };
    } else {
        this.callback = callback;
    }
};

const _bubblingHandlers = {};
function getBubblingHandler(event) {
    return _bubblingHandlers[event] || (_bubblingHandlers[event] = function (a, b, c, d, e) {
        if (d !== void 0 || e !== void 0) trigger5$1(this, event, a, b, c, d, e);
        if (c !== void 0) trigger3$1(this, event, a, b, c);else trigger2$1(this, event, a, b);
    });
}
let EventHandler$1 = function EventHandler(callback, context, next = null) {
    classCallCheck(this, EventHandler);

    this.callback = callback;
    this.context = context;
    this.next = next;
};
function listOff(_events, name, callback, context) {
    const head = _events[name];
    let filteredHead, prev;
    for (let ev = head; ev; ev = ev.next) {
        if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
            prev = ev;
            filteredHead || (filteredHead = ev);
        } else {
            if (prev) prev.next = ev.next;
        }
    }
    if (head !== filteredHead) _events[name] = filteredHead;
}
function listSend2(head, a, b) {
    for (let ev = head; ev; ev = ev.next) ev.callback.call(ev.context, a, b);
}
function listSend3(head, a, b, c) {
    for (let ev = head; ev; ev = ev.next) ev.callback.call(ev.context, a, b, c);
}
function listSend4(head, a, b, c, d) {
    for (let ev = head; ev; ev = ev.next) ev.callback.call(ev.context, a, b, c, d);
}
function listSend5(head, a, b, c, d, e) {
    for (let ev = head; ev; ev = ev.next) ev.callback.call(ev.context, a, b, c, d, e);
}
function listSend6(head, a, b, c, d, e, f) {
    for (let ev = head; ev; ev = ev.next) ev.callback.call(ev.context, a, b, c, d, e, f);
}
function on$1(source, name, callback, context) {
    if (callback) {
        const _events = source._events || (source._events = Object.create(null));
        _events[name] = new EventHandler$1(callback, context, _events[name]);
    }
}
function once$2(source, name, callback, context) {
    if (callback) {
        const once$$1 = once$1(function () {
            off$1(source, name, once$$1);
            callback.apply(this, arguments);
        });
        once$$1._callback = callback;
        on$1(source, name, once$$1, context);
    }
}
function off$1(source, name, callback, context) {
    const { _events } = source;
    if (_events) {
        if (callback || context) {
            if (name) {
                listOff(_events, name, callback, context);
            } else {
                for (let name in _events) {
                    listOff(_events, name, callback, context);
                }
            }
        } else if (name) {
            _events[name] = void 0;
        } else {
            source._events = void 0;
        }
    }
}
const eventSplitter$1 = /\s+/;
function strings$1(api, source, events, callback, context) {
    if (eventSplitter$1.test(events)) {
        const names = events.split(eventSplitter$1);
        for (let name of names) api(source, name, callback, context);
    } else api(source, events, callback, context);
}
function trigger2$1(self, name, a, b) {
    const { _events } = self;
    if (_events) {
        const queue = _events[name],
              { all } = _events;
        listSend2(queue, a, b);
        listSend3(all, name, a, b);
    }
}

function trigger3$1(self, name, a, b, c) {
    const { _events } = self;
    if (_events) {
        const queue = _events[name],
              { all } = _events;
        listSend3(queue, a, b, c);
        listSend4(all, name, a, b, c);
    }
}

function trigger5$1(self, name, a, b, c, d, e) {
    const { _events } = self;
    if (_events) {
        const queue = _events[name],
              { all } = _events;
        listSend5(queue, a, b, c, d, e);
        listSend6(all, name, a, b, c, d, e);
    }
}




var eventsApi = Object.freeze({
	EventMap: EventMap,
	EventHandler: EventHandler$1,
	on: on$1,
	once: once$2,
	off: off$1,
	strings: strings$1,
	trigger2: trigger2$1,
	trigger3: trigger3$1,
	trigger5: trigger5$1
});

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { mixins: mixins$1, define: define$1, extendable: extendable$1 } = Mixins;
const { EventHandler: EventHandler$$1, strings: strings$$1, on: _on, off: _off, once: _once, trigger5: trigger5$$1, trigger2: trigger2$$1, trigger3: trigger3$$1 } = eventsApi;
let _idCount = 0;
function uniqueId() {
    return 'l' + _idCount++;
}
let Messenger = Messenger_1 = function () {
    function Messenger() {
        classCallCheck(this, Messenger);

        this._events = void 0;
        this._listeningTo = void 0;
        this.cid = uniqueId();
        this.initialize.apply(this, arguments);
    }

    Messenger.prototype.initialize = function initialize() {};

    Messenger.define = function define$$1(protoProps, staticProps) {
        const spec = omit(protoProps || {}, 'localEvents');
        if (protoProps) {
            const { localEvents, _localEvents } = protoProps;
            if (localEvents || _localEvents) {
                const eventsMap = new EventMap(this.prototype._localEvents);
                localEvents && eventsMap.addEventsMap(localEvents);
                _localEvents && eventsMap.merge(_localEvents);
                spec._localEvents = eventsMap;
            }
        }
        return Mixable.define.call(this, spec, staticProps);
    };

    Messenger.prototype.on = function on$$1(events, callback, context) {
        if (typeof events === 'string') strings$$1(_on, this, events, callback, context);else for (let name in events) strings$$1(_on, this, name, events[name], context || callback);
        return this;
    };

    Messenger.prototype.once = function once$$1(events, callback, context) {
        if (typeof events === 'string') strings$$1(_once, this, events, callback, context);else for (let name in events) strings$$1(_once, this, name, events[name], context || callback);
        return this;
    };

    Messenger.prototype.off = function off$$1(events, callback, context) {
        if (!events) _off(this, void 0, callback, context);else if (typeof events === 'string') strings$$1(_off, this, events, callback, context);else for (let name in events) strings$$1(_off, this, name, events[name], context || callback);
        return this;
    };

    Messenger.prototype.trigger = function trigger(name, a, b, c, d, e) {
        if (d !== void 0 || e !== void 0) trigger5$$1(this, name, a, b, c, d, e);else if (c !== void 0) trigger3$$1(this, name, a, b, c);else trigger2$$1(this, name, a, b);
        return this;
    };

    Messenger.prototype.listenTo = function listenTo(source, a, b) {
        if (source) {
            addReference(this, source);
            source.on(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };

    Messenger.prototype.listenToOnce = function listenToOnce(source, a, b) {
        if (source) {
            addReference(this, source);
            source.once(a, !b && typeof a === 'object' ? this : b, this);
        }
        return this;
    };

    Messenger.prototype.stopListening = function stopListening(a_source, a, b) {
        const { _listeningTo } = this;
        if (_listeningTo) {
            const removeAll = !(a || b),
                  second = !b && typeof a === 'object' ? this : b;
            if (a_source) {
                const source = _listeningTo[a_source.cid];
                if (source) {
                    if (removeAll) delete _listeningTo[a_source.cid];
                    source.off(a, second, this);
                }
            } else if (a_source == null) {
                for (let cid in _listeningTo) _listeningTo[cid].off(a, second, this);
                if (removeAll) this._listeningTo = void 0;
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
const Events = omit(Messenger.prototype, 'constructor', 'initialize');
function addReference(listener, source) {
    const listeningTo = listener._listeningTo || (listener._listeningTo = Object.create(null)),
          cid = source.cid || (source.cid = uniqueId());
    listeningTo[cid] = source;
}
var Messenger_1;

Object.extend = (protoProps, staticProps) => Mixable.extend(protoProps, staticProps);
Object.assign || (Object.assign = assign);
Object.log = log;

let ValidationError = function () {
    function ValidationError(obj) {
        classCallCheck(this, ValidationError);

        this.length = obj._validateNested(this.nested = {});
        if (this.error = obj.validate(obj)) {
            this.length++;
        }
    }

    ValidationError.prototype.each = function each(iteratee) {
        const { error, nested } = this;
        if (error) iteratee(error, null);
        for (const key in nested) {
            iteratee(nested[key], key);
        }
    };

    ValidationError.prototype.eachError = function eachError(iteratee, object) {
        this.each((value, key) => {
            if (value instanceof ValidationError) {
                value.eachError(iteratee, object.get(key));
            } else {
                iteratee(value, key, object);
            }
        });
    };

    return ValidationError;
}();

const referenceMask = /\^|([^.]+)/g;
let CompiledReference = function CompiledReference(reference, splitTail = false) {
    classCallCheck(this, CompiledReference);

    const path = reference.match(referenceMask).map(key => {
        if (key === '^') return 'getOwner()';
        if (key[0] === '~') return `getStore().get("${ key.substr(1) }")`;
        return key;
    });
    this.tail = splitTail && path.pop();
    this.local = !path.length;
    path.unshift('self');
    this.resolve = new Function('self', `return ${ path.join('.') };`);
};
function resolveReference(root, reference, action) {
    const path = reference.match(referenceMask),
          skip = path.length - 1;
    let self = root;
    for (var i = 0; i < skip; i++) {
        const key = path[i];
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
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { trigger2: trigger2$3, trigger3: trigger3$2, on: on$3, off: off$3 } = eventsApi;
var ItemsBehavior;
(function (ItemsBehavior) {
    ItemsBehavior[ItemsBehavior["share"] = 1] = "share";
    ItemsBehavior[ItemsBehavior["listen"] = 2] = "listen";
    ItemsBehavior[ItemsBehavior["persistent"] = 4] = "persistent";
})(ItemsBehavior || (ItemsBehavior = {}));
let Transactional = function () {
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
        if (this._disposed) return;
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

    Transactional.prototype.transaction = function transaction(fun, options = {}) {
        const isRoot = transactionApi.begin(this);
        fun.call(this, this);
        isRoot && transactionApi.commit(this);
    };

    Transactional.prototype.updateEach = function updateEach(iteratee, options) {
        const isRoot = transactionApi.begin(this);
        this.each(iteratee);
        isRoot && transactionApi.commit(this);
    };

    Transactional.prototype.set = function set$$1(values, options) {
        if (values) {
            const transaction = this._createTransaction(values, options);
            transaction && transaction.commit();
        }
        return this;
    };

    Transactional.prototype.parse = function parse(data, options) {
        return data;
    };

    Transactional.prototype.deepGet = function deepGet(reference) {
        return resolveReference(this, reference, (object, key) => object.get ? object.get(key) : object[key]);
    };

    Transactional.prototype.getOwner = function getOwner() {
        return this._owner;
    };

    Transactional.prototype.getStore = function getStore() {
        const { _owner } = this;
        return _owner ? _owner.getStore() : this._defaultStore;
    };

    Transactional.prototype.map = function map(iteratee, context) {
        const arr = [],
              fun = context !== void 0 ? (v, k) => iteratee.call(context, v, k) : iteratee;
        this.each((val, key) => {
            const result = fun(val, key);
            if (result !== void 0) arr.push(result);
        });
        return arr;
    };

    Transactional.prototype.mapObject = function mapObject(iteratee, context) {
        const obj = {},
              fun = context !== void 0 ? (v, k) => iteratee.call(context, v, k) : iteratee;
        this.each((val, key) => {
            const result = iteratee(val, key);
            if (result !== void 0) obj[key] = result;
        });
        return obj;
    };

    Transactional.prototype.validate = function validate(obj) {};

    Transactional.prototype.getValidationError = function getValidationError(key) {
        var error = this.validationError;
        return (key ? error && error.nested[key] : error) || null;
    };

    Transactional.prototype.deepValidationError = function deepValidationError(reference) {
        return resolveReference(this, reference, (object, key) => object.getValidationError(key));
    };

    Transactional.prototype.eachValidationError = function eachValidationError(iteratee) {
        const { validationError } = this;
        validationError && validationError.eachError(iteratee, this);
    };

    Transactional.prototype.isValid = function isValid(key) {
        return !this.getValidationError(key);
    };

    Transactional.prototype.valueOf = function valueOf() {
        return this.cid;
    };

    Transactional.prototype.toString = function toString() {
        return this.cid;
    };

    Transactional.prototype.getClassName = function getClassName() {
        const { name } = this.constructor;
        if (name !== 'Subclass') return name;
    };

    createClass(Transactional, [{
        key: "validationError",
        get: function () {
            const error = this._validationError || (this._validationError = new ValidationError(this));
            return error.length ? error : null;
        }
    }]);
    return Transactional;
}();
Transactional = __decorate$2([mixins(Messenger), extendable], Transactional);
const transactionApi = {
    begin(object) {
        return object._transaction ? false : object._transaction = true;
    },
    markAsDirty(object, options) {
        const dirty = !options.silent;
        if (dirty) object._isDirty = options;
        object._changeToken = {};
        object._validationError = void 0;
        return dirty;
    },
    commit(object, initiator) {
        let originalOptions = object._isDirty;
        if (originalOptions) {
            while (object._isDirty) {
                const options = object._isDirty;
                object._isDirty = null;
                trigger3$2(object, object._changeEventName, object, options, initiator);
            }
            object._transaction = false;
            const { _owner } = object;
            if (_owner && _owner !== initiator) {
                _owner._onChildrenChange(object, originalOptions);
            }
        } else {
            object._isDirty = null;
            object._transaction = false;
        }
    },
    aquire(owner, child, key) {
        if (!child._owner) {
            child._owner = owner;
            child._ownerKey = key;
            return true;
        }
        return child._owner === owner;
    },
    free(owner, child) {
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
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { trigger3: trigger3$3 } = eventsApi;
const { assign: assign$4, isEmpty: isEmpty$1, log: log$2 } = tools;
const { free, aquire, commit: _commit } = transactionApi;
const _begin = transactionApi.begin;
const _markAsDirty = transactionApi.markAsDirty;
let _cidCounter = 0;
let Record = Record_1 = function (_Transactional) {
    inherits(Record, _Transactional);

    function Record(a_values, a_options) {
        classCallCheck(this, Record);

        var _this = possibleConstructorReturn(this, _Transactional.call(this, _cidCounter++));

        _this.attributes = {};
        const options = a_options || {},
              values = (options.parse ? _this.parse(a_values, options) : a_values) || {};
        const attributes = options.clone ? cloneAttributes(_this, values) : _this.defaults(values);
        _this.forEachAttr(attributes, (value, key, attr) => {
            const next = attributes[key] = attr.transform(value, options, void 0, _this);
            attr.handleChange(next, void 0, _this);
        });
        _this.attributes = _this._previousAttributes = attributes;
        _this.initialize(a_values, a_options);
        if (_this._localEvents) _this._localEvents.subscribe(_this, _this);
        return _this;
    }

    Record.define = function define$$1(protoProps, staticProps) {
        return Transactional.define(protoProps, staticProps);
    };

    Record.defaults = function defaults$$1(attrs) {
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
        const { _previousAttributes } = this;
        if (!_previousAttributes) return false;
        return key ? this._attributes[key].isChanged(this.attributes[key], _previousAttributes[key]) : !isEmpty$1(this.changed);
    };

    Record.prototype.previous = function previous(key) {
        if (key) {
            const { _previousAttributes } = this;
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
        const nullify = options && options.nullify;
        this.transaction(() => {
            this.forEachAttr(this.attributes, (value, key) => this[key] = nullify ? null : void 0);
        }, options);
        return this;
    };

    Record.prototype.getOwner = function getOwner() {
        const owner = this._owner;
        return this._ownerKey ? owner : owner && owner._owner;
    };

    Record.prototype.Attributes = function Attributes(x) {
        this.id = x.id;
    };

    Record.prototype.forEachAttr = function forEachAttr(attrs, iteratee) {
        const { _attributes } = this;
        let unknown;
        for (let name in attrs) {
            const spec = _attributes[name];
            if (spec) {
                iteratee(attrs[name], name, spec);
            } else {
                unknown || (unknown = []);
                unknown.push(`'${ name }'`);
            }
        }
        if (unknown) {
            this._log('warn', `attributes ${ unknown.join(', ') } are not defined`, attrs);
        }
    };

    Record.prototype.each = function each(iteratee, context) {
        const fun = context !== void 0 ? (v, k) => iteratee.call(context, v, k) : iteratee,
              { attributes, _keys } = this;
        for (const key of _keys) {
            const value = attributes[key];
            if (value !== void 0) fun(value, key);
        }
    };

    Record.prototype.keys = function keys() {
        return this.map((value, key) => {
            if (value !== void 0) return key;
        });
    };

    Record.prototype.values = function values() {
        return this.map(value => value);
    };

    Record.prototype._toJSON = function _toJSON() {
        return {};
    };

    Record.prototype._parse = function _parse(data) {
        return data;
    };

    Record.prototype.defaults = function defaults$$1(values) {
        return {};
    };

    Record.prototype.initialize = function initialize(values, options) {};

    Record.prototype.clone = function clone(options = {}) {
        const copy = new this.constructor(this.attributes, { clone: true });
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };

    Record.prototype.deepClone = function deepClone() {
        return this.clone();
    };

    Record.prototype._validateNested = function _validateNested(errors) {
        var length = 0;
        this.forEachAttr(this.attributes, (value, name, attribute) => {
            const error = attribute.validate(this, value, name);
            if (error) {
                errors[name] = error;
                length++;
            }
        });
        return length;
    };

    Record.prototype.get = function get$$1(key) {
        return this[key];
    };

    Record.prototype.toJSON = function toJSON() {
        const json = {};
        this.forEachAttr(this.attributes, (value, key, { toJSON }) => {
            if (value !== void 0) {
                const asJson = toJSON.call(this, value, key);
                if (asJson !== void 0) json[key] = asJson;
            }
        });
        return json;
    };

    Record.prototype.parse = function parse(data, options) {
        return this._parse(data);
    };

    Record.prototype.set = function set$$1(a, b, c) {
        if (typeof a === 'string') {
            if (c) {
                return _Transactional.prototype.set.call(this, { [a]: b }, c);
            } else {
                setAttribute(this, a, b);
                return this;
            }
        } else {
            return _Transactional.prototype.set.call(this, a, b);
        }
    };

    Record.prototype.deepSet = function deepSet(name, value, options) {
        this.transaction(() => {
            const path = name.split('.'),
                  l = path.length - 1,
                  attr = path[l];
            let model = this;
            for (let i = 0; i < l; i++) {
                const key = path[i];
                let next = model.get ? model.get(key) : model[key];
                if (!next) {
                    const attrSpecs = model._attributes;
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

    Record.prototype.transaction = function transaction(fun, options = {}) {
        const isRoot = begin$1(this);
        fun.call(this, this);
        isRoot && _commit(this);
    };

    Record.prototype._createTransaction = function _createTransaction(a_values, options = {}) {
        const isRoot = begin$1(this),
              changes = [],
              nested = [],
              { attributes } = this,
              values = options.parse ? this.parse(a_values, options) : a_values;
        if (values && values.constructor === Object) {
            this.forEachAttr(values, (value, key, attr) => {
                const prev = attributes[key];
                let update;
                if (update = attr.canBeUpdated(prev, value, options)) {
                    const nestedTransaction = prev._createTransaction(update, options);
                    if (nestedTransaction) {
                        nested.push(nestedTransaction);
                        if (attr.propagateChanges) changes.push(key);
                    }
                    return;
                }
                const next = attr.transform(value, options, prev, this);
                attributes[key] = next;
                if (attr.isChanged(next, prev)) {
                    changes.push(key);
                    attr.handleChange(next, prev, this);
                }
            });
        } else {
            this._log('error', 'incompatible argument type', values);
        }
        if (changes.length && markAsDirty$1(this, options)) {
            return new RecordTransaction(this, isRoot, nested, changes);
        }
        for (let pendingTransaction of nested) {
            pendingTransaction.commit(this);
        }
        isRoot && _commit(this);
    };

    Record.prototype._onChildrenChange = function _onChildrenChange(child, options) {
        const { _ownerKey } = child,
              attribute = this._attributes[_ownerKey];
        if (!attribute || attribute.propagateChanges) this.forceAttributeChange(_ownerKey, options);
    };

    Record.prototype.forceAttributeChange = function forceAttributeChange(key, options = {}) {
        const isRoot = begin$1(this);
        if (markAsDirty$1(this, options)) {
            trigger3$3(this, 'change:' + key, this, this.attributes[key], options);
        }
        isRoot && _commit(this);
    };

    Record.prototype.dispose = function dispose() {
        if (this._disposed) return;
        this.forEachAttr(this.attributes, (value, key, attribute) => {
            attribute.dispose(this, value);
        });
        _Transactional.prototype.dispose.call(this);
    };

    Record.prototype._log = function _log(level, text, value) {
        log[level](`[Model Update] ${ this.getClassName() }: ` + text, value, 'Attributes spec:', this._attributes);
    };

    Record.prototype.getClassName = function getClassName() {
        return _Transactional.prototype.getClassName.call(this) || 'Model';
    };

    createClass(Record, [{
        key: "__inner_state__",
        get: function () {
            return this.attributes;
        }
    }, {
        key: "changed",
        get: function () {
            let changed = this._changedAttributes;
            if (!changed) {
                const prev = this._previousAttributes;
                changed = {};
                const { _attributes, attributes } = this;
                for (let key of this._keys) {
                    const value = attributes[key];
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
        get: function () {
            return this.attributes[this.idAttribute];
        },
        set: function (x) {
            setAttribute(this, this.idAttribute, x);
        }
    }, {
        key: "collection",
        get: function () {
            return this._ownerKey ? null : this._owner;
        }
    }]);
    return Record;
}(Transactional);
Record = Record_1 = __decorate$3([define({
    cidPrefix: 'm',
    _changeEventName: 'change',
    idAttribute: 'id',
    _keys: ['id']
})], Record);

function begin$1(record) {
    if (_begin(record)) {
        record._previousAttributes = new record.Attributes(record.attributes);
        record._changedAttributes = null;
        return true;
    }
    return false;
}
function markAsDirty$1(record, options) {
    if (record._changedAttributes) {
        record._changedAttributes = null;
    }
    return _markAsDirty(record, options);
}
function cloneAttributes(record, a_attributes) {
    const attributes = new record.Attributes(a_attributes);
    record.forEachAttr(attributes, function (value, name, attr) {
        attributes[name] = attr.clone(value, record);
    });
    return attributes;
}
function setAttribute(record, name, value) {
    const isRoot = begin$1(record),
          options = {},
          { attributes } = record,
          spec = record._attributes[name],
          prev = attributes[name];
    let update;
    if (update = spec.canBeUpdated(prev, value, options)) {
        const nestedTransaction = prev._createTransaction(update, options);
        if (nestedTransaction) {
            nestedTransaction.commit(record);
            if (spec.propagateChanges) {
                markAsDirty$1(record, options);
                trigger3$3(record, 'change:' + name, record, prev, options);
            }
        }
    } else {
        const next = spec.transform(value, options, prev, record);
        attributes[name] = next;
        if (spec.isChanged(next, prev)) {
            spec.handleChange(next, prev, record);
            markAsDirty$1(record, options);
            trigger3$3(record, 'change:' + name, record, next, options);
        }
    }
    isRoot && _commit(record);
}

let RecordTransaction = function () {
    function RecordTransaction(object, isRoot, nested, changes) {
        classCallCheck(this, RecordTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.nested = nested;
        this.changes = changes;
    }

    RecordTransaction.prototype.commit = function commit(initiator) {
        const { nested, object, changes } = this;
        for (let transaction of nested) {
            transaction.commit(object);
        }
        const { attributes, _isDirty } = object;
        for (let key of changes) {
            trigger3$3(object, 'change:' + key, object, attributes[key], _isDirty);
        }
        this.isRoot && _commit(object, initiator);
    };

    return RecordTransaction;
}();

var Record_1;

const { notEqual: notEqual$1, assign: assign$5 } = tools;
let AnyType = function () {
    function AnyType(name, a_options) {
        classCallCheck(this, AnyType);

        this.name = name;
        this.getHook = null;
        const options = this.options = assign$5({ getHooks: [], transforms: [], changeHandlers: [] }, a_options);
        options.getHooks = options.getHooks.slice();
        options.transforms = options.transforms.slice();
        options.changeHandlers = options.changeHandlers.slice();
        const { value, type, parse, toJSON, changeEvents, validate, getHooks, transforms, changeHandlers } = options;
        this.value = value;
        this.type = type;
        this.propagateChanges = changeEvents !== false;
        this.parse = parse;
        this.toJSON = toJSON === void 0 ? this.toJSON : toJSON;
        this.validate = validate || this.validate;
        if (options.isRequired) {
            this.validate = wrapIsRequired(this.validate);
        }
        transforms.unshift(this.convert);
        if (this.get) getHooks.unshift(this.get);
        this.initialize.call(this, options);
        if (getHooks.length) {
            const getHook = this.getHook = getHooks.reduce(chainGetHooks);
            const { validate } = this;
            this.validate = function (record, value, key) {
                return validate.call(this, record, getHook.call(record, value, key), key);
            };
        }
        if (transforms.length) {
            this.transform = transforms.reduce(chainTransforms);
        }
        if (changeHandlers.length) {
            this.handleChange = changeHandlers.reduce(chainChangeHandlers);
        }
    }

    AnyType.create = function create(options, name) {
        const type = options.type,
              AttributeCtor = options._attribute || (type ? type._attribute : AnyType);
        return new AttributeCtor(name, options);
    };

    AnyType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {};

    AnyType.prototype.transform = function transform(value, options, prev, model) {
        return value;
    };

    AnyType.prototype.convert = function convert(value, options, prev, model) {
        return value;
    };

    AnyType.prototype.isChanged = function isChanged(a, b) {
        return notEqual$1(a, b);
    };

    AnyType.prototype.handleChange = function handleChange(next, prev, model) {};

    AnyType.prototype.create = function create() {
        return new this.type();
    };

    AnyType.prototype.clone = function clone(value, record) {
        if (value && typeof value === 'object') {
            if (value.clone) return value.clone();
            const proto = Object.getPrototypeOf(value);
            if (proto === Object.prototype || proto === Array.prototype) {
                return JSON.parse(JSON.stringify(value));
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
        const { name, getHook } = this;
        if (name !== 'id') {
            return {
                set(value) {
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

    AnyType.prototype.initialize = function initialize(name, options) {};

    AnyType.prototype._log = function _log(level, text, value, record) {
        log[level](`[Attribute Update] ${ record.getClassName() }.${ this.name }: ` + text, value, 'Attributes spec:', record._attributes);
    };

    return AnyType;
}();
Record.prototype._attributes = { id: AnyType.create({ value: void 0 }, 'id') };
Record.prototype.defaults = function (attrs = {}) {
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
        return nextHook.call(this, prevHook.call(this, value, name), name);
    };
}
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

const { free: free$1, aquire: aquire$1 } = transactionApi;
let AggregatedType = function (_AnyType) {
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
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge) return next.__inner_state__;
            } else {
                return next;
            }
        }
    };

    AggregatedType.prototype.convert = function convert(value, options, prev, record) {
        if (value == null) return value;
        if (value instanceof this.type) {
            if (value._shared && !(value._shared & ItemsBehavior.persistent)) {
                this._log('error', 'aggregated attribute is assigned with shared collection type', value, record);
            }
            return options.merge ? value.clone() : value;
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
        return this.type.create();
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

let DateType = function (_AnyType) {
    inherits(DateType, _AnyType);

    function DateType() {
        classCallCheck(this, DateType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    DateType.prototype.convert = function convert(value, a, b, record) {
        if (value == null || value instanceof Date) return value;
        const date = new Date(value),
              timestamp = date.getTime();
        if (timestamp !== timestamp) {
            this._log('warn', 'assigned with Invalid Date', value, record);
        }
        return date;
    };

    DateType.prototype.validate = function validate(model, value, name) {
        if (value != null) {
            const timestamp = value.getTime();
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
const msDatePattern = /\/Date\(([0-9]+)\)\//;
let MSDateType = function (_DateType) {
    inherits(MSDateType, _DateType);

    function MSDateType() {
        classCallCheck(this, MSDateType);
        return possibleConstructorReturn(this, _DateType.apply(this, arguments));
    }

    MSDateType.prototype.convert = function convert(value) {
        if (typeof value === 'string') {
            const msDate = msDatePattern.exec(value);
            if (msDate) {
                return new Date(Number(msDate[1]));
            }
        }
        return DateType.prototype.convert.apply(this, arguments);
    };

    MSDateType.prototype.toJSON = function toJSON(value) {
        return value && `/Date(${ value.getTime() })/`;
    };

    return MSDateType;
}(DateType);
let TimestampType = function (_DateType2) {
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
const numericKeys = [1, 4, 5, 6, 7, 10, 11];
const isoDatePattern = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
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

let ConstructorType = function (_AnyType) {
    inherits(ConstructorType, _AnyType);

    function ConstructorType() {
        classCallCheck(this, ConstructorType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    ConstructorType.prototype.convert = function convert(value) {
        return value == null || value instanceof this.type ? value : new this.type(value);
    };

    ConstructorType.prototype.clone = function clone(value) {
        return value && value.clone ? value.clone() : this.convert(JSON.parse(JSON.stringify(value)));
    };

    return ConstructorType;
}(AnyType);

Function.prototype._attribute = ConstructorType;
let PrimitiveType = function (_AnyType2) {
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
let NumericType = function (_PrimitiveType) {
    inherits(NumericType, _PrimitiveType);

    function NumericType() {
        classCallCheck(this, NumericType);
        return possibleConstructorReturn(this, _PrimitiveType.apply(this, arguments));
    }

    NumericType.prototype.convert = function convert(value, a, b, record) {
        const num = value == null ? value : this.type(value);
        if (num !== num) {
            this._log('warn', 'assigned with Invalid Number', value, record);
        }
        return num;
    };

    NumericType.prototype.validate = function validate(model, value, name) {
        if (value != null && !isFinite(value)) {
            return name + ' is not valid number';
        }
    };

    return NumericType;
}(PrimitiveType);
Number._attribute = NumericType;
let ArrayType = function (_AnyType3) {
    inherits(ArrayType, _AnyType3);

    function ArrayType() {
        classCallCheck(this, ArrayType);
        return possibleConstructorReturn(this, _AnyType3.apply(this, arguments));
    }

    ArrayType.prototype.toJSON = function toJSON(value) {
        return value;
    };

    ArrayType.prototype.convert = function convert(value, a, b, record) {
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

const { on: on$4, off: off$4 } = eventsApi;
const { free: free$2, aquire: aquire$2 } = transactionApi;
const shareAndListen = ItemsBehavior.listen | ItemsBehavior.share;
let SharedType = function (_AnyType) {
    inherits(SharedType, _AnyType);

    function SharedType() {
        classCallCheck(this, SharedType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    SharedType.prototype.clone = function clone(value, record) {
        if (!value || value._owner !== record) return value;
        const clone = value.clone();
        aquire$2(record, clone, this.name);
        return clone;
    };

    SharedType.prototype.toJSON = function toJSON() {};

    SharedType.prototype.canBeUpdated = function canBeUpdated(prev, next, options) {
        if (prev && next != null) {
            if (next instanceof this.type) {
                if (options.merge) return next.__inner_state__;
            } else {
                return next;
            }
        }
    };

    SharedType.prototype.convert = function convert(value, options, prev, record) {
        if (value == null || value instanceof this.type) return value;
        const implicitObject = new this.type(value, options, shareAndListen);
        aquire$2(record, implicitObject, this.name);
        return implicitObject;
    };

    SharedType.prototype.validate = function validate(model, value, name) {};

    SharedType.prototype.create = function create() {
        return null;
    };

    SharedType.prototype._handleChange = function _handleChange(next, prev, record) {
        if (prev) {
            if (prev._owner === record) {
                free$2(record, prev);
            } else {
                off$4(prev, prev._changeEventName, this._onChange, record);
            }
        }
        if (next) {
            if (next._owner !== record) {
                on$4(next, next._changeEventName, this._onChange, record);
            }
        }
    };

    SharedType.prototype.dispose = function dispose(record, value) {
        if (value) {
            if (value._owner === record) {
                free$2(record, value);
                value.dispose();
            } else {
                off$4(value, value._changeEventName, this._onChange, record);
            }
        }
    };

    SharedType.prototype.initialize = function initialize(options) {
        const attribute = this;
        this._onChange = this.propagateChanges ? function (child, options, initiator) {
            this === initiator || this.forceAttributeChange(attribute.name, options);
        } : ignore;
        options.changeHandlers.unshift(this._handleChange);
    };

    return SharedType;
}(AnyType);
function ignore() {}

const { assign: assign$6 } = tools;

let ChainableAttributeSpec = function () {
    function ChainableAttributeSpec(options) {
        classCallCheck(this, ChainableAttributeSpec);

        this.options = { getHooks: [], transforms: [], changeHandlers: [] };
        if (options) assign$6(this.options, options);
    }

    ChainableAttributeSpec.prototype.check = function check(_check, error) {
        function validate(model, value, name) {
            if (!_check.call(model, value, name)) {
                const msg = error || _check.error || name + ' is not valid';
                return typeof msg === 'function' ? msg.call(model, name) : msg;
            }
        }
        const prev = this.options.validate;
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
            toJSON: typeof fun === 'function' ? fun : fun ? x => x && x.toJSON() : emptyFunction
        });
    };

    ChainableAttributeSpec.prototype.get = function get$$1(fun) {
        return this.metadata({
            getHooks: this.options.getHooks.concat(fun)
        });
    };

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

    ChainableAttributeSpec.prototype.events = function events(map) {
        const eventMap = new EventMap(map);
        function handleEventsSubscribtion(next, prev, record) {
            prev && prev.trigger && eventMap.unsubscribe(record, prev);
            next && next.trigger && eventMap.subscribe(record, next);
        }
        return this.metadata({
            changeHandlers: this.options.changeHandlers.concat(handleEventsSubscribtion)
        });
    };

    ChainableAttributeSpec.prototype.metadata = function metadata(options) {
        const cloned = new ChainableAttributeSpec(this.options);
        assign$6(cloned.options, options);
        return cloned;
    };

    ChainableAttributeSpec.prototype.value = function value(x) {
        return this.metadata({ value: x });
    };

    createClass(ChainableAttributeSpec, [{
        key: 'isRequired',
        get: function () {
            return this.metadata({ isRequired: true });
        }
    }, {
        key: 'has',
        get: function () {
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
    get() {
        return this._isRequired || this.has.isRequired;
    },
    set(x) {
        this._isRequired = x;
    }
});
Object.defineProperty(Function.prototype, 'has', {
    get() {
        return this._has || new ChainableAttributeSpec({ type: this, value: this._attribute.defaultValue });
    },
    set(value) {
        this._has = value;
    }
});
function toAttributeDescriptor(spec) {
    let attrSpec;
    if (typeof spec === 'function') {
        attrSpec = spec.has;
    } else if (spec && spec instanceof ChainableAttributeSpec) {
        attrSpec = spec;
    } else {
        const type = inferType(spec);
        if (type && type.prototype instanceof Transactional) {
            attrSpec = type.shared.value(spec);
        } else {
            attrSpec = new ChainableAttributeSpec({ type: type, value: spec });
        }
    }
    return attrSpec.options;
}
function inferType(value) {
    switch (typeof value) {
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

const { defaults: defaults$4, isValidJSON: isValidJSON$1, transform: transform$1, log: log$3 } = tools;
const { EventMap: EventMap$1 } = eventsApi;
function compile(rawSpecs, baseAttributes) {
    const myAttributes = transform$1({}, rawSpecs, createAttribute),
          allAttributes = defaults$4({}, myAttributes, baseAttributes),
          Attributes = createCloneCtor(allAttributes),
          mixin = {
        Attributes: Attributes,
        _attributes: new Attributes(allAttributes),
        properties: transform$1({}, myAttributes, x => x.createPropertyDescriptor()),
        defaults: createDefaults(allAttributes),
        _toJSON: createToJSON(allAttributes),
        _localEvents: createEventMap(myAttributes),
        _keys: Object.keys(allAttributes)
    };
    const _parse = createParse(myAttributes, allAttributes);
    if (_parse) {
        mixin._parse = _parse;
    }
    if (!log$3.level) {
        mixin.forEachAttr = createForEach(allAttributes);
    }
    return mixin;
}
function createAttribute(spec, name) {
    return AnyType.create(toAttributeDescriptor(spec), name);
}
function createEventMap(attrSpecs) {
    let events;
    for (var key in attrSpecs) {
        const attribute = attrSpecs[key],
              { _onChange } = attribute.options;
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
    const { local, resolve, tail } = new CompiledReference(ref, true);
    return local ? function (record, value) {
        record[tail](value, key);
    } : function (record, value) {
        resolve(record)[tail](value, key);
    };
}
function createForEach(attrSpecs) {
    let statements = ['var v, _a=this._attributes;'];
    for (let name in attrSpecs) {
        statements.push(`( v = a.${ name } ) === void 0 || f( v, "${ name }", _a.${ name } );`);
    }
    return new Function('a', 'f', statements.join(''));
}
function createCloneCtor(attrSpecs) {
    var statements = [];
    for (let name in attrSpecs) {
        statements.push(`this.${ name } = x.${ name };`);
    }
    var CloneCtor = new Function("x", statements.join(''));
    CloneCtor.prototype = Object.prototype;
    return CloneCtor;
}
function createDefaults(attrSpecs) {
    let assign_f = ['var v;'],
        create_f = [];
    function appendExpr(name, expr) {
        assign_f.push(`this.${ name } = ( v = a.${ name } ) === void 0 ? ${ expr } : v;`);
        create_f.push(`this.${ name } = ${ expr };`);
    }
    for (let name in attrSpecs) {
        const attrSpec = attrSpecs[name],
              { value, type } = attrSpec;
        if (value === void 0 && type) {
            appendExpr(name, `i.${ name }.create()`);
        } else {
            if (isValidJSON$1(value)) {
                appendExpr(name, JSON.stringify(value));
            } else if (value === void 0) {
                appendExpr(name, 'void 0');
            } else {
                appendExpr(name, `i.${ name }.value`);
            }
        }
    }
    const CreateDefaults = new Function('i', create_f.join('')),
          AssignDefaults = new Function('a', 'i', assign_f.join(''));
    CreateDefaults.prototype = AssignDefaults.prototype = Object.prototype;
    return function (attrs) {
        return attrs ? new AssignDefaults(attrs, this._attributes) : new CreateDefaults(this._attributes);
    };
}
function createParse(allAttrSpecs, attrSpecs) {
    var statements = ['var a=this._attributes;'],
        create = false;
    for (let name in allAttrSpecs) {
        const local = attrSpecs[name];
        if (local && local.parse) create = true;
        if (allAttrSpecs[name].parse) {
            const s = `r.${ name } === void 0 ||( r.${ name } = a.${ name }.parse.call( this, r.${ name }, "${ name }") );`;
            statements.push(s);
        }
    }
    if (create) {
        statements.push('return r;');
        return new Function('r', statements.join(''));
    }
}
function createToJSON(attrSpecs) {
    let statements = [`var json = {},v=this.attributes,a=this._attributes;`];
    for (let key in attrSpecs) {
        const toJSON = attrSpecs[key].toJSON;
        if (toJSON) {
            statements.push(`json.${ key } = a.${ key }.toJSON.call( this, v.${ key }, '${ key }' );`);
        }
    }
    statements.push(`return json;`);
    return new Function(statements.join(''));
}

const { assign: assign$3, defaults: defaults$3, omit: omit$2, getBaseClass: getBaseClass$1 } = tools;
Record.define = function (protoProps = {}, staticProps) {
    const BaseConstructor = getBaseClass$1(this),
          baseProto = BaseConstructor.prototype,
          staticsDefinition = getChangedStatics(this, 'attributes', 'collection', 'Collection'),
          definition = assign$3(staticsDefinition, protoProps);
    if ('Collection' in this && this.Collection === void 0) {
        log.error(`[Model Definition] ${ this.prototype.getClassName() }.Collection is undefined. It must be defined _before_ the model.`, definition);
    }
    const dynamicMixin = compile(getAttributes(definition), baseProto._attributes);
    if (definition.properties === false) {
        dynamicMixin.properties = {};
    }
    assign$3(dynamicMixin.properties, protoProps.properties || {});
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
function getAttributes({ defaults, attributes, idAttribute }) {
    const definition = typeof defaults === 'function' ? defaults() : attributes || defaults || {};
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
Object.defineProperties(Date, {
    microsoft: {
        get() {
            return new ChainableAttributeSpec({
                type: Date,
                _attribute: MSDateType
            });
        }
    },
    timestamp: {
        get() {
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
function createSharedTypeSpec(Constructor, Attribute) {
    Constructor.hasOwnProperty('shared') || Object.defineProperty(Constructor, 'shared', {
        get() {
            return new ChainableAttributeSpec({
                value: null,
                type: Constructor,
                _attribute: Attribute
            });
        }
    });
}

const { EventMap: EventMap$2, trigger2: trigger2$4, trigger3: trigger3$4, on: on$5, off: off$5 } = eventsApi;
const { commit: _commit$1, markAsDirty: markAsDirty$2 } = transactionApi;
const _aquire = transactionApi.aquire;
const _free = transactionApi.free;
function dispose(collection) {
    const models = collection.models;
    collection.models = [];
    collection._byId = {};
    freeAll(collection, models);
    return models;
}
function convertAndAquire(collection, attrs, options) {
    const { model } = collection;
    let record;
    if (collection._shared) {
        record = attrs instanceof model ? attrs : model.create(attrs, options);
        if (collection._shared & ItemsBehavior.listen) {
            on$5(record, record._changeEventName, collection._onChildrenChange, collection);
        }
    } else {
        record = attrs instanceof model ? options.merge ? attrs.clone() : attrs : model.create(attrs, options);
        if (!_aquire(collection, record)) {
            const errors = collection._aggregationError || (collection._aggregationError = []);
            errors.push(record);
        }
    }
    const { _itemEvents } = collection;
    _itemEvents && _itemEvents.subscribe(collection, record);
    return record;
}
function free$3(owner, child) {
    if (owner._shared) {
        if (owner._shared & ItemsBehavior.listen) {
            off$5(child, child._changeEventName, owner._onChildrenChange, owner);
        }
    } else {
        _free(owner, child);
    }
    const { _itemEvents } = owner;
    _itemEvents && _itemEvents.unsubscribe(owner, child);
}
function freeAll(collection, children) {
    for (let child of children) {
        free$3(collection, child);
    }
    return children;
}
function sortElements(collection, options) {
    let { _comparator } = collection;
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
function updateIndex(index, model) {
    delete index[model.previous(model.idAttribute)];
    const { id } = model;
    id == null || (index[id] = model);
}
let CollectionTransaction = function () {
    function CollectionTransaction(object, isRoot, added, removed, nested, sorted) {
        classCallCheck(this, CollectionTransaction);

        this.object = object;
        this.isRoot = isRoot;
        this.added = added;
        this.removed = removed;
        this.nested = nested;
        this.sorted = sorted;
    }

    CollectionTransaction.prototype.commit = function commit(initiator) {
        const { nested, object } = this,
              { _isDirty } = object;
        for (let transaction of nested) {
            transaction.commit(object);
        }
        if (object._aggregationError) {
            logAggregationError(object);
        }
        for (let transaction of nested) {
            trigger2$4(object, 'change', transaction.object, _isDirty);
        }
        const { added, removed } = this;
        for (let record of added) {
            trigger3$4(record, 'add', record, object, _isDirty);
            trigger3$4(object, 'add', record, object, _isDirty);
        }
        for (let record of removed) {
            trigger3$4(record, 'remove', record, object, _isDirty);
            trigger3$4(object, 'remove', record, object, _isDirty);
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

const { begin: begin$2, commit: commit$1, markAsDirty: markAsDirty$3 } = transactionApi;
function addTransaction(collection, items, options, merge) {
    const isRoot = begin$2(collection),
          nested = [];
    var added = appendElements(collection, items, nested, options, merge);
    if (added.length || nested.length) {
        let needSort = sortOrMoveElements(collection, added, options);
        if (markAsDirty$3(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, [], nested, needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$1(collection);
}

function sortOrMoveElements(collection, added, options) {
    let at = options.at;
    if (at != null) {
        const length = collection.models.length - added.length;
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
    var { _byId, models } = collection,
        merge = (forceMerge || a_options.merge) && !collection._shared,
        parse = a_options.parse,
        idAttribute = collection.model.prototype.idAttribute,
        prevLength = models.length;
    for (const item of a_items) {
        let model = item ? _byId[item[idAttribute]] || _byId[item.cid] : null;
        if (model) {
            if (merge && item !== model) {
                var attrs = item.attributes || item;
                const transaction = model._createTransaction(attrs, a_options);
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

const { begin: begin$3, commit: commit$2, markAsDirty: markAsDirty$4 } = transactionApi;
const silentOptions$1 = { silent: true };
function emptySetTransaction(collection, items, options, silent) {
    const isRoot = begin$3(collection);
    const added = _reallocateEmpty(collection, items, options);
    if (added.length) {
        const needSort = sortElements(collection, options);
        if (markAsDirty$4(collection, silent ? silentOptions$1 : options)) {
            return new CollectionTransaction(collection, isRoot, added.slice(), [], [], needSort);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$2(collection);
}

function setTransaction(collection, items, options) {
    const isRoot = begin$3(collection),
          nested = [];
    var previous = collection.models,
        added = _reallocate(collection, items, nested, options);
    const reusedCount = collection.models.length - added.length,
          removed = reusedCount < previous.length ? reusedCount ? _garbageCollect(collection, previous) : freeAll(collection, previous) : [];
    const addedOrChanged = nested.length || added.length,
          sorted = sortElements(collection, options) && addedOrChanged || added.length || options.sorted;
    if (addedOrChanged || removed.length || sorted) {
        if (markAsDirty$4(collection, options)) {
            return new CollectionTransaction(collection, isRoot, added, removed, nested, sorted);
        }
        if (collection._aggregationError) logAggregationError(collection);
    }
    isRoot && commit$2(collection);
}

function _garbageCollect(collection, previous) {
    const { _byId } = collection,
          removed = [];
    for (let record of previous) {
        if (!_byId[record.cid]) {
            removed.push(record);
            free$3(collection, record);
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
                const transaction = model._createTransaction(attrs, options);
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

const { trigger2: trigger2$5, trigger3: trigger3$5 } = eventsApi;
const { markAsDirty: markAsDirty$5, begin: begin$4, commit: commit$3 } = transactionApi;
function removeOne(collection, el, options) {
    var model = collection.get(el);
    if (model) {
        const isRoot = begin$4(collection),
              models = collection.models;
        models.splice(models.indexOf(model), 1);
        removeIndex(collection._byId, model);
        const notify = markAsDirty$5(collection, options);
        if (notify) {
            trigger3$5(model, 'remove', model, collection, options);
            trigger3$5(collection, 'remove', model, collection, options);
        }
        free$3(collection, model);
        notify && trigger2$5(collection, 'update', collection, options);
        isRoot && commit$3(collection);
        return model;
    }
}

function removeMany(collection, toRemove, options) {
    const removed = _removeFromIndex(collection, toRemove);
    if (removed.length) {
        const isRoot = begin$4(collection);
        _reallocate$1(collection, removed.length);
        if (markAsDirty$5(collection, options)) {
            const transaction = new CollectionTransaction(collection, isRoot, [], removed, [], false);
            transaction.commit();
        } else {
            isRoot && commit$3(collection);
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
            free$3(collection, model);
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
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { trigger2: trigger2$2, on: on$2, off: off$2 } = eventsApi;
const { begin, commit, markAsDirty } = transactionApi;
const { omit: omit$1, log: log$1, assign: assign$1, defaults: defaults$2 } = tools;
let _count = 0;
const _slice = Array.prototype.slice;

let CollectionRefsType = function (_SharedType) {
    inherits(CollectionRefsType, _SharedType);

    function CollectionRefsType() {
        classCallCheck(this, CollectionRefsType);
        return possibleConstructorReturn(this, _SharedType.apply(this, arguments));
    }

    return CollectionRefsType;
}(SharedType);

CollectionRefsType.defaultValue = [];
let Collection = Collection_1 = function (_Transactional) {
    inherits(Collection, _Transactional);

    function Collection(records, options = {}, shared) {
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
        _this2.idAttribute = _this2.model.prototype.idAttribute;
        _this2._shared = shared || 0;
        if (records) {
            const elements = toElements(_this2, records, options);
            emptySetTransaction(_this2, elements, options, true);
        }
        _this2.initialize.apply(_this2, arguments);
        if (_this2._localEvents) _this2._localEvents.subscribe(_this2, _this2);
        return _this2;
    }

    Collection.prototype.createSubset = function createSubset(models, options) {
        const SubsetOf = this.constructor.subsetOf(this).options.type,
              subset = new SubsetOf(models, options);
        subset.resolve(this);
        return subset;
    };

    Collection.predefine = function predefine$$1() {
        const Ctor = this;
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

    Collection.define = function define$$1(protoProps = {}, staticProps) {
        const staticsDefinition = getChangedStatics(this, 'comparator', 'model', 'itemEvents'),
              definition = assign$1(staticsDefinition, protoProps);
        const spec = omit$1(definition, 'itemEvents');
        if (definition.itemEvents) {
            const eventsMap = new EventMap(this.prototype._itemEvents);
            eventsMap.addEventsMap(definition.itemEvents);
            spec._itemEvents = eventsMap;
        }
        return Transactional.define.call(this, spec, staticProps);
    };

    Collection.prototype.getStore = function getStore() {
        return this._store || (this._store = this._owner ? this._owner.getStore() : this._defaultStore);
    };

    Collection.prototype._onChildrenChange = function _onChildrenChange(record, options = {}, initiator) {
        if (initiator === this) return;
        const { idAttribute } = this;
        if (record.hasChanged(idAttribute)) {
            updateIndex(this._byId, record);
        }
        const isRoot = begin(this);
        if (markAsDirty(this, options)) {
            trigger2$2(this, 'change', record, options);
        }
        isRoot && commit(this);
    };

    Collection.prototype.get = function get$$1(objOrId) {
        if (objOrId == null) return;
        if (typeof objOrId === 'object') {
            const id = objOrId[this.idAttribute];
            return id !== void 0 && this._byId[id] || this._byId[objOrId.cid];
        } else {
            return this._byId[objOrId];
        }
    };

    Collection.prototype.each = function each(iteratee, context) {
        const fun = context !== void 0 ? (v, k) => iteratee.call(context, v, k) : iteratee,
              { models } = this;
        for (let i = 0; i < models.length; i++) {
            fun(models[i], i);
        }
    };

    Collection.prototype.map = function map(iteratee, context) {
        return _map(this.models, iteratee);
    };

    Collection.prototype._validateNested = function _validateNested(errors) {
        if (this._shared) return 0;
        let count = 0;
        this.each(record => {
            const error = record.validationError;
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
        const index = a_index < 0 ? a_index + this.models.length : a_index;
        return this.models[index];
    };

    Collection.prototype.clone = function clone(options = {}) {
        const models = this._shared & ItemsBehavior.share ? this.models : this.map(model => model.clone()),
              copy = new this.constructor(models, { model: this.model, comparator: this.comparator }, this._shared);
        if (options.pinStore) copy._defaultStore = this.getStore();
        return copy;
    };

    Collection.prototype.toJSON = function toJSON() {
        return this.models.map(model => model.toJSON());
    };

    Collection.prototype.set = function set$$1(elements = [], options = {}) {
        if (options.add !== void 0) {
            this._log('warn', "Collection.set doesn't support 'add' option, behaving as if options.add === true.", options);
        }
        if (options.reset) {
            this.reset(elements, options);
        } else {
            const transaction = this._createTransaction(elements, options);
            transaction && transaction.commit();
        }
        return this;
    };

    Collection.prototype.dispose = function dispose$$1() {
        if (this._disposed) return;
        const aggregated = !this._shared;
        for (let record of this.models) {
            free$3(this, record);
            if (aggregated) record.dispose();
        }
        _Transactional.prototype.dispose.call(this);
    };

    Collection.prototype.reset = function reset(a_elements, options = {}) {
        const isRoot = begin(this),
              previousModels = dispose(this);
        if (a_elements) {
            emptySetTransaction(this, toElements(this, a_elements, options), options, true);
        }
        markAsDirty(this, options);
        options.silent || trigger2$2(this, 'reset', this, defaults$2({ previousModels: previousModels }, options));
        isRoot && commit(this);
        return this.models;
    };

    Collection.prototype.add = function add(a_elements, options = {}) {
        const elements = toElements(this, a_elements, options),
              transaction = this.models.length ? addTransaction(this, elements, options) : emptySetTransaction(this, elements, options);
        if (transaction) {
            transaction.commit();
            return transaction.added;
        }
    };

    Collection.prototype.remove = function remove(recordsOrIds, options = {}) {
        if (recordsOrIds) {
            return Array.isArray(recordsOrIds) ? removeMany(this, recordsOrIds, options) : removeOne(this, recordsOrIds, options);
        }
        return [];
    };

    Collection.prototype._createTransaction = function _createTransaction(a_elements, options = {}) {
        const elements = toElements(this, a_elements, options);
        if (this.models.length) {
            return options.remove === false ? addTransaction(this, elements, options, true) : setTransaction(this, elements, options);
        } else {
            return emptySetTransaction(this, elements, options);
        }
    };

    Collection.prototype.pluck = function pluck(key) {
        return this.models.map(model => model[key]);
    };

    Collection.prototype.sort = function sort(options = {}) {
        if (sortElements(this, options)) {
            const isRoot = begin(this);
            if (markAsDirty(this, options)) {
                trigger2$2(this, 'sort', this, options);
            }
            isRoot && commit(this);
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
        const record = this.get(modelOrId);
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

    Collection.prototype._log = function _log(level, text, value) {
        log[level](`[Collection Update] ${ this.model.prototype.getClassName() }.${ this.getClassName() }: ` + text, value, 'Attributes spec:', this.model.prototype._attributes);
    };

    Collection.prototype.getClassName = function getClassName() {
        return _Transactional.prototype.getClassName.call(this) || 'Collection';
    };

    createClass(Collection, [{
        key: "__inner_state__",
        get: function () {
            return this.models;
        }
    }, {
        key: "comparator",
        set: function (x) {
            let compare;
            switch (typeof x) {
                case 'string':
                    this._comparator = (a, b) => {
                        const aa = a[x],
                              bb = b[x];
                        if (aa === bb) return 0;
                        return aa < bb ? -1 : +1;
                    };
                    break;
                case 'function':
                    if (x.length === 1) {
                        this._comparator = (a, b) => {
                            const aa = x.call(this, a),
                                  bb = x.call(this, b);
                            if (aa === bb) return 0;
                            return aa < bb ? -1 : +1;
                        };
                    } else {
                        this._comparator = (a, b) => x.call(this, a, b);
                    }
                    break;
                default:
                    this._comparator = null;
            }
        },
        get: function () {
            return this._comparator;
        }
    }, {
        key: "length",
        get: function () {
            return this.models.length;
        }
    }]);
    return Collection;
}(Transactional);
Collection._attribute = AggregatedType;
Collection = Collection_1 = __decorate$1([define({
    cidPrefix: 'c',
    model: Record,
    _changeEventName: 'changes',
    _aggregationError: null
})], Collection);
function toElements(collection, elements, options) {
    const parsed = options.parse ? collection.parse(elements, options) : elements;
    return Array.isArray(parsed) ? parsed : [parsed];
}
createSharedTypeSpec(Collection, SharedType);
Record.Collection = Collection;
var Collection_1;

function parseReference(collectionRef) {
    switch (typeof collectionRef) {
        case 'function':
            return root => collectionRef.call(root);
        case 'object':
            return () => collectionRef;
        case 'string':
            const { resolve } = new CompiledReference(collectionRef);
            return resolve;
    }
}

let RecordRefType = function (_AnyType) {
    inherits(RecordRefType, _AnyType);

    function RecordRefType() {
        classCallCheck(this, RecordRefType);
        return possibleConstructorReturn(this, _AnyType.apply(this, arguments));
    }

    RecordRefType.prototype.toJSON = function toJSON(value) {
        return value && typeof value === 'object' ? value.id : value;
    };

    RecordRefType.prototype.clone = function clone(value) {
        return value && typeof value === 'object' ? value.id : value;
    };

    RecordRefType.prototype.isChanged = function isChanged(a, b) {
        var aId = a && (a.id == null ? a : a.id),
            bId = b && (b.id == null ? b : b.id);
        return aId !== bId;
    };

    RecordRefType.prototype.validate = function validate(model, value, name) {};

    return RecordRefType;
}(AnyType);

Record.from = function from(masterCollection) {
    const getMasterCollection = parseReference(masterCollection);
    const typeSpec = new ChainableAttributeSpec({
        value: null,
        _attribute: RecordRefType
    });
    return typeSpec.get(function (objOrId, name) {
        if (typeof objOrId === 'object') return objOrId;
        const collection = getMasterCollection(this);
        let record = null;
        if (collection && collection.length) {
            record = collection.get(objOrId) || null;
            this.attributes[name] = record;
            record && this._attributes[name].handleChange(record, null, this);
        }
        return record;
    });
};

var __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const { fastDefaults: fastDefaults$1 } = tools;
Collection.subsetOf = function subsetOf(masterCollection) {
    const SubsetOf = this._SubsetOf || (this._SubsetOf = defineSubsetCollection(this)),
          getMasterCollection = parseReference(masterCollection),
          typeSpec = new ChainableAttributeSpec({
        type: SubsetOf
    });
    return typeSpec.get(function (refs) {
        !refs || refs.resolvedWith || refs.resolve(getMasterCollection(this));
        return refs;
    });
};
function subsetOptions(options) {
    const subsetOptions = { parse: true };
    if (options) fastDefaults$1(subsetOptions, options);
    return subsetOptions;
}
const subsetOfBehavior = ItemsBehavior.share | ItemsBehavior.persistent;
function defineSubsetCollection(CollectionConstructor) {
    let SubsetOfCollection = function (_CollectionConstructo) {
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

        SubsetOfCollection.prototype.toJSON = function toJSON() {
            return this.refs ? this.refs.map(objOrId => objOrId.id || objOrId) : this.models.map(model => model.id);
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
            const { resolvedWith } = this,
                  elements = Array.isArray(raw) ? raw : [raw],
                  records = [];
            if (resolvedWith) {
                for (let element of elements) {
                    const record = resolvedWith.get(element);
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
            get: function () {
                return this.refs || this.models;
            }
        }]);
        return SubsetOfCollection;
    }(CollectionConstructor);
    SubsetOfCollection = __decorate$4([define({})], SubsetOfCollection);
    return SubsetOfCollection;
}

let _store = null;
let Store = function (_Record) {
    inherits(Store, _Record);

    function Store() {
        classCallCheck(this, Store);
        return possibleConstructorReturn(this, _Record.apply(this, arguments));
    }

    Store.prototype.getStore = function getStore() {
        return this;
    };

    Store.prototype.get = function get$$1(name) {
        let local = this[name];
        if (local || this === this._defaultStore) return local;
        return this._owner ? this._owner.get(name) : this._defaultStore.get(name);
    };

    createClass(Store, null, [{
        key: 'global',
        get: function () {
            return _store;
        },
        set: function (store) {
            if (_store) {
                _store.dispose();
            }
            Transactional.prototype._defaultStore = _store = store;
        }
    }]);
    return Store;
}(Record);
Store.global = new Store();

var slice$1 = Array.prototype.slice;

const UnderscoreModel = {
    pick(...args) {
        return _pick(this, args);
    },

    escape(attr) {
        return _escape(this[attr]);
    },

    matches(attrs) {
        return !!_iteratee(attrs, this)(this);
    },

    omit(...keys) {
        return this.mapObject((value, key) => {
            if (keys.indexOf(key) < 0) {
                return value;
            }
        });
    },

    invert() {
        const inverted = {};
        this.each((value, key) => inverted[value] = key);
        return inverted;
    },

    pairs() {
        return this.map((value, key) => [key, value]);
    },

    isEmpty() {
        return !this.values().length;
    } //,

    //  chain(){
    //      return _.chain( this.mapObject( x => x ) );
    //  }
};

const UnderscoreCollection = {
    where(attrs, first) {
        return this[first ? 'find' : 'filter'](attrs);
    },

    findWhere(attrs) {
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
    _each(methods, function ({ l, m }, methodName) {
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
    switch (typeof iteratee) {
        case 'function':
            return iteratee;
        case 'string':
            return model => model.get(iteratee);
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
