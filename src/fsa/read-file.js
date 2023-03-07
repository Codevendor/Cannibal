'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * 
 * @param {string} file The path to the file to read.
 * @param {object} options The read file options.
 * @returns {object} An object containing the results.
 * @infer {string} file {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.readFile
 */
export function readFile(file, options) {

    // InferJS Type Check
    inferjs.check('fsa.readFile', arguments);

    return new Promise(resolve => {

        fs.readFile(file, options, function (err, data) {

            const o = {

                "err": err,
                "data": data

            };

            // Good resolve.
            resolve(o);

        });

    });

}