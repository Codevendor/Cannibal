'use strict';

/**
 * Class for creating enumerations.
 * @class enums
 * @category core
 * @inferid core.enums
 */
export class enums {

    /** 
     * Static method for getting the class type name. 
     * @static
     * @returns {string} The class type name. 
     */
    static get type() { return this.constructor.name; }

    /**
     * Creates an enumeration from an object.
     * @static
     * @param {object} obj - The object to enumerate. 
     * @returns {object} - Returns a frozen object enumeration.
     * @memberof enums
     */
    static create(obj) {

        let i = Object
            .keys(obj)
            .reduce((o, k) => (o[obj[k]] = k, o), {});

        return Object.freeze(Object.keys(obj).reduce((o, k) => (o[k] = obj[k], o), v => i[v]));

    }

    /**
     * For finding the string of an enumeration by index value.
     * @static
     * @param {object} obj - The enumeration object.
     * @param {integer} value - The index value to find. 
     * @returns {string} - The string from the enumeration index value.
     * @memberof enums
     */
    static key(obj, value) {

        return Object.keys(obj)[Object.values(obj).indexOf(value)];

    }

    /**
     * Finds the key by name and returns its value.
     * @param {object} obj - The enumeration object.
     * @param {string} key The key to find.
     * @returns {string} - The value of the key.
     */
    static find(obj, key) {

        key = key.toLocaleUpperCase();

        for (let [key2, value] of Object.entries(obj)) {

            if (key === key2) { return value; }

        }

        return 0;

    }

};