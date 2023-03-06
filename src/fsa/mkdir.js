'use strict';

// Imports
import * as fs from "node:fs";

/**
 * Creates a new directory.
 * @param {string} path The folder path.
 * @param {object} mode For setting the mode.
 * @returns {object} An object containing the results.
 */
export function mkdir(path, mode) {

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