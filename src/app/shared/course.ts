export class Course {
    id: string;
    name: string;
    description: string;
    given_date: Date;
    expired = false;

    // Quest constructeur
    constructor(
        id: string,
        name: string,
        description: string,
        given_date: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.given_date = given_date;
    }
}
