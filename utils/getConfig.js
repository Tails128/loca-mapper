const { cosmiconfigSync } = require("cosmiconfig");

exports.getConfig = () => {
  const explorer = cosmiconfigSync("locamapper");
  const res = explorer.search();

  return res.config;
};
