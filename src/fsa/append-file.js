'use strict';

// Imports
import * as fs from "node:fs";

/**
 * Appends text to a file.
 * @param {string} path The file path to append to.
 * @param {string} data The data to append.
 * @param {object} options The file options.
 * @returns {object} An object containing the results.
 * 
*/
export function appendFile(path, data, options) {

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
