const { readFile } = require("fs");
const { google } = require("googleapis");

exports.readFromDrive = (config, functionToApply) => {
  // Load client secrets from a local file.
  readFile(config.driveCredentialsPath, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    const parsedContent = JSON.parse(content);
    const driveParams = {
      spreadsheetId: config.spreadsheetId,
      majorDimension: config.majorDimension,
      range: config.range,
    };
    _readFromDrive(parsedContent.id, driveParams, functionToApply);
  });
};

const _readFromDrive = (auth, driveParams, functionToApply) => {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(driveParams, (err, res) => {
    if (err) {
      console.log("The API returned an error: " + err);
      return;
    }

    functionToApply(res);
  });
};
