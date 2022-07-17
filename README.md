# loca-mapper

A simple ts type definition for your locas.
It currently supports only Google sheetes.

## How to use

1. Run `npm i --save-dev loca-mapper`

2. Obtain your drive credentials: They can be obtained here => [Drive Credentials](https://console.cloud.google.com/apis/credentials).
  
   You'll need to generate an API key to put in a JSON structured as follows:

```JSON
{
  "id": "the_key_here"
}
```

3. Enter the drive document you wish to use, you'll see an url structured as follows:
   `https://docs.google.com/spreadsheets/d/THE_DOCUMENT_ID/edit#gid=0`
   get `THE_DOCUMENT_ID`

4. Create a `.locamapperrc` file structured as a JSON containing the following:

   - "spreadsheetId": the Id of the Google spreadsheet you are using
   - "majorDimension": wether your document is organised by `"ROWS"` or `COLUMNS`.
   - "range": the range to analize. A good range may be: `F1!A1:Z1000` (first page, from A1 to Z1000)
   - "driveCredentialsPath": the location of your drive credentials. E.g: `credentials/credentials.json`
   - "outputDir": the output directory. E.g. `translations/`
   - "outputType": one of the following:
     - "i18n": the output will be i18n compatible files
     - "dictionary": the output will be an accessible dictionary

5. Add the following line to your scripts:

```json
    "translations": "node loca-mapper",
```

the dir folder indicates where the results will be outputted.
