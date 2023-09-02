
import {CardProperty} from '@/types/card.type'


function Card({cardProperty}: {cardProperty:CardProperty}) {

    return (<>
    <div className="block rounded-xl overflow-hidden w-full h-full bg-gray-500">
        {cardProperty?.innerContent}
    </div>
    </>)
}


export default Card