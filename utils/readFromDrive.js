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
    _readFromDrive(parsedContent, driveParams, functionToApply);
  });
};

const _readFromDrive = async (parsedContent, driveParams, functionToApply) => {
  const auth = await getAuth(parsedContent);
  google.options({ auth });
  const sheets = google.sheets({ version: "v4" });
  sheets.spreadsheets.values.get(driveParams, (err, res) => {
    if (err) {
      console.log("The API returned an error: " + err);
      return;
    }

    functionToApply(res);
  });
};

const getAuth = async (content) => {
  if (content.client_email != undefined && content.private_key != undefined) {
    const JwtClient = new google.auth.JWT(
      content.client_email,
      null,
      content.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    await JwtClient.authorize();
    return JwtClient;
  }

  return content.id;
};
