/*
 * How to include files
 * Include files !INCLUDE './configs/hosts/*.ini'
 */

'use strict';

// Imports
import * as fs from "node:fs";
import path from "node:path";
import { lstat, readFile } from "../fsa/fsa.js";
import { typeOf, jsonParse } from "../helpers/helpers.js";

// Infers
import { InferObject } from "../../infer-objects/infer-object.js";
import { InferJS } from "inferjs";
const inferjs = new InferJS(InferObject);

// Regex
const REG_SECTION = /^\[\s{0,}([^\]]+)\s{0,}\]\s{0,}#{0,}(.*)?/mis;
const REG_KEY_VALUE = /^([^\s=]+)\s{0,}=\s{0,}(.*?)$/mis;
const REG_COMMAND = /^!([^\s]+)\s{0,}(.*?)$/mis;

/**
 * For parsing ini files.
 * @class iniParser
 * @category parsers
 * @inferid iniParser
 */
export class iniParser {

    // The context of the parsed ini file. 
    #context = null;
    #fileOptions = null;
    #statOptions = null;
    #fileList = null;

    /** 
     * Constructor for iniParser. 
     * @inferid iniParser.constructor
     */
    constructor() {

        this.reset();
    }

    /**
     * Resets the ini parser.
     * @inferid iniParser.reset
     */
    reset() {

        // Set defaults
        this.#context = {
            file: '',
            err: null,
            stats: null,
            data: null
        };

