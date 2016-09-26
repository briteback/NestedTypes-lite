/**
 * Prepare backbone View, Router, History, and Events.
 */
import { Mixable, Model, Collection, Events, define, tools } from '../dist/index.js'
//export = Nested;
//import * as Backbone from './backbone'
//import { RestCollection, RestModel } from './rest'
//import { Store } from '../type-r/src'
//import * as Sync from './sync'
import { UnderscoreModel, UnderscoreCollection } from './underscore-mixin'
//import { RestStore, LazyStore } from './rest-store'

Mixable.mixins( Events );
//Nested.Mixable.mixTo( Backbone.View, Backbone.Router, Backbone.History );

Model.mixins( UnderscoreModel );
Collection.mixins( UnderscoreCollection );

//const { assign } = Nested.tools;

/**
 * Prepare
 */

// allow sync and jQuery override
//Object.defineProperties( Nested, {
//    'emulateHTTP'  : linkProperty( Backbone, 'emulateHTTP' ),
//    'emulateJSON'  : linkProperty( Backbone, 'emulateJSON' ),
//    'sync'         : linkProperty( Sync, 'sync' ),
//    'errorPromise' : linkProperty( Sync, 'errorPromise' ),
//    'ajax'         : linkProperty( Sync, 'ajax' ),
//    'history'      : linkProperty( Backbone, 'history' ),
//    'store'        : linkProperty( Store, 'global' ),
//    '$' : {
//        get(){ return Backbone.$; },
//        set( value ){ Backbone.$ = Sync.$ = value; }
//    }
//} );

//assign( Nested, Backbone, {
//    Backbone  : Backbone,
//    Class     : Nested.Messenger,
//    Model     : RestModel,
//    Collection : RestCollection,
//    LazyStore  : LazyStore,
//    Store     : RestStore,

//    defaults( x ){
//        return Nested.Model.defaults( x );
//    }
//} );

function linkProperty( Namespace, name ){
    return {
        get : function(){ return Namespace[ name ]; },
        set : function( value ){ Namespace[ name ] = value; }
    };
}

export { Mixable, Model, Collection, Events, define, tools };
