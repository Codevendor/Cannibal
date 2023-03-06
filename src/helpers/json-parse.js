'use strict';

/**
 * Parses json safely or returns error.
 * @category helpers
 * @function jsonParse
 * @param {string} text - The string to parse as JSON.
 * @param {(undefined|function)} reviver - If a function, this prescribes how the value originally produced by parsing is transformed, before being returned.
 * @returns {object} - An object with properties err and data.
 */
export function jsonParse(text, reviver = undefined) {

    const obj = { 'err': false, 'data': null };

    try {

        obj.data = JSON.parse(text, reviver);

    } catch (err) {

        obj.err = err;

    }

    return obj;

}