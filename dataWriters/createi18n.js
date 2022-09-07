const { writeFile } = require("fs");
const { sanitize } = require("../sanitizer/sanitizer");

exports.createi18n = (keys, values, directory) => {
  const fileName = values[0];
  values = values.slice(1);

  const entries = getEntries(keys, values);

  const content = `export default {
${entries}}`;

  writeFile(directory + fileName + ".ts", content, (err) => {
    if (err) {
      console.log(err);
    }

    console.log(`✅ added new translation: ${fileName}`);
  });
};

const getEntries = (keys, values) => {
  let entries = "";
  const minVal = Math.min(keys.length, values.length);

  for (let i = 0; i < minVal; i++) {
    const cell = sanitize(values[i]);

    if (cell != undefined && cell != "") {
      entries += `  ${keys[i]}: "${cell}",\n`;
    }
  }

  return entries;
};
