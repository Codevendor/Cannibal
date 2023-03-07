'use strict';

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Sleep a number of milliseconds.
 * @param {number} ms The milliseconds to sleep.
 * @returns {object} An object containing the results.
 * @inferid fsa.sleep
 */
export function sleep(ms) {

    // InferJS Type Check
    inferjs.check('fsa.sleep', arguments);

    return new Promise(resolve => {

        setTimeout(() => {

            resolve();

        }, ms);

    });

}