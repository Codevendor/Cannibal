'use strict';

// Imports
import * as fs from "node:fs";

/**
 * Removes a file by path.
 * @param {string} path The path to the file to remove.
 * @returns {object} An object containing the results. 
 */
export function unlink(path) {

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