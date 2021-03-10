export interface Quest {
    qid: string;
    name: string;
    description: string;
    creation_date: Date;
    quest_period: number;
    quest_type: number;
    quest_nbRp: number;
    quest_admin: string;
    quest_pseudo: string;
    distance: number;
    time: number;
}
