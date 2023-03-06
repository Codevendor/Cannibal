'use strict';

// Imports
import { getFile } from "./get-file.js";
import { jsonParsePromise } from "../helpers/json-parse-promise.js";

/**
 * Gets a json file as object in an async way.
 * @param {string} filePath The file to get json data from.
 * @returns {object} Object containing properties {err, data}
 */
export async function getJsonFile(filePath) {

    // Get the file
    const obj = await getFile(filePath);

    // If has err then return
    if (obj.err) { return obj; }

    // Process json data
    return await jsonParsePromise(obj.data);

}