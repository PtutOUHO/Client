import { QuetesPage } from "./quetes.page"
import {VerifyEmailPage} from '../../verify-email/verify-email.page';

describe('QuetesPage',  () => {
    let fixture: QuetesPage;
    let AuthenticationServiceMock;
    let RouterMock;

    beforeEach( () => {
        fixture = new QuetesPage(
            AuthenticationServiceMock,
            RouterMock
        );
    });

    describe('compareDate', () => {
        it('Les dates sont identiques,renvoie 0', () => {
            const date1: Date = new Date(2021,1,2, 12,34,56);
            const date2: Date = new Date(2021,1,2, 12,34,56);

            const result = fixture.compareDate(date1, date2);

            expect(result).toEqual(0);

        });
    });

    describe('compareDate', () => {
        it('La date 1 est supérieure à la date 2,renvoie 1', () => {
            const date1: Date = new Date(2021,2,2, 12,34,56);
            const date2: Date = new Date(2021,1,2, 12,34,56);

            const result = fixture.compareDate(date1, date2);

            expect(result).toEqual(1);

        });
    });

    describe('compareDate', () => {
        it('La date 2 est supérieure à la date 1,renvoie -1', () => {
            const date1: Date = new Date(2021,1,2, 12,34,56);
            const date2: Date = new Date(2021,2,2, 12,34,56);

            const result = fixture.compareDate(date1, date2);

            expect(result).toEqual(-1);

        });
    });

    describe('checkDateExpired', () => {
        it('La date d expiration est aujourdhui, renvoie true', () => {
            const dateExpiration: Date = new Date();
            dateExpiration.setDate(dateExpiration.getDate());

            const result = fixture.checkDateExpired(dateExpiration);

            expect(result).toBeTruthy();

        });
    });

    describe('checkDateExpired', () => {
        it('La date d expiration est hier, renvoie true', () => {
            const dateExpiration: Date = new Date();
            dateExpiration.setDate(dateExpiration.getDate()-1);

            const result = fixture.checkDateExpired(dateExpiration);

            expect(result).toBeTruthy();

        });
    });

    describe('checkDateExpired', () => {
        it('La date d expiration est demain, renvoie false', () => {
            const dateExpiration: Date = new Date();
            dateExpiration.setDate(dateExpiration.getDate()+1);

            const result = fixture.checkDateExpired(dateExpiration);
            
            expect(result).toBeFalsy();

        });
    });
});
