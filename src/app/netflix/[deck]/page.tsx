"use client";

import { useParams } from "next/navigation";
import { NetflixPage } from "../components/main";

export default function Deck() {
  const params = useParams();
  return <NetflixPage deckName={params?.deck.toString()}></NetflixPage>;
}
