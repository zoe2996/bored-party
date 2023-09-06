import { google } from "googleapis";
import key from "../../../key.json";
import { NextApiRequest, NextApiResponse } from "next";
async function getContents() {
  try {
    console.log("API CALLED!!");
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      key.client_email,
      undefined,
      key.private_key,
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: key.spreadsheet_id,
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
