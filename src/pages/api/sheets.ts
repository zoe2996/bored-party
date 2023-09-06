import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
async function getContents() {
  try {
    console.log("API CALLED!!");
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
      range: "taboo", // sheet name
    });

    const rows = response.data.values || [];
    if (rows.length) {
      console.log(rows)
      return rows
    }
  } catch (err) {
    console.log(err);
  }
  // return []
}

type ResponseData = {
  data: any;
};
export default async function getData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const response = await getContents();
  console.log(response)
  res.status(200).json({ 'data': response});
}
