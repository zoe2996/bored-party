import { ImpersonatorAttribute } from "../types/impersonator.type";
import { ANIME_CARDS } from "./anime";

import { PINOY_CARDS } from "./pinoy";

const NORMAL_DECKS: { [deckName: string]: Array<ImpersonatorAttribute> } = {
  pinoy: PINOY_CARDS,
  anime: ANIME_CARDS,
};

const SECRET_CATEGORIES: { [deckName: string]: Array<ImpersonatorAttribute> } =
  {
    //No secrets yet
  };

export const DECKS = { ...NORMAL_DECKS, ...SECRET_CATEGORIES };
export function getAllDecks() {
  let decks: Array<ImpersonatorAttribute> = [];
  Object.keys(NORMAL_DECKS).forEach((deckName) => {
    decks = decks.concat(NORMAL_DECKS[deckName]);
  });
  return decks;
}
