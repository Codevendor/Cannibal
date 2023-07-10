'use strict';

/**
 * Creates multi inheritance by chaining class bases.
 * @function classes
 * @category core
 * @param {...*} bases - The classes to extend.
 * @returns {object} - A mixed class.
 */
export function classes(...bases) {

  // The keys
  const keys = [];

  // The source mix to return.
  const src = class mix { };

  // Adds properties to the mix
  const addProperties = (base) => {

    const baseObj = new base();
    const items = Reflect.ownKeys(baseObj);

    // Add properties
    items.map(key => {

      // Add key to array
      if (!keys.includes(key)) keys.push(key);

      const value = Reflect.getOwnPropertyDescriptor(baseObj, key);
      Reflect.defineProperty(src.prototype, key, value);

    });

  };

  // Adds methods to the mix.
  const addMethods = (base) => {

    for (const key of Reflect.ownKeys(base.prototype)) {

      // Add functions
      if (key !== 'constructor') {

        // Add key to array
        if (!keys.includes(key)) keys.push(key);

        const value = Reflect.getOwnPropertyDescriptor(base.prototype, key);
        Reflect.defineProperty(src.prototype, key, value);

      }

    }

  };

  // Add the properties and methods
  for (const base of bases) {

    // Add the properties
    addProperties(base);

    // Add Methods
    addMethods(base);

  }

  // Create a mixer proxy class
  const mixer = class mixer {

    // Constructor
    constructor() {

      return new Proxy(new src(), {

        set(target, key, value) {
          if (target[key] === value) {
            return true;
          }
          console.log(`Property (${key}) is modified`);

          return Reflect.set(target, key, value);

        },

        get(target, key) {

          switch (key) {

            // Gets the keys of the proxy object
            case 'ownKeys': return () => { return keys; };

            default:
              if (!Reflect.has(target, key)) throw new SyntaxError(`Key (${key}) is missing from object.`);
              return Reflect.get(target, key);
          }

        }

      });

    }

  }

  return mixer;

}