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

  // loop through taboo words
  tabooAttribute.taboos.map((taboo: string) => {
    tabooElements.push(
      <h3
        key={taboo}
        className="flex align-middle flex-row text-center justify-center font-sans font-medium text-2xl mt-3"
      >
        {taboo}
      </h3>
    );
  });

  const DEFAULT_CLASS = "p-10 text-center w-full h-full";
  const computedClass = DEFAULT_CLASS + " " + tabooAttribute.difficultyColor;
  const innerContent: ReactElement = (
    <>
      <div className={computedClass}>
        <div className="p-3">
          <h1 className="font-sans font-bold text-4xl ">
            {tabooAttribute.answer}
          </h1>
        </div>
        <hr></hr>
        <div className="p-2">{tabooElements}</div>
      </div>

      <div className="relative bottom-10 m-auto">
        <Image
          src="/taboo-logo.webp"
          alt={""}
          width={100}
          height={45}
          className="opacity-80 m-auto"
        />
      </div>
    </>
  );
  const cardProperty: CardProperty = {
    innerContent: innerContent,
  };
  return <Card cardProperty={cardProperty}></Card>;
}
