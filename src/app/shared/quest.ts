export class Quest {
    quest_id: string;
    quest_name: string;
    quest_description: string;
    quest_creation_date: Date;
    quest_userId: number;
    quest_period: number;
    quest_type: number;
    quest_nbRp: number;
    quest_admin ?: string;
    quest_town ?: string;
    quest_distance ?: number;
    quest_time ?: number;
    quest_selection: string[];
}
