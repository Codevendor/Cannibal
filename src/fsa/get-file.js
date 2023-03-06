'use strict';

// Imports
import { stat } from "./stat.js";
import { readFile } from "./read-file.js";

/**
 * Gets file data in an async way.
 * @param {string} filePath The file to get data from.
 * @returns {object} Object containing properties {err, data}
 */
export async function getFile(filePath) {

    // Create the return object
    const obj = { 'err': null, 'data': '' };

    // Get whether the file exists.
    const obj1 = await stat(filePath);

    // Check for file error
    if (obj1.err) { obj.err = obj1.err; return obj; }

    // Check if file path is a file
    if (!obj1.stats.isFile()) { obj.err = `File (${filePath}) not found!`; return obj; }

    // Load file
    const obj2 = await readFile(filePath, 'binary');

    // Check for file error
    if (obj2.err) { obj.err = obj2.err; return obj; }

    // Set object data
    obj.data = obj2.data;

    // Return object
    return obj;

}