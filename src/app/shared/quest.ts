import { Course } from './course';

export class Quest extends Course {
    userId: number;
    period: number; // 1 = Jour, 2 = Semaine, 3 = Mois
    type: number; // 1 = ChronoQuest, 2 = DistanceQuest, 3 = FootingQuest
    expiration_date: Date;
    nbRp: number;
    distance?: number;
    time?: number;
    // Si la quete est selectionnée
    selection?: {
        shoes: number;
        selection_date: Date; // Now
        expiration_date: Date; // Calcul en fonction de la periode et de la date de selection, vérification à chaque connexion
        expired: boolean; // TODO Penser à mettre sur false lors de la sélection
        // Une fois la quête terminée
        distance_sucess?: number;
        time_sucess?: number;
        // Quete terminée et expirée
        percentage?: number; // Calcul en fonction des shoes, de la distance et/ ou du temps accomplie.
        nbRp?: number;
    };
    // ATTENTION, une footing quest peut aussi s'expirer si le temps est dépassé!

    // Génération de quête
    constructor(id: string, period: number, type: number, distance: number, time: number) {
        let questName: string;
        let questDescription: string;
        let nbRp: number = period * 1000; // Calcul des RP à donner
        switch (type) {
            case 1:
                questName = 'ChronoQuest';
                questDescription = 'Il s\'agit d\'une quête où tout se joue sur le temps, vous devez juste courir pendant le temps imposé avant la date d\'expiration pour accomplir cette quête.';
                break;
            case 2:
                questName = 'DistanceQuest';
                questDescription = 'Il s\'agit d\'une quête où tout se joue sur la distance, vous devez courir l\' équivalent de la distance imposée avant la date d\'expiration pour accomplir cette quête.';
                break;
            case 3:
                questName = 'FootingQuest';
                questDescription = 'Cette quête sera accomplie si vous courez l\' équivalent de la distance imposée pendant le temps donné, et ce avant la date d\'expiration. Vous percevrez un pourcentage de récompense en fonction de votre progression.';
                break;
            default:
                break;
        }
        super(id, questName, questDescription, new Date());
        this.period = period;
        this.expiration_date = new Date();
        switch (period) {
            case 1:
                this.expiration_date.setDate(this.given_date.getDate() + 1);
                break;
            case 2:
                this.expiration_date.setDate(this.given_date.getDate() + 7);
                break;
            case 3:
                this.expiration_date.setDate(this.given_date.getDate() + 31);
                break;
            default:
                break;

        }
        this.userId = JSON.parse(localStorage.getItem('userData')).uid;
        if (distance != null) {
            this.distance = distance;
        }

        if (time != null) {
            this.time = time;
        }
        this.type = type;
        this.nbRp = nbRp;
    }
}
