'use strict';

// Imports
import * as fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * The fs.readdir() method is used to asynchronously read the contents of a given directory. The callback of this method returns an array of all the file names in the directory. The options argument can be used to change the format in which the files are returned from the method.
 * @param {string} path The path to the file to remove.
 * @returns {object} An object containing the results. 
 * @infer {string} path {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.readDir
 */
export function readDir(path) {

    // InferJS Type Check
    inferjs.check('fsa.readDir', arguments);

    return new Promise(resolve => {

        fs.readdir(path, (err, files) => {

            const o = {

                "err": err,
                "files": files

            };

            // Good resolve.
            resolve(o);

        });

    });
}