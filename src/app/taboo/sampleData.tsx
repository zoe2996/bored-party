import { TabooCard, TabooDifficultyColor } from "./types/taboo.type";

export const TABOO_CARDS: Array<TabooCard> = [
    {
        answer:'Paramore',
        taboos:['Rock','Hayley Williams','Misery Business','Still Into You','Decode'],
        difficultyColor: TabooDifficultyColor.EASY
    },
    {
        answer:'Drag Race',
        taboos:['LGBT','gay','show','make-up','lipsync'],
        difficultyColor: TabooDifficultyColor.HARD
    },
    {
        answer:'Coffee',
        taboos:['starbucks','awake','caffeine','drink','breakfast'],
        difficultyColor: TabooDifficultyColor.MEDIUM
    }
]