import { useEffect, useState } from "react";
import { ImpersonatorAttribute } from "../types/impersonator.type";
import { DECKS, getAllDecks } from "../decks/deckCollection";
import { ImpersonatorCard } from "./card";
import { TEAM_BLUE, TEAM_RED, TeamToggle } from "./team";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";
import { FaTheaterMasks } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { TimerProgress, getCountdownDate } from "./timer";
import { FaPersonWalking } from 'react-icons/fa6'
let currentIdx: number;
let functionCallCount = 0;
let impersonatorCardsCopy: Array<ImpersonatorAttribute> = [];

const ACT_IT: string = "Act It";
const POSE_IT: string = "Pose It";
const QUOTE_IT: string = "Quote It";
const DEFAULT_TIMER_SECONDS = 90;

import useSWR from "swr";
import LoadingCircle from "@/components/shared/loading.component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface ImpersonatorPageProps {
  deckName?: string;
  live?: boolean;
}

export function ImpersonatorPage({ deckName, live }: ImpersonatorPageProps) {
  // Card Content State
  const [cardContent, setCardContent] = useState<{
    impersonatorAttribute: ImpersonatorAttribute;
  }>(() => {
    return {
      impersonatorAttribute: {
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

  const API_URL = live
    ? "/api/impersonator?" +
      (deckName ? new URLSearchParams({ category: deckName }) : "")
    : null;
  const SHEETS_RESPONSE = useSWR(API_URL, fetcher);

  // didMount effect
  useEffect(() => {
    if (live) {
      impersonatorCardsCopy = [];
    } else {
      if (deckName === undefined || !Object.keys(DECKS).includes(deckName)) {
        impersonatorCardsCopy = JSON.parse(JSON.stringify(getAllDecks()));
      } else {
        impersonatorCardsCopy = JSON.parse(JSON.stringify(DECKS[deckName]));
      }
      updateCard();
    }
  }, [deckName]);

  useEffect(() => {
    if (!SHEETS_RESPONSE.isLoading) {
      if (SHEETS_RESPONSE.data) {
        impersonatorCardsCopy = JSON.parse(
          JSON.stringify(SHEETS_RESPONSE.data["impersonatorAttributes"])
        );

        updateCard();
      }
    }
  }, [SHEETS_RESPONSE.data]);

  function setRandomCategory() {
    const randomNumber = Math.floor(Math.random() * 3);

    if (randomNumber === 0) {
      setCurrentCategory(POSE_IT);
    } else if (randomNumber === 1) {
      setCurrentCategory(ACT_IT);
    } else if (randomNumber === 2) {
      setCurrentCategory(QUOTE_IT);
    }
  }

  const updateCard = () => {
    setCardContent({ impersonatorAttribute: getNewCard() });
    setRandomCategory();
  };

  function getAddPoints() {
    if (currentCategory === POSE_IT) {
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
    return cardContent.impersonatorAttribute.answer === "";
  }

  if (SHEETS_RESPONSE.isLoading) {
    return (
      <>
        <LoadingCircle message="Loading titles" customColorClass="fill-green-500"></LoadingCircle>
      </>
    );
  }
  return (
    <>
      <title>Impersonator</title>
      <meta
        name="og:description"
        content="Make them guess the personality by their Famous Lines, Behaviour or just Posing It!"
      ></meta>
      <meta
        name="og:image"
        content="https://i.imgur.com/oRVkx2Q.jpg"
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
              <ImpersonatorCard
                category={currentCategory}
                impersonatorAttribute={cardContent?.impersonatorAttribute}
              ></ImpersonatorCard>
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
                changeCategory(POSE_IT);
              }}
              className="col-span-1  bg-sky-500 hover:bg-sky-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-6 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={showEmpty() || currentCategory === POSE_IT}
            >
              <FaPersonWalking/>
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
    impersonatorCardsCopy.length > 0 &&
    loopCount < 100
  ) {
    randomIdx = Math.floor(Math.random() * impersonatorCardsCopy.length);
    loopCount = loopCount + 1;
  }

  currentIdx = randomIdx;
  let impersonatorAttribute: ImpersonatorAttribute = impersonatorCardsCopy[randomIdx];

  if (impersonatorCardsCopy.length >= 1) {
    impersonatorCardsCopy.splice(randomIdx, 1);
  }

  if (!impersonatorAttribute) {
    return { answer: "" };
  }
  return impersonatorAttribute;
};
