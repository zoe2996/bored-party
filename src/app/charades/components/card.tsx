import { ReactElement } from "react";
import { TabooAttribute } from "../types/taboo.type";
import Card from "@/components/shared/card.component";
import { CardProperty } from "@/types/card.type";
import Image from "next/image";

export function TabooCard({
  tabooAttribute,
}: {
  tabooAttribute: TabooAttribute;
}) {
  let tabooElements: ReactElement[] = [];

  const DEFAULT_CLASS = "p-10 text-center w-full h-full";
  const computedClass = DEFAULT_CLASS + " " + tabooAttribute.difficultyColor;
  const innerContent: ReactElement = (
    <>
      <div className="p-10 text-center w-full h-full align-middle">
        <div className="p-3">
          <h1 className="font-sans font-bold text-4xl ">
            {tabooAttribute.answer}
          </h1>
        </div>
        <hr></hr>
      </div>
    </>
  );
  const cardProperty: CardProperty = {
    innerContent: innerContent,
  };
  return <Card cardProperty={cardProperty}></Card>;
}
