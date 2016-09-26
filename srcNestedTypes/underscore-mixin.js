//import * as _ from 'underscore'
import {
  forEach,
  each,
  map,
  reduce,
  find,
  findIndex,
  findLastIndex,
  filter,
  every,
  some,
  includes,
  invoke,
  max,
  min,
  toArray,
  head,
  tail,
  last,
  without,
  difference,
  indexOf,
  lastIndexOf,
  isEmpty,
  sample,
  partition,
  groupBy,
  countBy,
  sortBy,
  pick,
  escape,
  iteratee,
  matches
} from 'lodash';

var slice = Array.prototype.slice;

export const UnderscoreModel = {
    pick( ...args ){
        return pick( this, args );
    },

    escape( attr ){
        return escape( this[ attr ] );
    },

    matches( attrs ){
        return !!iteratee( attrs, this )( this );
    },

    omit( ...keys ) {
        return this.mapObject( ( value, key ) => {
            if( keys.indexOf( key ) < 0 ){
                return value;
            }
        });
    },

    invert(){
        const inverted = {};
        this.each( ( value, key ) => inverted[ value ] = key );
        return inverted;
    },

    pairs(){
        return this.map( ( value, key ) => [ key, value ] );
    },

    isEmpty(){
        return !this.values().length;
    }//,

  //  chain(){
  //      return _.chain( this.mapObject( x => x ) );
  //  }
};

export const UnderscoreCollection = {
    where(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    findWhere(attrs) {
      return this.where(attrs, true);
    }
};

addUnderscoreMethods( UnderscoreCollection, 'models', {
    forEach  : { l:3, m:forEach },
//  each : { l:3, m: each},
    map : { l:3, m:map },
//  collect : { l:3, m: collect},
    reduce : { l:4, m:reduce },
//  foldl    : { l:4, m: foldl},
//  inject : { l:4, m: inject},
//  reduceRight : { l:4, m: reduceRight},
//  foldr : { l:4, m: foldr},
    find : { l:3, m:find },
    findIndex : { l:3, m:findIndex },
    findLastIndex : { l:3, m:findLastIndex },
//  detect : { l:3, m: detect},
    filter : { l:3, m:filter },
//  select   : { l:3, m: select},
//  reject : { l:3, m: reject},
    every : { l:3, m:every },
//  all : { l:3, m:all },
    some : { l:3, m:some },
//  any : { l:3, m:any },
//  include : { l:3, m:include },
    includes : { l:3, m:includes },
//  contains : { l:3, m:contains },
    invoke : { l:0, m:invoke },
    max : { l:3, m:max },
    min : { l:3, m:min },
    toArray : { l:1, m:toArray },
//  size : { l:1, m:size },
//  first : { l:3, m:first },
    head     : { l:3, m:head },
//  take : { l:3, m:take },
//  initial : { l:3, m:initial },
//  rest : { l:3, m:rest },
    tail : { l:3, m:tail },
//  drop : { l:3, m:drop },
    last : { l:3, m:last },
    without  : { l:0, m:without },
    difference : { l:0, m:difference },
    indexOf : { l:3, m:indexOf },
//  shuffle : { l:1, m: shuffle},
    lastIndexOf : { l:3, m:lastIndexOf },
    isEmpty  : { l:1, m:isEmpty },
//  chain : { l:1, m:chain },
    sample : { l:3, m:sample },
    partition : { l:3, m:partition },
    groupBy : { l:3, m:groupBy },
    countBy : { l:3, m:countBy },
    sortBy   : { l:3, m:sortBy },
//  indexBy : { l:3, m:indexBy }
});

function addUnderscoreMethods(Mixin, attribute, methods ) {
    each(methods, function({l, m}, methodName) {
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
        case 1: return function() {
            return method(this[attribute]);
        };
        case 2: return function(value) {
            return method(this[attribute], value);
        };
        case 3: return function(iteratee, context) {
            var value = this[ attribute ],
                callback = cb(iteratee, this);

            return arguments.length > 1 ?
                   method( value, callback, context)
                : method( value, callback );
        };
        case 4: return function(iteratee, defaultVal, context) {
            var value = this[ attribute ],
                callback = cb(iteratee, this);

            return arguments.length > 1 ?
                   method( value, callback, defaultVal, context )
                : method(value, callback );
        };
        default: return function() {
            var args = slice.call(arguments);
            args.unshift(this[attribute]);
            return method.apply(method, args);
        };
    }
}

// Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
function cb(iteratee, instance) {
    switch( typeof iteratee ){
        case 'function' : return iteratee;
        case 'string' : return model => model.get( iteratee );
        case 'object' :
            if( !(iteratee instanceof instance.model )) return matches( iteratee );
    }

    return iteratee;
}
