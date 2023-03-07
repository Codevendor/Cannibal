'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Creates a new directory.
 * @param {string} path The folder path.
 * @param {integer|object} mode For setting the mode.
 * @returns {object} An object containing the results.
 * @infer {string} path {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.mkdir
 */
export function mkdir(path, mode) {

    // InferJS Type Check
    inferjs.check('fsa.mkdir', arguments);

    return new Promise(resolve => {

        fs.mkdir(path, mode, (err) => {

            const o = {

                "err": err

            };

            // Good resolve.
            resolve(o);

        });

    });

}