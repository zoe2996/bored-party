import { google } from "googleapis";
import { resolve } from "path";

export async function getContents(sheetName: string) {
  try {
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
    });

    const rows = response.data.values || [];

    if (rows.length) {
      return rows;
    }
  } catch (err) {
    console.log("ERRROR OCCURED!")
  }
  return null

}
