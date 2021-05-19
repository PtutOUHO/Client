import { Course } from "./course";

export class Event extends Course {
    author: string;
    date: Date;
    town: string;
    start_coordonate: string;
    finish_coordonate: string;
    distance: number; //calculé en fonction des coordonnées
    user_list?: [{
        userId: string;
        //Une fois terminé ou abandonné
        validation?: boolean;
        total_distance_success?: number; //L'utilisateur peut dire s'il a fini, auquel cas validation sera sur true et cette distance sera sur 0, sinon ce champs sera automatique s'il abandonne.
        time?: number;
    }]; //Si la quete est un event, liste des utilisateurs qui y participent, ainsi que si l'évènement est validé ou non.

    
    constructor() {
        super(null, null, null, null);
        //TODO
    }
}
