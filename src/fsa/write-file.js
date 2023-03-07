'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Writes a file.
 * @param {string} file The path to the file to write to.
 * @param {string} data The data to write.
 * @param {object} options The options for writing.
 * @returns {object} An object containing the results.
 * @infer {string} file {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @infer {string} data {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.writeFile
 */
export function writeFile(file, data, options) {

    // InferJS Type Check
    inferjs.check('fsa.writeFile', arguments);

    return new Promise(resolve => {

        fs.writeFile(file, data, options, (err) => {

            const o = {

                "err": err

            };

            // Good resolve.
            resolve(o);

        });

    });

}