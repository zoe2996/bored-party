export type TabooAttribute = {
    answer: string;
    taboos: readonly[string, string, string, string, string];
    difficultyColor: TabooDifficultyColor
}



export enum TabooDifficultyColor {
    EASY='bg-sky-500',
    MEDIUM='bg-emerald-600',
    HARD='bg-red-500',
    VERY_HARD='bg-rose-950'
}