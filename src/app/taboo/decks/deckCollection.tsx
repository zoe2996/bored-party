import { TabooAttribute } from "../types/taboo.type";
import { ENGLISH_CARDS } from "./english";
import { PINOY_CARDS } from "./pinoy";

export const DECKS: { [deckName: string]: Array<TabooAttribute> } = {
  pinoy: PINOY_CARDS,
  english: ENGLISH_CARDS,
};

export function getAllDecks() {
  let decks: Array<TabooAttribute> = [];
  Object.keys(DECKS).forEach((deckName) => {
    decks = decks.concat(DECKS[deckName]);
  });
  return decks;
}
