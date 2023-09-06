"use client";

import { useParams } from "next/navigation";
import { TabooPage } from "../components";

export default function Deck() {
  const params = useParams();
  return <TabooPage deckName={params?.deck.toString()}></TabooPage>;
}
