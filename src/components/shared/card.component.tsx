import { CardProperty } from "@/types/card.type";

import "animate.css";
import "./card.css";
import { useEffect, useRef } from "react";

function Card({ cardProperty }: { cardProperty: CardProperty }) {
  //   const randomKey = uuidv4();
  const cardRef = useRef<HTMLDivElement>(null);

  const animateClass = "animate__jackInTheBox";
  useEffect(() => {
    if (cardRef.current !== null) {
      cardRef.current.classList.add(animateClass);

      cardRef.current.addEventListener("animationend", () => {
        cardRef.current?.classList.remove(animateClass);
      });
    }
    return () => {
      if (cardRef.current !== null) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cardRef.current.classList.remove(animateClass);
      }
    };
  }, [cardProperty]);

  return (
    <>
      <div
        ref={cardRef}
        className={
          "block rounded-xl overflow-hidden w-full h-full bg-gray-500 animate__animated"
        }
      >
        {cardProperty?.innerContent}
      </div>
    </>
  );
}

export default Card;
