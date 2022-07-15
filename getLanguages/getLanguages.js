const { readdir, unlink } = require("fs");
const { join } = require("path");
const { createMasterDictionary } = require("./createMasterDictionary.js");
const { createLocaKeys } = require("./createKeys.js");
const { readFromDrive } = require("../utils/readFromDrive.js");
const {
  getAppropriateWriter,
} = require("../fileWriters.ts/getAppropriateWriter.js");

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

  // Loca keys generation
  const keys = columns[0]
    .slice(1)
    .filter((cell) => cell != undefined && cell != "");
  createLocaKeys(keys, directory);
  // Dictionaries generation
  const writer = getAppropriateWriter(writemode);
  const columnsWithoutKeys = columns.slice(1);
  columnsWithoutKeys.map((column) => writer(keys, column, directory));

  // Master dictionary generation (the dictionary mapping languages to loca dictionaries)
  const dictionaryNames = columnsWithoutKeys.map((column) => column[0]);
  createMasterDictionary(dictionaryNames, directory);
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
