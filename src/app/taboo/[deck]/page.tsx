"use client";

import { useParams } from "next/navigation";
import Home from "../page";

export default function Deck() {
  const params = useParams()
  return <Home deckName={params.deck.toString()}></Home>;
}
