import { useEffect, useState } from "react";
import { NetflixAttribute } from "../types/netflix.type";
import { DECKS, getAllDecks } from "../decks/deckCollection";
import { AiFillSetting } from "react-icons/ai";
import { NetflixCard } from "./card";
import { TEAM_BLUE, TEAM_RED, TeamToggle } from "./team";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTheaterMasks } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TimerProgress, getCountdownDate } from "./timer";
let currentIdx: number;
let functionCallCount = 0;
let netflixCardsCopy: Array<NetflixAttribute> = [];

const ACT_IT: string = "Act It";
const ONE_WORD: string = "One Word";
const QUOTE_IT: string = "Quote It";
const DEFAULT_TIMER_SECONDS = 90;

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface NetflixPageProps {
  deckName?: string;
}

export function NetflixPage({ deckName }: NetflixPageProps) {
  // Card Content State
  const [cardContent, setCardContent] = useState<{
    netflixAttribute: NetflixAttribute;
  }>(() => {
    return {
      netflixAttribute: {
        answer: "",
      },
    };
  });

  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentTeam, setCurrentTeam] = useState<string>("BLUE");
  const [blueTeamPoints, setBlueTeamPoints] = useState<number>(0);
  const [redTeamPoints, setRedTeamPoints] = useState<number>(0);

  const [countdownDate, setCountdownDate] = useState<Date>(
    getCountdownDate(DEFAULT_TIMER_SECONDS)
  );

  const LIVE_DECK_NAME_PARAM = "live";
  const SHEETS_RESPONSE = useSWR(
    deckName === LIVE_DECK_NAME_PARAM ? "/api/netflix" : null,
    fetcher
  );

  // didMount effect
  useEffect(() => {
    if (deckName === LIVE_DECK_NAME_PARAM) {
      netflixCardsCopy = [];
    } else {
      if (deckName === undefined || !Object.keys(DECKS).includes(deckName)) {
        netflixCardsCopy = JSON.parse(JSON.stringify(getAllDecks()));
      } else {
        netflixCardsCopy = JSON.parse(JSON.stringify(DECKS[deckName]));
      }
      updateCard();
    }
  }, [deckName]);

  useEffect(() => {
    if (!SHEETS_RESPONSE.isLoading) {
      if (SHEETS_RESPONSE.data) {
        netflixCardsCopy = JSON.parse(
          JSON.stringify(SHEETS_RESPONSE.data["netflixAttributes"])
        );

        updateCard();
      }
    }
  }, [SHEETS_RESPONSE.data]);

  function setRandomCategory() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber === 0) {
      setCurrentCategory(ONE_WORD);
    } else if (randomNumber === 1) {
      setCurrentCategory(ACT_IT);
    } else if (randomNumber === 2) {
      setCurrentCategory(QUOTE_IT);
    }
  }

  const updateCard = () => {
    setCardContent({ netflixAttribute: getNewCard() });
    setRandomCategory();
  };

  function getAddPoints() {
    if (currentCategory === ONE_WORD) {
      return 3;
    } else if (currentCategory === ACT_IT) {
      return 2;
    } else {
      return 1;
    }
  }

  function getPoints() {
    if (currentTeam === TEAM_BLUE) {
      return blueTeamPoints;
    } else if (currentTeam === TEAM_RED) {
      return redTeamPoints;
    }
    return 0;
  }

  const markCorrect = () => {
    setPoints(getPoints() + getAddPoints());
    updateCard();
  };

  function changeCategory(category: string) {
    setCurrentCategory(category);
  }
  // const showSettings = () => {
  //   alert("No Settings Yet!");
  // };

  function setPoints(points: number) {
    if (currentTeam === TEAM_BLUE) {
      setBlueTeamPoints(points);
    } else if (currentTeam === TEAM_RED) {
      setRedTeamPoints(points);
    }
  }

  const handleTeamChange = (team: string) => {
    setCurrentTeam(() => team);
    updateCard();
    setCountdownDate(() => {
      return getCountdownDate(DEFAULT_TIMER_SECONDS);
    });
  };

  const handleTimerFinished = () => {
    setCurrentTeam((currentTeam) => {
      if (currentTeam == TEAM_BLUE) {
        return TEAM_RED;
      } else {
        return TEAM_BLUE;
      }
    });
  };

  function showEmpty() {
    return cardContent.netflixAttribute.answer === "";
  }

  if (SHEETS_RESPONSE.isLoading) {
    return (
      <>
        <div className="w-screen h-screen flex flex-row items-center justify-center text-3xl">
          Loading Titles
          <div role="status" className="p-5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <title>Netflix: The Game</title>
      <meta
        name="og:description"
        content="Make them guess the movie by Quote It, Act It or giving just One Word!"
      ></meta>
      <meta
        name="og:image"
        content="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png"
      ></meta>
      <div className="w-screen h-screen bg-gray-900 justify-center pt-5">
        <div className="lg:w-2/3 lg:h-1/3 w-full h-2/6 m-auto p-5">
          {/* <div className=" flex flex-row justify-end text-gray-500 m-auto w-full mb-4 text-3xl">
            <button
              onClick={() => {
                showSettings();
              }}
            >
              <AiFillSetting />
            </button>
          </div> */}

          <TeamToggle
            onChangeTeam={handleTeamChange}
            currentTeam={currentTeam}
          ></TeamToggle>

          <div className="my-4">
            <TimerProgress
              timerSeconds={DEFAULT_TIMER_SECONDS}
              countdownDate={countdownDate}
              onTimerFinished={handleTimerFinished}
              resetTime={true}
            ></TimerProgress>
          </div>
          <div className="text-center my-4">
            <h1 className="text-3xl font-bold">
              {getPoints().toString()} Points
            </h1>
          </div>
          <div className="text-center h-full">
            {!showEmpty() ? (
              <NetflixCard
                category={currentCategory}
                netflixAttribute={cardContent?.netflixAttribute}
              ></NetflixCard>
            ) : (
              <h1 className="font-bold text-4xl">No More Cards Left</h1>
            )}
          </div>
          <div className="grid grid-cols-3 text-center mt-4 gap-3">
            <button
              onClick={() => {
                markCorrect();
              }}
              className="col-span-2 bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={showEmpty()}
            >
              <AiOutlineCheck />
            </button>

            <button
              onClick={() => {
                updateCard();
              }}
              className="col-auto bg-yellow-500 hover:bg-yellow-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl flex justify-center items-center"
              disabled={showEmpty()}
            >
              <TbPlayerSkipForwardFilled />
            </button>

            <button
              onClick={() => {
                changeCategory(ONE_WORD);
              }}
              className="col-span-1  bg-sky-500 hover:bg-sky-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={showEmpty() || currentCategory === ONE_WORD}
            >
              1
            </button>

            <button
              onClick={() => {
                changeCategory(ACT_IT);
              }}
              className="col-span-1 bg-sky-500 hover:bg-sky-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={showEmpty() || currentCategory === ACT_IT}
            >
              <FaTheaterMasks />
            </button>

            <button
              onClick={() => {
                changeCategory(QUOTE_IT);
              }}
              className="col-span-1 bg-sky-500 hover:bg-sky-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={showEmpty() || currentCategory === QUOTE_IT}
            >
              <BiSolidQuoteAltLeft />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Function that Gets New Card from the deck
const getNewCard = () => {
  functionCallCount = functionCallCount + 1;
  let randomIdx = currentIdx;
  let loopCount = 0;
  while (
    randomIdx == currentIdx &&
    netflixCardsCopy.length > 0 &&
    loopCount < 100
  ) {
    randomIdx = Math.floor(Math.random() * netflixCardsCopy.length);
    loopCount = loopCount + 1;
  }

  currentIdx = randomIdx;
  let netflixAttribute: NetflixAttribute = netflixCardsCopy[randomIdx];

  if (netflixCardsCopy.length >= 1) {
    netflixCardsCopy.splice(randomIdx, 1);
  }

  if (!netflixAttribute) {
    return { answer: "" };
  }
  return netflixAttribute;
};