        this.#fileOptions = { encoding: 'utf8' };
        this.#statOptions = {};
        this.#fileList = [];
    }

    /**
     * Parses an ini file in an async way.
     * @param {string} file - The ini file path to parse.
     * @param {(undefined|null|object)} fileOptions - The file options for the read file. 
     * @param {(undefined|null|object)} statOptions - The options for the file stat.
     * @returns {object} - Returns the context object.
     * @infer {string} file {STRING-NOT-EMPTY} - Checks if string is not empty.
     * @inferid iniParser.parseFile
     */
    async parseFile(file, fileOptions = null, statOptions = null) {

        // InferJS Type Check
        inferjs.check('iniParser.parseFile', arguments);

        // Reset 
        this.reset();

        // Set globals
        if (typeOf(fileOptions) === 'object') {
            this.#fileOptions = fileOptions;
        }

        if (typeOf(statOptions) === 'object') {
            this.#statOptions = statOptions;
        }

        // Correct file path
        if (!path.isAbsolute(file)) {
            this.#context.file = path.normalize(path.resolve(file));
        }

        const results = await lstat(this.#context.file, this.#statOptions);
        this.#context.stats = results.stats;

        if (this.#context.stats.err) {

            this.#context.err = this.#context.stats.err;
            return this.#context;
        }

        if (!this.#context.stats || !this.#context.stats.isFile()) {

            this.#context.err = new Error(`Parameter 'file' must be a valid .ini to parse!`);
            return this.#context;
        }

        // Read file
        const results2 = await readFile(this.#context.file, this.#fileOptions);

        if (results2.err) {

            this.#context.err = results2.err;
            return this.#context;
        }

        // Everthing good parse
        this.parseString(results2.data.toString());

        // Return context
        return this.#context;
    }

    /**
     * Parses the ini file in a sync way.
     * @param {string} file - The ini file path to parse.
     * @param {(undefined|null|object)} fileOptions - The file options for the read file. 
     * @param {(undefined|null|object)} statOptions - The options for the file stat.
     * @returns {object} - Object containing errors, properties and data from the parsed ini file.
     * @infer {string} file {STRING-NOT-EMPTY} - Checks if string is not empty.
     * @inferid iniParser.parseFileSync
     */
    parseFileSync(file, fileOptions = null, statOptions = null) {

        // InferJS Type Check
        inferjs.check('iniParser.parseFileSync', arguments);

        // Reset 
        this.reset();

        // Set globals
        if (typeOf(fileOptions) === 'object') {
            this.#fileOptions = fileOptions;
        }

        if (typeOf(statOptions) === 'object') {
            this.#statOptions = statOptions;
        }

        // Correct file path
        if (!path.isAbsolute(file)) {
            this.#context.file = path.normalize(path.resolve(file));
        }

        try {

            this.#context.stats = fs.lstatSync(this.#context.file, this.#statOptions);

            if (!this.#context.stats || !this.#context.stats.isFile()) {
                this.#context.err = new Error(`Parameter 'file' must be a valid .ini to parse!`);
                return this.#context;
            }

            // Read file
            const results = fs.readFileSync(this.#context.file, this.#fileOptions);

            // Parse data string
            this.parseString(results.toString());

        } catch (err) {

            // Add error
            this.#context.err = err;

        }

        // Return context object
        return this.#context;

    }

    /**
     * Creates a property and a value in an object.
     * @param {object} object - The object to create the property and value in.
     * @param {array} arrayPath - The array path of nested properties.
     * @param {any} value - The value to set the property with.
     * @param {boolean} overwrite - Whether to overwrite property if one exists.
     * @param {number} limit - The limit of the path.
     * @returns {object} - A Object
     * @inferid iniParser.setValue
     */
    #setValue(object, arrayPath, value, overwrite = false, limit) {

        const keys = arrayPath.slice(0, limit);
        const last = keys.pop();

        const obj = keys.reduce((o, k) => o[k] = o[k] || {}, object);
        if (overwrite || !obj.hasOwnProperty(last)) {
            obj[last] = value;
        }

        return object;

    }

    /**
     * Creates a section in the context object.
     * @param {array} section - The section to create.
     * @inferid iniParser.#createSection
     */
    #createSection(section) {

        if (!Array.isArray(section)) return;

        // Make a copy
        let section2 = Array.from(section);

        // Get the end of array index
        const eoa = section2.length - 1;

        // Check if sub section by dot
        if (section2[eoa].startsWith('.')) {

            section2 = section2.concat(section2.pop().slice(1).split('.'))

        }

        // Create values in context
        this.#setValue(this.#context.data, section2, {}, false);

    }

    /**
     * Creates a new property in the context object.
     * @param {array} currentSection - The current section path.
     * @param {string} key - The property key to create.
     * @param {any} value - The property value to assign.
     * @returns {property} - Returns the new property.
     * @inferid iniParser.#createProperty
     */
    #createProperty(currentSection, key, value) {

        if (!Array.isArray(currentSection)) return;

        // Check if global
        if (currentSection.length === 0) {

            // Add global to section
            currentSection.push('');

        }

        let section = Array.from(currentSection);

        // Get the end of array index
        const eoa = section.length - 1;

        // Check if sub section by dot
        if (section[eoa].startsWith('.')) {

            section = section.concat(section.pop().slice(1).split('.'))

        }

        const last_obj = section.reduce((src, key2) => src[key2] = src[key2] || {}, this.#context.data);

        if (Array.isArray(value) && Array.isArray(last_obj[key])) {

            last_obj[key] = last_obj[key].concat(value);

        } else if (Array.isArray(value) && last_obj[key] === undefined) {

            last_obj[key] = [];
            last_obj[key] = last_obj[key].concat(value);

        } else {

            last_obj[key] = value;

        }

        return last_obj[key];

    }


    /**
     * Includes an ini file or directory
     * @param {string} includePath - A file or folder path.
     * @returns {array} - Returns an array of line objects.
     * @inferid iniParser.#include
     */
    #include(includePath) {

        // Variables
        let lineNumber = 0;

        const obj = {
            data: null,
            err: null
        }

        try {

            // Correct file path
            if (!path.isAbsolute(includePath)) {
                includePath = path.normalize(path.resolve(includePath));
            }

            // Check if all files in directory or all files in directory with ext ini
            const pathArray = includePath.split(path.sep);
            const pathEnd = pathArray.pop();
            let anyFile = false;
            let pathExt = '';

            // Get the ext from file
            if (pathEnd.startsWith('*')) {
                anyFile = true;
                pathExt = pathEnd.slice(1).trim();
                includePath = pathArray.join(path.sep);
            }

            const stats = fs.lstatSync(includePath, this.#statOptions);

            if (!stats) {
                obj.err = new Error(`!INCLUDE 'includePath' must be a valid .ini file or directory of ini files!`);
                return obj;
            }

            if (stats.isDirectory()) {

                // Add slash to end if doesnt exist
                if (!includePath.endsWith(path.sep)) includePath += path.sep;

                // Read directory
                let files = fs.readdirSync(includePath);
                if (!files) {

                    obj.err = new Error(`!INCLUDE 'includePath' must be a valid directory of ini files!`);
                    return obj;
                }

                // Check if specific filtered extension
                if (pathExt !== '') {

                    files = files.filter(function (file) {

                        if (file.endsWith(pathExt)) return file;

                    });

                }

                let fileData = [];

                files.forEach((file) => {

                    // Add to path
                    file = includePath + file;

                    // Add file to file list
                    this.#fileList.push(file);

                    // Read file
                    let data = fs.readFileSync(file, this.#fileOptions);

                    // Rebuild array with lines and line numbers
                    lineNumber = 0;
                    data = data.split("\n").map(line => {
                        lineNumber++;
                        return {
                            lineNumber: lineNumber,
                            line: line,
                            file: this.#fileList.length - 1
                        };
                    });

                    fileData = fileData.concat(data);

                });

                obj.data = fileData;
                return obj;

            } else {

                // Add file to file list
                this.#fileList.push(includePath);

                // Read file
                let data = fs.readFileSync(includePath, this.#fileOptions);

                // Rebuild array with lines and line numbers
                lineNumber = 0;
                data = data.split("\n").map(line => {
                    lineNumber++;
                    return {
                        lineNumber: lineNumber,
                        line: line,
                        file: this.#fileList.length - 1
                    };
                });

                obj.data = data;

            }

        } catch (err) {
            obj.err = err;
        }

        return obj;

    }

    /**
     * Corrects the string into json type.
     * @param {string} lineValue - The lineValue to rip.
     * @returns {string} - Returns the ripped string value.
     * @inferid iniParser.#ripType
     */
    #ripType(lineValue) {

        // Variables
        let str = '';
        let char = '';
        let pos = 0;

        // Trim String
        lineValue = lineValue.trim();

        // Get starting character
        let start = '';
        if (lineValue[0] === '"') {
            start = '"';
            pos = 1;
        } else if (lineValue[0] === '`') {
            start = '`';
            pos = 1;
        } else if (lineValue[0] === "'") {
            start = "'";
            pos = 1;
        }

        // No Quotes found read til # or ;
        if (start === '') {

            const positions = [];
            positions.push(lineValue.length);
            const pos1 = lineValue.indexOf(';');
            const pos2 = lineValue.indexOf('#');
            if (pos1 > 0) positions.push(pos1);
            if (pos2 > 0) positions.push(pos2);
            const eol = Math.min(...positions);

            // Try to parse with json
            lineValue = lineValue.substring(0, eol);
            const json = jsonParse(lineValue);
            if (!json.err) { lineValue = json.data; }

            return lineValue;

        }

        for (let i = pos; i < lineValue.length; i++) {

            // Get char
            char = lineValue[i];

            switch (char) {

                case '"':
                case "'":
                case '`':

                    // Check if backslashed
                    if (start === char && lineValue[i - 1] !== '\\') return str;

                default:

                    str += char;
                    break;
            }

        }

        return str.trim();

    }

    /**
     * Parses an ini string.
     * @param {string} data - The data string to ini parse.
     * @inferid iniParser.parseString
     */
    parseString(data) {

        // Declare vars
        let fileTitle = '';
        let lineNumber = 0;
        let idx = 0;
        let currentSection = [];
        let line = '';
        let fchar = '';
        let match = null;

        // Set context data to object
        this.#context.data = {};

        // Trim data string
        data = data.trim();

        // Check if empty just return
        if (data === '') return;

        // Add file to filelist
        this.#fileList.push(this.#context.file);

        // Parse by newline chars
        const lines = data.split("\n").map(line => {

            lineNumber++;
            return {
                lineNumber: lineNumber,
                line: line,
                file: 0
            };

        });

        // Parse each line.
        for (let i = 0; i < lines.length; i++) {

            line = lines[i].line.trim();
            fchar = line[0];

            // Set the current index
            idx++;

            // Check if line is at least 3 characters
            if (line.length < 3) continue;

            // Check starting character
            switch (fchar) {

                // Comment found continue processing
                case '#':
                case ';': continue;

                // Special processing
                case '!':

                    match = line.match(REG_COMMAND);

                    if (!match || match.length != 3) {

                        // Set the filetitle
                        fileTitle = (lines[i].file === 0) ? 'Main File' : 'Included File';

                        this.#context.err = new SyntaxError(`Incorrect special command syntax\n${fileTitle}: ${this.#fileList[lines[i].file]}\nLine Number: ${lines[i].lineNumber}\nLine: ${line}`);
                        return;
                    }

                    // Get actual string
                    const cmd = match[1];
                    const cmdValue = this.#ripType(match[2]);

                    //console.log(cmd);

                    // Check which special command
                    switch (cmd.toUpperCase()) {

                        // Add include file
                        case 'INCLUDE':

                            const incResults = this.#include(cmdValue);

                            if (incResults.err) {
                                this.#context.err = incResults.err;
                                return;
                            }

                            // Add lines together
                            lines.splice(idx, 0, ...incResults.data);

                            //console.log(`Found !INCLUDE '${cmd_value}'`);

                            break;

                        // End of file command
                        case 'EOF': return;

                        default: break;
                    }


                    break;

                // Section
                case '[':

                    // Parse the section
                    match = line.match(REG_SECTION);

                    // Check for correct syntax
                    if (!match || match.length !== 3) {

                        // Set the filetitle
                        fileTitle = (lines[i].file === 0) ? 'Main File' : 'Included File';

                        this.#context.err = new SyntaxError(`Incorrect ini section syntax\n${fileTitle}: ${this.#fileList[lines[i].file]}\nLine Number: ${lines[i].lineNumber}\nLine: ${line}`);
                        return;
                    }

                    // Trim match
                    match[1] = match[1].trim();

                    // Check if section reset
                    if (match[1].startsWith('.')) {

                        if (currentSection[currentSection.length - 1].startsWith('.')) currentSection.pop();
                        currentSection.push(match[1]);

                    } else {

                        // Reset with new section
                        currentSection = match[1].split('.');

                    }

                    // Create the sections
                    this.#createSection(currentSection);

                    break;

                default:

                    match = line.match(REG_KEY_VALUE);

                    if (!match || match.length != 3) {

                        // Set the filetitle
                        fileTitle = (lines[i].file === 0) ? 'Main File' : 'Included File';

                        this.#context.err = new SyntaxError(`Incorrect ini key value syntax\n${fileTitle}: ${this.#fileList[lines[i].file]}\nLine Number: ${lines[i].lineNumber}\nLine: ${line}`);
                        return;
                    }

                    // Get the rip value
                    const value = this.#ripType(match[2]);

                    // Check if property is array key[] or just key value.
                    if (match[1].endsWith('[]')) {

                        this.#createProperty(currentSection, match[1].slice(0, -2), [value]);

                    } else {

                        // Get actual string
                        this.#createProperty(currentSection, match[1], value);

                    }


                    break;

            }

        }


        return;

    }

}