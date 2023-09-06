import { NetflixAttribute } from "@/app/netflix/types/netflix.type";
import { NextApiRequest, NextApiResponse } from "next";
import { getContents } from "./shared/sheets";

type ResponseData = {
  netflixAttributes?: Array<NetflixAttribute>;
  message?: string;
};
export default async function getNetflixSheetAttributes(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = await getContents("netflix!A:A");

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
    netflixAttributes.push({ answer: row[0] });
  });
  return netflixAttributes;
}
