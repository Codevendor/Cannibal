'use strict';

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Parses json safely or returns error.
 * @category helpers
 * @function jsonParse
 * @param {string} text - The string to parse as JSON.
 * @param {(undefined|function)} reviver - If a function, this prescribes how the value originally produced by parsing is transformed, before being returned.
 * @returns {object} - An object with properties err and data.
 * @infer {string} text {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid helpers.jsonParse
 */
export function jsonParse(text, reviver = undefined) {

    // InferJS Type Check
    inferjs.check('helpers.jsonParse', arguments);

    const obj = { 'err': false, 'data': null };

    try {

        obj.data = JSON.parse(text, reviver);

    } catch (err) {

        obj.err = err;

    }

    return obj;

}