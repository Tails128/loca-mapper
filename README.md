# loca-mapper

A simple ts type definition for your locas.
It currently supports only Google sheets.

## How to use

1. Run `npm i --save-dev loca-mapper`

2. Obtain your drive credentials:
3. Enable your drive API [Here](https://console.cloud.google.com/apis/dashboard)
4. The api key can be obtained here => [Drive Credentials](https://console.cloud.google.com/apis/credentials).
5. You'll need to either generate an API key and then create a JSON or use a service account.
6. To use the API keys you'll just need to create a json structured as follow, putting your key in it.

   ```JSON
   {
     "id": "the_key_here"
   }
   ```

   2. If you need to use a service account instead, just use the json you download once you create service account keys!

EXTREMELY IMPORTANT: DON'T SHARE YOUR API KEYS AND ADD THE FILE TO .GITIGNORE

3. Create a `.locamapperrc` file structured as a JSON containing the following:

   - "spreadsheetId": the Id of the Google spreadsheet you are using. In order to get it:
     Access the drive document you wish to use, you'll see an url structured as follows:
     `https://docs.google.com/spreadsheets/d/THE_DOCUMENT_ID/edit#gid=0`
     get `THE_DOCUMENT_ID`
   - "majorDimension": wether your document is organised by `"ROWS"` or `"COLUMNS"`.
   - "range": the range to analize. A good range may be: `F1!A1:Z1000` (first page, from A1 to Z1000)
   - "driveCredentialsPath": the location of your drive credentials. E.g: `credentials/credentials.json`
   - "outputDir": the output directory. E.g. `translations/`
   - "outputType": one of the following:

   1. "i18n": the output will be i18n compatible files
   2. "dictionary": the output will be an accessible dictionary

4. Add the following line to your scripts:

```json
    "translations": "loca-mapper",
```

the dir folder indicates where the results will be outputted.
