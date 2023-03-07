'use strict';

// Imports
import { exec } from 'node:child_process';

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Executes a terminal command async.
 * @param {string} cmd - The command to execute.
 * @returns {object} An object containing the results.
 * @infer {string} cmd {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.exec
 */
export function exec(cmd) {

    // InferJS Type Check
    inferjs.check('fsa.exec', arguments);

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
