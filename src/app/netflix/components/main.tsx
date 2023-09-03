import { useEffect, useState } from "react";
import { NetflixAttribute } from "../types/netflix.type";
import { DECKS, getAllDecks } from "../decks/deckCollection";
import { AiFillSetting } from "react-icons/ai";
import { NetflixCard } from "./card";
import { TEAM_BLUE, TEAM_RED, TeamToggle } from "./team";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { AiOutlineCheck } from "react-icons/ai";

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



const ACT_IT:string = 'Act It';
const ONE_WORD:string = 'One Word';
const QUOTE_IT:string = 'Quote It';

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

  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentTeam, setCurrentTeam] = useState<string>("BLUE");
  const [blueTeamPoints, setBlueTeamPoints] = useState<number>(0);
  const [redTeamPoints, setRedTeamPoints] = useState<number>(0);

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

  function setRandomCategory(){
    const randomNumber = Math.floor(Math.random() * 3);

    if(randomNumber === 0){
        setCurrentCategory(ONE_WORD)
    }
    else if(randomNumber === 1){
        setCurrentCategory(ACT_IT)
    }
    else if(randomNumber === 2){
        setCurrentCategory(QUOTE_IT)
    }

  }

  const updateCard = () => {
    setCardContent({ netflixAttribute: getNewCard() });
    setRandomCategory()
  };

  function getAddPoints(){
    if(currentCategory === ONE_WORD){
        return 3;
    }
    else if(currentCategory === ACT_IT){
        return 2;
    }
    else{
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
    updateCard();
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
            <h1 className="text-3xl font-bold">
              {getPoints().toString()} Points
            </h1>
          </div>
          <div className="text-center h-full">
            {netflixCardsCopy.length !== 0 ? (
              <NetflixCard
                category={currentCategory}
                netflixAttribute={cardContent?.netflixAttribute}
              ></NetflixCard>
            ) : (
              <h1 className="font-bold text-4xl">No More Cards Left</h1>
            )}
          </div>
          <div className="grid grid-cols-3 text-center mt-4 gap-4">
            <button
              onClick={() => {
                markCorrect();
              }}
              className="col-span-2 bg-green-500 hover:bg-green-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-5xl  flex justify-center items-center"
              disabled={netflixCardsCopy.length === 0}
            >
              <AiOutlineCheck />
            </button>

            <button
              onClick={() => {
                updateCard();
              }}
              className="col-auto bg-yellow-500 hover:bg-yellow-500 disabled:bg-gray-500 disabled:text-gray-700  rounded-3xl text-white font-bold py-8 px-4 text-center mx-2 text-5xl flex justify-center items-center"
              disabled={netflixCardsCopy.length === 0}
            >
              <TbPlayerSkipForwardFilled />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
