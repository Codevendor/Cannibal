'use strict';

import fs from "node:fs";

// InferJS
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

/**
 * Checks if a file exists.
 * @param {string} filePath - The file to check if exists.
 * @returns {boolean} - Whether the file exists.
 * @inferid fsa.fileExists
 */
export function fileExists(filePath) {

    // InferJS Type Check
    inferjs.check('fsa.fileExists', arguments);

    return new Promise((resolve) => {

        fs.access(filePath, fs.constants.F_OK, err => {
          resolve(!err);
        });

    });

}