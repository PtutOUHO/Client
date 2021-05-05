export interface Runner {
    uid: string;
    runner_point: number;
    quests: [string, boolean, Date, number, number];
}
