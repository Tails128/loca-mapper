const { createDictionary } = require("./createDictionary");
const { createi18n } = require("./createi18n");

const writersMap = {
  i18n: createi18n,
  dictionary: createDictionary,
};

exports.getAppropriateWriter = (writerType) => {
  if (writersMap[writerType] == undefined) {
    console.log(
      `❌ outputType ${writerType} is not supported. Defaulting to dictionary!`
    );
  }

  return writersMap[writerType] || writersMap.dictionary;
};
