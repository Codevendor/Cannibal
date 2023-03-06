'use strict';

// Imports
import { exec } from 'node:child_process';

/**
 * Executes a terminal command async.
 * @param {string} cmd - The command to execute.
 * @returns {object} An object containing the results.
 */
export function exec(cmd) {

    return new Promise(resolve => {

        exec(cmd, (err, stdout, stderr) => {

            const o = {

                "err": err,
                "stdout": stdout,
                "stderr": stderr

            };

            // Good resolve.
            resolve(o);

        });

    });

}
