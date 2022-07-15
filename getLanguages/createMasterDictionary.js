const fs = require("fs");

exports.createMasterDictionary = (dictNames, directory) => {
  const imports =
    getImports(dictNames) + `import {LocaKeys} from '${directory}LocaKeys';\n`;
  const entries = getEntries(dictNames);

  const file = `${imports}
  export const MasterDictionary: Map<string, Map<LocaKeys, string>> = new Map<string, Map<LocaKeys, string>>([${entries}]);`;

  console.log("📚 creating master dictionary");
  fs.writeFile(directory + "MasterDictionary.ts", file, function (err) {
    if (err) {
      return console.log(err);
    }
  });
};

const getImports = (dictNames) => {
  return dictNames.reduce(
    (accumulator, name) => accumulator + `import {${name}} from './${name}';\n`,
    ""
  );
};

const getEntries = (dictNames) =>
  dictNames.reduce(
    (accumulator, name) => accumulator + `["${name}", ${name}],\n`,
    ""
  );
