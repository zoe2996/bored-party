export type TabooCard = {
    answer: string;
    taboos: readonly[string, string, string, string, string];
    difficultyColor: TabooDifficultyColor
}



export enum TabooDifficultyColor {
    EASY='bg-green-700',
    MEDIUM='bg-amber-600',
    HARD='bg-red-600',
    VERY_HARD='bg-rose-950'
}