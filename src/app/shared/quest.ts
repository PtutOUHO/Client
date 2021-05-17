import { Course } from "./course";

export class Quest extends Course {
    userId: number;
    period: number;
    type: number;
    nbRp: number;
    distance?: number;
    time?: number;
    //Si la quete est selectionnée
    selection?: {
        shoes: number;
        selection_date: Date; //Now
        expiration_date: Date; //Calcul en fonction de la periode et de la date de selection, vérification à chaque connexion
        //Une fois la quête terminée
        distance_sucess?: number;
        time_sucess?: number;
        percentage?: number; //Calcul en fonction des shoes, de la distance et/ ou du temps accomplie.
    }
    //ATTENTION, une footing quest peut aussi s'expirer si le temps est dépassé!
}
