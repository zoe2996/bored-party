"use client";

import { useParams } from "next/navigation";
import { ImpersonatorPage } from "../components/main";

export default function Deck() {
  const params = useParams();
  return (
    <>
      <title>Impersonator</title>
      <meta
        name="og:description"
        content="Make them guess the personality by their Famous Lines, Behaviour or just Posing It!"
      ></meta>
      <meta name="og:image" content="https://i.imgur.com/oRVkx2Q.jpg"></meta>
      <ImpersonatorPage live={true}></ImpersonatorPage>
    </>
  );
}
