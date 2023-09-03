import Card from "@/components/shared/card.component";
import { NetflixAttribute } from "../types/netflix.type";
import { CardProperty } from "@/types/card.type";
import { ReactElement } from "react";
import Image from "next/image";

export function NetflixCard({
  netflixAttribute,
}: {
  netflixAttribute: NetflixAttribute;
}) {
  const innerContent: ReactElement = (
    <>
      <div className="p-10 text-center w-full h-full bg-black flex items-center flex-col">
        <Image src="/netflix-logo.webp" alt={""} width={50} height={50} />
        <div className="px-3 text-center m-auto">
          <h1 className="font-sans font-bold text-4xl text-white text-center">
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
