'use strict';

// Imports
import * as fs from "node:fs";

/**
 * Writes a file.
 * @param {string} file The path to the file to write to.
 * @param {string} data The data to write.
 * @param {object} options The options for writing.
 * @returns {object} An object containing the results.
 */
export function writeFile(file, data, options) {

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