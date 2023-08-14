import Card from "@/components/shared/card.component";
import { ReactElement } from "react";
import { getTabooCardElement } from "./components";
import {TABOO_CARDS} from './sampleData'
import { CardProperty } from "@/types/card.type";


export default function Home(){

    const randomIdx = Math.floor(Math.random()*TABOO_CARDS.length)
    const cardElement: ReactElement = getTabooCardElement(TABOO_CARDS[randomIdx])
    const cardProperty: CardProperty = {
        innerContent: cardElement
    }

    return (<><div className="w-100 h-screen flex items-center bg-orange-300"><div className="m-auto w-1/4"><Card cardProperty={cardProperty} ></Card></div></div></>)
}