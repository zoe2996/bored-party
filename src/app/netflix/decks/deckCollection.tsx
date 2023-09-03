import { NetflixAttribute } from "../types/netflix.type";
import { ACTION_CARDS, CARTOON_CARDS, COMEDY_CARDS, CRIME_SUSPENSE_CARDS, ENGLISH_CARDS, HORROR_CARDS, SCIFI_CARDS } from "./english";
import { PINOY_CARDS } from "./pinoy";

export const DECKS: { [deckName: string]: Array<NetflixAttribute> } = {
  pinoy: PINOY_CARDS,
  english: ENGLISH_CARDS,
  cartoon: CARTOON_CARDS,
  scifi:SCIFI_CARDS,
  action: ACTION_CARDS,
  comedy: COMEDY_CARDS,
  horror: HORROR_CARDS,
  crime_suspense: CRIME_SUSPENSE_CARDS
};

export function getAllDecks() {
  let decks: Array<NetflixAttribute> = [];
  Object.keys(DECKS).forEach((deckName) => {
    decks = decks.concat(DECKS[deckName]);
  });
  return decks;
}
