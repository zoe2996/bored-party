import { DECKS, getAllDecks } from "../decks/deckCollection";
import { AiFillSetting } from "react-icons/ai";
import { TabooAttribute, TabooDifficultyColor } from "../types/taboo.type";
import { useEffect, useState } from "react";
import { TabooCard } from "./card";
import useSWR from "swr";
import LoadingCircle from "@/components/shared/loading.component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

let currentIdx: number;
let functionCallCount = 0;
let tabooCardsCopy: Array<TabooAttribute> = [];

// Function that Gets New Card from the deck
const getNewCard = ():TabooAttribute => {
  functionCallCount = functionCallCount + 1;
  let randomIdx = currentIdx;
  let loopCount = 0;
  while (
    randomIdx == currentIdx &&
    tabooCardsCopy.length > 0 &&
    loopCount < 100
  ) {
    randomIdx = Math.floor(Math.random() * tabooCardsCopy.length);
    loopCount = loopCount + 1;
  }

  currentIdx = randomIdx;
  let tabooAttribute: TabooAttribute = tabooCardsCopy[randomIdx];

  if (tabooCardsCopy.length >= 1) {
    tabooCardsCopy.splice(randomIdx, 1);
  }

  if (!tabooAttribute) {
    return {
      answer: "",
      taboos: ["", "", "", "", ""],
      difficultyColor: TabooDifficultyColor.EASY,
    };
  }
  return tabooAttribute;
};

interface TabooPageProps {
  deckName?: string;
  live?: boolean;
}
export function TabooPage({ deckName, live }: TabooPageProps) {
  const API_URL = live
    ? "/api/taboo?" +
      (deckName ? new URLSearchParams({ category: deckName }) : "")
    : null;
  const SHEETS_RESPONSE = useSWR(API_URL, fetcher);

  // Card Content State
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

  // Poinst of the player State
  const [points, setPoints] = useState<number>(0);

  // didMount effect
  useEffect(() => {
    if (live) {
      tabooCardsCopy = [];
    } else if (
      deckName === undefined ||
      !Object.keys(DECKS).includes(deckName)
    ) {
      tabooCardsCopy = JSON.parse(JSON.stringify(getAllDecks()));
    } else {
      tabooCardsCopy = JSON.parse(JSON.stringify(DECKS[deckName]));
    }
    updateCard();
  }, [deckName]);

  useEffect(() => {
    if (!SHEETS_RESPONSE.isLoading) {
      if (SHEETS_RESPONSE.data) {
        tabooCardsCopy = JSON.parse(
          JSON.stringify(SHEETS_RESPONSE.data["tabooAttributes"])
        );

        updateCard();
      }
    }
  }, [SHEETS_RESPONSE.data]);

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

  const showSettings = () => {
    alert("No Settings Yet!");
  };

  if (SHEETS_RESPONSE.isLoading) {
    return (
      <>
        <LoadingCircle
          message="Loading Cards"
          customColorClass="fill-purple-600"
        ></LoadingCircle>
      </>
    );
  }

  function showEmpty() {
    return cardContent.tabooAttribute.answer === "";
  }
  return (
    <>
      <div className="w-screen h-screen bg-gray-900 justify-center pt-5">
        <div className="lg:w-96 lg:h-2/3 w-full h-4/6 m-auto p-5">
          <div className=" flex flex-row justify-end text-gray-500 m-auto w-full mb-4 text-3xl">
            <button
              onClick={() => {
                showSettings();
              }}
            >
              <AiFillSetting />
            </button>
          </div>

          <div className="text-center my-4">
            <h1 className="text-4xl font-bold">{points.toString()} Points</h1>
          </div>

          <div className="text-center h-full">
            {!showEmpty() ? (
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
              disabled={showEmpty()}
            >
              Taboo
            </button>
            <button
              onClick={() => {
                markCorrect();
              }}
              className="flex bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={showEmpty()}
            >
              Correct
            </button>

            <button
              onClick={() => {
                updateCard();
              }}
              className="flex bg-yellow-500 hover:bg-yellow-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={showEmpty()}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
