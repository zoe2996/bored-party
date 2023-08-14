import { ReactElement } from "react";
import { TabooCard } from "./types/taboo.type";

export function getTabooCardElement(tabooCard: TabooCard) : ReactElement {

    let tabooElements: ReactElement[] = []

    // loop through taboo words
    tabooCard.taboos.map((taboo:string)=> {
        tabooElements.push(<h3 className="font-sans font-medium text-2xl">{taboo}</h3>)
    })

    const DEFAULT_CLASS = 'p-10 text-center'
    const computedClass = DEFAULT_CLASS+' '+tabooCard.difficultyColor
    return (
        <>
        <div className={computedClass}>
            <div className="p-3">
        <h1 className='font-sans font-bold text-3xl '>{tabooCard.answer}</h1>
            </div>
        <hr></hr>
        <div className="p-2">

        {tabooElements}
        </div>
        </div>
        </>
    )
}