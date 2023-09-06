import { google } from "googleapis";
import { resolve } from "path";

export async function getContents(sheetName: string, majorDimensions?: string) {
  try {
    if (majorDimensions === undefined) {
      majorDimensions = "ROWS";
    }
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_SHEETS_PRIVATE_KEY,
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: sheetName, // sheet name
      majorDimension: majorDimensions,
    });

    const rows = response.data.values || [];

    return rows;
  } catch (err) {
    console.log("ERRROR OCCURED!");
  }
  return null;
}

export function getColumnName(indexNumber: number) {
  indexNumber = indexNumber;
  var ordA = "a".charCodeAt(0);
  var ordZ = "z".charCodeAt(0);
  var len = ordZ - ordA + 1;

  var columnName = "";
  while (indexNumber >= 0) {
    columnName = String.fromCharCode((indexNumber % len) + ordA) + columnName;
    indexNumber = Math.floor(indexNumber / len) - 1;
  }
  return columnName.toUpperCase();
}
