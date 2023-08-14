import {CardProperty} from '@/types/card.type'


function Card({cardProperty}: {cardProperty:CardProperty}){
    return (<>
    <div className="block rounded-xl overflow-hidden">
        {cardProperty?.innerContent}
    </div>
    </>)
}


export default Card