"use client";

import { ReactElement, useEffect, useState } from "react";
import { TabooCard } from "./components";
import { TABOO_CARDS } from "./pinoy";
import { TabooAttribute, TabooDifficultyColor } from "./types/taboo.type";

let currentIdx: number;
let functionCallCount = 0;
const tabooCardsCopy = JSON.parse(JSON.stringify(TABOO_CARDS));

const getNewCard = () => {
  functionCallCount = functionCallCount + 1;
  let randomIdx = currentIdx;
  console.log(tabooCardsCopy.length);
  let loopCount = 0;
  while (randomIdx == currentIdx && tabooCardsCopy.length > 0 && loopCount < 100) {
    randomIdx = Math.floor(Math.random() * tabooCardsCopy.length);
    loopCount = loopCount+1
  }

  currentIdx = randomIdx;
  const tabooAttribute: TabooAttribute = tabooCardsCopy[randomIdx];

  //remove card from copy
  tabooCardsCopy.splice(randomIdx, 1);

  return tabooAttribute;
};

export default function Home() {
  const [cardContent, setCardContent] = useState<{
    tabooAttribute: TabooAttribute;
  }>(() => {
    return {
      tabooAttribute: {
        answer: "",
        taboos: ["", "", "", "", ""],
        difficultyColor: TabooDifficultyColor.EASY,
      },
    };
  });

  const [points, setPoints] = useState<number>(0);

  // didMount effect
  useEffect(() => {
    updateCard();
  }, []);

  const updateCard = () => {
    setCardContent({ tabooAttribute: getNewCard() });
  };

  const markCorrect = () => {
    setPoints((points) => points + 1);
    updateCard();
  };

  const markTaboo = () => {
    setPoints((points) => points - 1);
    updateCard();
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 justify-center pt-5">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{points.toString()} Points</h1>
        </div>
        <div className="lg:w-96 lg:h-2/3 w-full h-4/6 m-auto p-5">
          <div className="text-center h-full">
            {tabooCardsCopy.length !== 0 ? (
              <TabooCard
                tabooAttribute={cardContent?.tabooAttribute}
              ></TabooCard>
            ) : (
              <h1 className="font-bold text-4xl">No More Cards Left</h1>
            )}
          </div>
          <div className="flex flex-row text-center mt-4 justify-center">
            <button
              onClick={() => {
                markTaboo();
              }}
              className="flex bg-red-500 hover:bg-red-500 disabled:bg-gray-500 disabled:text-gray-700 rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={tabooCardsCopy.length === 0}
            >
              Taboo
            </button>
            <button
              onClick={() => {
                markCorrect();
              }}
              className="flex bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={tabooCardsCopy.length === 0}
            >
              Correct
            </button>

            <button
              onClick={() => {
                updateCard();
              }}
              className="flex bg-yellow-500 hover:bg-yellow-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={tabooCardsCopy.length === 0}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
