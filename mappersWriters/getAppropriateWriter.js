const { createMasterDictionary } = require("./createMasterDictionary");

const mappersWriters = {
  i18n: () => {},
  dictionary: createMasterDictionary,
};

exports.getAppropriateMapperWriter = (writerType) =>
  mappersWriters[writerType] || mappersWriters.dictionary;
