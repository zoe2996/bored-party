import { CardProperty } from "@/types/card.type";

import "animate.css";
import "./card.css";
import { useEffect, useRef, useState } from "react";

function Card({ cardProperty }: { cardProperty: CardProperty }) {
  //   const randomKey = uuidv4();
  const cardRef = useRef<HTMLDivElement>(null);

  const animateClass = "animate__jackInTheBox";

  let [addedClass, setAddedClass] = useState<string>("");

  useEffect(() => {
    if (cardRef.current !== null) {
      cardRef.current.classList.add(animateClass);

      cardRef.current.addEventListener("animationend", () => {
        cardRef.current?.classList.remove(animateClass);
      });
    }
    return () => {};
  }, [cardProperty]);

  return (
    <>
      <div
        ref={cardRef}
        className={
          "block rounded-xl overflow-hidden w-full h-full bg-gray-500 animate__animated" +
          " " +
          addedClass
        }
      >
        {cardProperty?.innerContent}
      </div>
    </>
  );
}

export default Card;
