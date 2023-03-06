'use strict';

/**
 * Sleep a number of milliseconds.
 * @param {number} ms The milliseconds to sleep.
 * @returns {object} An object containing the results.
 */
export function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve();

        }, ms);

    });

}