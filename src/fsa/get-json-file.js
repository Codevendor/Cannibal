'use strict';

// Imports
import { getFile } from "./get-file.js";
import { jsonParsePromise } from "../helpers/json-parse-promise.js";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Gets a json file as object in an async way.
 * @param {string} filePath The file to get json data from.
 * @returns {object} Object containing properties {err, data}
 * @infer {string} filePath {STRING-NOT-EMPTY} - Checks if string is not empty.
 * @inferid fsa.getJsonFile
 */
export async function getJsonFile(filePath) {

    // InferJS Type Check
    inferjs.check('fsa.getJsonFile', arguments);

    // Get the file
    const obj = await getFile(filePath);

    // If has err then return
    if (obj.err) { return obj; }

    // Process json data
    return await jsonParsePromise(obj.data);

}