import Card from "@/components/shared/card.component";
import { NetflixAttribute } from "../types/netflix.type";
import { CardProperty } from "@/types/card.type";
import { ReactElement } from "react";

export function NetflixCard({
  netflixAttribute,
}: {
  netflixAttribute: NetflixAttribute;
}) {
  const innerContent: ReactElement = (
    <>
      <div className="p-10 text-center w-full h-full bg-black flex items-center">
        <div className="p-3 text-center m-auto">
          <h1 className="font-sans font-bold text-4xl text-red-600 text-center">
            {netflixAttribute.answer}
          </h1>
        </div>
      </div>
    </>
  );
  const cardProperty: CardProperty = {
    innerContent: innerContent,
  };
  return <Card cardProperty={cardProperty}></Card>;
}

