'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Removes a file by path.
 * @param {string} path The path to the file to remove.
 * @returns {object} An object containing the results. 
 * @infer {string} path {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.unlink
 */
export function unlink(path) {

    // InferJS Type Check
    inferjs.check('fsa.unlink', arguments);

    return new Promise(resolve => {

        fs.unlink(path, (err) => {

            const o = {

                "err": err

            };

            // Good resolve.
            resolve(o);

        });

    });
}