import { useEffect, useState } from "react";
import { NetflixAttribute } from "../types/netflix.type";
import { DECKS, getAllDecks } from "../decks/deckCollection";
import { AiFillSetting } from "react-icons/ai";
import { NetflixCard } from "./card";
import { TEAM_BLUE, TEAM_RED, TeamToggle } from "./team";

let currentIdx: number;
let functionCallCount = 0;
let netflixCardsCopy: Array<NetflixAttribute> = [];
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
  const netflixAttribute: NetflixAttribute = netflixCardsCopy[randomIdx];

  //remove card from copy
  netflixCardsCopy.splice(randomIdx, 1);

  return netflixAttribute;
};

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

  const [currentTeam, setCurrentTeam] = useState<string>("BLUE");
  const [blueTeamPoints, setBlueTeamPoints] = useState<number>(0);
  const [redTeamPoints, setRedTeamPoints] = useState<number>(5);

  // didMount effect
  useEffect(() => {
    if (deckName === undefined || !Object.keys(DECKS).includes(deckName)) {
      netflixCardsCopy = JSON.parse(JSON.stringify(getAllDecks()));
    } else {
      netflixCardsCopy = JSON.parse(JSON.stringify(DECKS[deckName]));
    }
    updateCard();
  }, [deckName]);

  useEffect(() => {}, [cardContent]);

  const updateCard = () => {
    setCardContent({ netflixAttribute: getNewCard() });
  };

  function getPoints() {
    if (currentTeam === TEAM_BLUE) {
      return blueTeamPoints;
    } else if (currentTeam === TEAM_RED) {
      return redTeamPoints;
    }
    return 0;
  }

  const markCorrect = (addPoints: number) => {
    setPoints(getPoints() + addPoints);
    updateCard();
  };

  const showSettings = () => {
    alert("No Settings Yet!");
  };

  function setPoints(points: number) {
    if (currentTeam === TEAM_BLUE) {
      setBlueTeamPoints(points);
    } else if (currentTeam === TEAM_RED) {
      setRedTeamPoints(points);
    }
  }

  const handleTeamChange = (team: string) => {
    setCurrentTeam(team);
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-900 justify-center pt-5">
        <div className="lg:w-2/3 lg:h-1/3 w-full h-2/6 m-auto p-5">
          <div className=" flex flex-row justify-end text-gray-500 m-auto w-full mb-4 text-3xl">
            <button
              onClick={() => {
                showSettings();
              }}
            >
              <AiFillSetting />
            </button>
          </div>

          <TeamToggle
            onChangeTeam={handleTeamChange}
            currentTeam={currentTeam}
          ></TeamToggle>

          <div className="text-center my-4">
            <h1 className="text-4xl font-bold">
              {getPoints().toString()} Points
            </h1>
          </div>
          <div className="text-center h-full">
            {netflixCardsCopy.length !== 0 ? (
              <NetflixCard
                netflixAttribute={cardContent?.netflixAttribute}
              ></NetflixCard>
            ) : (
              <h1 className="font-bold text-4xl">No More Cards Left</h1>
            )}
          </div>
          <div className="grid grid-cols-3 text-center mt-4 gap-4">
            <button
              onClick={() => {
                markCorrect(3);
              }}
              className="col-span-1 bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={netflixCardsCopy.length === 0}
            >
              One Word
            </button>
            <button
              onClick={() => {
                markCorrect(2);
              }}
              className="col-span-1 bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={netflixCardsCopy.length === 0}
            >
              Act It
            </button>

            <button
              onClick={() => {
                markCorrect(1);
              }}
              className="col-span-1 bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={netflixCardsCopy.length === 0}
            >
              Quote It
            </button>

            <button
              onClick={() => {
                updateCard();
              }}
              className="col-span-3 bg-yellow-500 hover:bg-yellow-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-2xl"
              disabled={netflixCardsCopy.length === 0}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
