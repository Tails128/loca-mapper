# loca-mapper

A simple ts type definition for your locas.
It currently supports only Google sheetes.

## How to use

1. Create a `.locamapperrc` file structured as a JSON containing the following:

   - "spreadsheetId": the Id of the Google spreadsheet you are using
   - "majorDimension": wether your document is organised by `"ROWS"` or `COLUMNS`.
   - "range": the range to analize. A good range may be: `F1!A1:Z1000` (first page, from A1 to Z1000)
   - "ts": A boolean specifying wether you want to generate TS definition.
   - "driveCredentialsPath": the location of your drive credentials. E.g: `credentials/credentials.json`
   - "outputDir": the output directory;
   - "outputType": one of the following:
     - "i18n": the output will be i18n compatible files
     - "dictionary": the output will be an accessible dictionary

2. Add the following line to your scripts:

```json
    "translations": "node loca-mapper",
```

the dir folder indicates where the results will be outputted.
