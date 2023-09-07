import { NetflixAttribute } from "@/app/netflix/types/netflix.type";
import { NextApiRequest, NextApiResponse } from "next";
import { getColumnName, getContents } from "./shared/sheets";

type ResponseData = {
  netflixAttributes?: Array<NetflixAttribute>;
  message?: string;
};
const SHEET_NAME = "netflix";
export default async function getNetflixSheetAttributes(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let category: string = req.query["category"]?.toString() ?? "";
  const categories = await getContents(SHEET_NAME + "!A1:Z1", "COLUMNS");
  const categoryIndexNumber = getIndexNumber(category, categories ?? []);
  const columnName = getColumnName(categoryIndexNumber);

  const data = await getContents(`${SHEET_NAME}!${columnName}2:${columnName}1000`);

  if (data !== null) {
    const response = await buildAttributes(data);
    res.status(200).json({ netflixAttributes: response });
  } else {
    res.status(400).json({ message: "ERROR OCCURRED" });
  }
}

function buildAttributes(data: Array<any>): Array<NetflixAttribute> {
  let netflixAttributes: Array<NetflixAttribute> = [];
  data.forEach((row: Array<string>) => {
    if (row[0]) {
      if (row[0].trim() !== "") {
        netflixAttributes.push({ answer: row[0] });
      }
    }
  });
  return netflixAttributes;
}

function getIndexNumber(category: string, rows: Array<Array<string>>) {
  let categoryIndex = 0;

  for (let idx = 0; idx < rows.length; idx++) {
    const row = rows[idx];
    if (row[0].toLowerCase() === category.toLowerCase()) {
      categoryIndex = idx;
      break;
    }
  }
  return categoryIndex;
}
