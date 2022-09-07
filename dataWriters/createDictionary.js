const { writeFile } = require("fs");
const { sanitize } = require("../sanitizer/sanitizer");

exports.createDictionary = (keys, values, directory) => {
  const imports = "import {LocaKeys} from './locaKeys';";
  const dictName = values[0];
  values = values.slice(1);
  const entries = getEntries(keys, values);

  const content = `${imports}
  
  export const ${dictName} = new Map<LocaKeys, string>([${entries}])`;

  writeFile(directory + dictName + ".ts", content, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`✅ added new translation: ${dictName}`);
  });
};

const getEntries = (keys, values) => {
  let entries = "";
  const minVal = Math.min(keys.length, values.length);

  for (let i = 0; i < minVal; i++) {
    const cell = sanitize(values[i]);

    if (cell != undefined && cell != "") {
      entries += `['${keys[i]}' as LocaKeys, '${cell}'],\n`;
    }
  }

  return entries;
};
