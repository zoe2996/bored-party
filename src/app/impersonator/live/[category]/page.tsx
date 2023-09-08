"use client";

import { useParams } from "next/navigation";
import { ImpersonatorPage } from "../../components/main";

export default function Deck() {
  const params = useParams();
  return (
    <ImpersonatorPage
      deckName={params?.category.toString()}
      live={true}
    ></ImpersonatorPage>
  );
}
