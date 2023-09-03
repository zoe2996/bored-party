import { NetflixAttribute } from "../types/netflix.type";
import { ANIME_CARDS } from "./anime";
import {
  ACTION_CARDS,
  CARTOON_CARDS,
  COMEDY_CARDS,
  CRIME_SUSPENSE_CARDS,
  ENGLISH_CARDS,
  HORROR_CARDS,
  SCIFI_CARDS,
} from "./english";
import { PINOY_CARDS } from "./pinoy";

const NORMAL_DECKS: { [deckName: string]: Array<NetflixAttribute> } = {
  pinoy: PINOY_CARDS,
  english: ENGLISH_CARDS,
  cartoon: CARTOON_CARDS,
  scifi: SCIFI_CARDS,
  action: ACTION_CARDS,
  comedy: COMEDY_CARDS,
  horror: HORROR_CARDS,
  crime_suspense: CRIME_SUSPENSE_CARDS,
};

const SECRET_CATEGORIES: { [deckName: string]: Array<NetflixAttribute> } = {
  anime: ANIME_CARDS,
};

export const DECKS = { ...NORMAL_DECKS, ...SECRET_CATEGORIES };
export function getAllDecks() {
  let decks: Array<NetflixAttribute> = [];
  Object.keys(NORMAL_DECKS).forEach((deckName) => {
    decks = decks.concat(NORMAL_DECKS[deckName]);
  });
  return decks;
}
