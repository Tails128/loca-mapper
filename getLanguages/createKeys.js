const { writeFile } = require("fs");

exports.createLocaKeys = (keys, directory) => {
  const values = keys.reduce((acc, key) => acc + `\n  ${key} = '${key}',`, "");
  const content = `export enum LocaKeys {${values}\n}`;

  writeFile(directory + "LocaKeys.ts", content, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`🔑 added keys`);
  });
};
