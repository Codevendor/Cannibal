'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Gets stats on a file or folder.
 * @param {string} path The file or folder path to get stats from.
 * @param {object} options The options for optional parameters.
 * @returns {object} An object containing the results.
 * @infer {string} path {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.stat
 */
export function stat(path, options) {

    // InferJS Type Check
    inferjs.check('fsa.stat', arguments);

    return new Promise(resolve => {

        fs.stat(path, options, (err, stats) => {

            const o = {

                "err": err,
                "stats": stats

            };

            // Good resolve.
            resolve(o);

        });

    });

}