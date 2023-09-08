import { NextApiRequest, NextApiResponse } from "next";
import { getColumnName, getContents } from "./shared/sheets";
import {
  TabooAttribute,
  TabooDifficultyColor,
} from "@/app/taboo/types/taboo.type";

type ResponseData = {
  tabooAttributes?: Array<TabooAttribute>;
  message?: string;
};
const SHEET_NAME = "taboo";
export default async function getNetflixSheetAttributes(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let category: string = req.query["category"]?.toString() ?? "";

try{

  const data = await getContents(`${SHEET_NAME}!A2:$G1000`);
  if(data!==null){
    const response = await buildAttributes(data);
    res.status(200).json({ tabooAttributes: response });
  }
  res.status(400).json({message:"ERROR OCCURRED!"})
}
catch(err){

    console.log(err)

    res.status(400).json({ message: "ERROR OCCURRED" });
  }
}

function buildAttributes(data: Array<any>): Array<TabooAttribute> {
  let tabooAttributes: Array<TabooAttribute> = [];
  data.forEach((row: Array<string>) => {
    if (row[0]) {
      if (row[0].trim() !== "") {
        tabooAttributes.push({
          answer: row[0],
          taboos: [row[1], row[2], row[3], row[4], row[5]],
          difficultyColor: getDifficultyColor(row[6]),
        });
      }
    }
  });
  return tabooAttributes;
}
function getDifficultyColor(difficulty: string) {
  if (difficulty) {
    if (difficulty.toUpperCase() === "EASY") {
      return TabooDifficultyColor.EASY;
    }
    if (difficulty.toUpperCase() === "MEDIUM") {
      return TabooDifficultyColor.MEDIUM;
    }
    if (difficulty.toUpperCase() === "HARD") {
      return TabooDifficultyColor.HARD;
    }
    if (difficulty.toUpperCase() === "VERY HARD") {
      return TabooDifficultyColor.VERY_HARD;
    }
  }

  return TabooDifficultyColor.EASY;
}
