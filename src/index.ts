/**
 * Export everything
 */
export * from './object-plus/index'
export * from './collection/index'
export * from './relations/index'
export * from './record/index'

// Exported module itself is the global event bus.
import { Events } from './object-plus/index'
export const { on, off, trigger, once, listenTo, stopListening, listenToOnce } = Events;

// Define synonims for NestedTypes backward compatibility.
import { Record as Model } from './record/index'
import { Mixable as Class } from './object-plus/index'
export { Model, Class };

import { ChainableAttributeSpec } from './record/index'

/** Typeless attribute declaration with default value. */
export function value( x : any ) : ChainableAttributeSpec {
    return new ChainableAttributeSpec({ value : x });
}

/** Wrap model or collection method in transaction. */
export function transaction< F extends Function >( method : F ) : F {
    return <any>function( ...args ){
        let result;

        this.transaction( () => {
            result = method.apply( this, args );
        });

        return result;
    }
}
