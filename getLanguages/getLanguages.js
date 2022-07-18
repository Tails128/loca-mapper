const { readdir, unlink } = require("fs");
const { join } = require("path");
const {
  createMasterDictionary,
} = require("../mappersWriters/createMasterDictionary.js");
const { createLocaKeys } = require("./createKeys.js");
const { readFromDrive } = require("../utils/readFromDrive.js");
const {
  getAppropriateWriter,
} = require("../dataWriters/getAppropriateWriter.js");
const {
  getAppropriateMapperWriter,
} = require("../mappersWriters/getAppropriateWriter.js");

let directory = "/langs";
let writemode = undefined;

exports.getData = function (config) {
  directory = config.outputDir;
  writemode = config.outputType;
  readFromDrive(config, replaceLanguages);
};

function replaceLanguages(res) {
  const columns = res.data.values;
  if (columns.length <= 0) {
    console.log("No data found.");
    return;
  }

  removeOldFiles();

  const keys = columns[0]
    .slice(1)
    .filter((cell) => cell != undefined && cell != "");
  const columnsWithoutKeys = columns.slice(1);

  createLocaKeys(keys, directory);
  writeDataFiles(columnsWithoutKeys, keys);
  writeMapperFiles(columnsWithoutKeys, keys);
}

function removeOldFiles() {
  console.log("🗑️ Cleaning the directory...");

  readdir(directory, (err, files) => () => {
    if (err) {
      throw err;
    }

    for (const file of files) {
      unlink(join(directory, file), (e) => {
        if (e) throw e;
      });
    }

    console.log(`removed ${files.length} old languages...`);
  });
}

function writeDataFiles(columns, keys) {
  const writer = getAppropriateWriter(writemode);
  columns.map((column) => writer(keys, column, directory));
}

/**
 * A function to create mapper files. Mapper files are files such as the dictionary file containing the languages.
 * @param {*} columns the data in columns
 * @param {*} keys the keys for the columns
 */
function writeMapperFiles(columns, keys) {
  const dictionaryNames = columns.map((column) => column[0]);
  getAppropriateMapperWriter(dictionaryNames, directory);
}
