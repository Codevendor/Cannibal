'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
* Appends text to a file.
* @param {string} path - The file path to append to.
* @param {string} data - The data to append.
* @param {object} options - The file options.
* @returns {object} An object containing the results.
* @infer {string} path {STRING-NOT-EMPTY} - Checks if string is not empty.
* @infer {string} data {STRING-NOT-EMPTY} - Checks if string is not empty.
* @inferid fsa.appendFile 
*/ 
export function appendFile(path, data, options) {

    // InferJS Type Check
    inferjs.check('fsa.appendFile', arguments);

    return new Promise(resolve => {

        fs.appendFile(path, data, options, (err) => {

            const o = {

                "err": err

            };

            // Good resolve.
            resolve(o);

        });

    });
}
