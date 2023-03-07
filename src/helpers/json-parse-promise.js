'use strict';

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Parses a json string in an async way with promise.
 * @category helpers
 * @function jsonParsePromise
 * @param {string} text - The string to parse as JSON.
 * @param {(undefined|function)} reviver - If a function, this prescribes how the value originally produced by parsing is transformed, before being returned.
 * @returns {Promise} - An object with properties err and data.
 * @infer {string} text {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid helpers.jsonParsePromise
 */
export function jsonParsePromise(text, reviver = undefined) {
    
    // InferJS Type Check
    inferjs.check('helpers.jsonParsePromise', arguments);

    // Return a promise.
    return new Promise((resolve) => {
        
        //Declare Variables 
        const obj = { "err": false, "data": null };

        try {

            // Parse the json string. 
            obj.data = JSON.parse(text, reviver);

        } catch (err) {

            // Capture error. 
            obj.err = err;

        }

        // Resolve json_result. 
        resolve(obj);

    });
};