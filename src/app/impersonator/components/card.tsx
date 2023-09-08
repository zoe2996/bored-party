import Card from "@/components/shared/card.component";
import { ImpersonatorAttribute } from "../types/impersonator.type";
import { CardProperty } from "@/types/card.type";
import { ReactElement } from "react";
import {FaMasksTheater} from 'react-icons/fa6';

interface ImpersonatorCardHeader {
  impersonatorAttribute: ImpersonatorAttribute;
  category: string;
}
export function ImpersonatorCard({ impersonatorAttribute, category }: ImpersonatorCardHeader) {
  function getTextSizeClass(answer: string): string {
    if (answer.length <= 20) {
      return "text-3xl";
    } else if (answer.length <= 40) {
      return "text-2xl";
    } else {
      return "text-xl";
    }
  }

  const innerContent: ReactElement = (
    <>
      <div className="p-5 text-center w-full h-full bg-black flex items-center flex-col">
        <div className="px-3 text-center m-auto flex-col flex h-full items-center">
          <div className="text-5xl text-green-500">
          <FaMasksTheater/>
          </div>
          <div className="h-2/3 overflow-hidden flex flex-col align-middle justify-center items-center">
            <h1
              className={
                "font-sans font-bold text-white text-center " +
                getTextSizeClass(impersonatorAttribute.answer)
              }
            >
              {impersonatorAttribute.answer}
            </h1>
          </div>

          <div className="text-white text-2xl pb-3 h-1/3">
            <hr className="my-3"></hr>
            <h4>{category}</h4>
          </div>
        </div>
      </div>
    </>
  );
  const cardProperty: CardProperty = {
    innerContent: innerContent,
  };
  return <Card cardProperty={cardProperty}></Card>;
}
