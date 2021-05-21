import { QuetesPage } from "./quetes.page"
import { Quest } from "src/app/shared/quest";
jest.mock('src/app/shared/quest');

describe('QuetesPage',  () => {
  let fixture: QuetesPage;
  let AuthenticationServiceMock;
  let RouterMock;

  beforeEach( () => {
      fixture = new QuetesPage(
      AuthenticationServiceMock,
      RouterMock,
    );
  });

  describe('convertMillisecondsToDigitalClock', () => {
    it( 'Avec un temps donné en millisecondes avaient un temps en heure, minutes, seconde valide', () => {
    
     let ms: number = 3661000;
     let hours: number = 1;
     let minutes: number = 1;
     let seconds: number = 1;
     let clock = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      clock: hours + ":" + minutes + ":" + seconds
    };
     const result = fixture.convertMillisecondsToDigitalClock(ms)

      expect(result).toEqual(clock);
    });

  });

  describe('convertMillisecondsToDigitalClock', () => {
    it( 'Avec un temps donné en millisecondes faux, ne doit pas faire passer le test', () => {
    
     let ms: number = 3661000;
     let hours: number = 2;
     let minutes: number = 1;
     let seconds: number = 1;
     let clock = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      clock: hours + ":" + minutes + ":" + seconds
    };
     const result = fixture.convertMillisecondsToDigitalClock(ms)

     expect(result).not.toEqual(clock);
    });

  });

  describe('convertMillisecondsToDigitalClock', () => {
    it( 'Avec un temps donné en millisecondes faux en heure et minutes, ne doivent pas faire passer le test', () => {
    
     let ms: number = 3661000;
     let hours: number = 2;
     let minutes: number = 8;
     let seconds: number = 7;
     let clock = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      clock: hours + ":" + minutes + ":" + seconds
    };
     const result = fixture.convertMillisecondsToDigitalClock(ms)

      expect(result).not.toEqual(clock);
    });

  });

  describe('convertMillisecondsToDigitalClock', () => {
    it( 'Avec un temps donné en milliseconde faux en heure et minutes et secondes, ne doit pas faire passer le test', () => {
    
     let ms: number = 3661000;
     let hours: number = 10;
     let minutes: number = 0;
     let seconds: number = 1.5;
     let clock = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      clock: hours + ":" + minutes + ":" + seconds
    };
     const result = fixture.convertMillisecondsToDigitalClock(ms)

      expect(result).not.toEqual(clock);
    });

  });

  describe('orderGivenQuestFromPeriod', () => {  
    
    it( 'Suivant la valeur de période, sélectionne le type de la quête, ici on a sélectionné une DailyQuest', () => {

      var givenQuest: Quest = { 
        userId: null, 
        period: 1, 
        type: null, 
        expiration_date: null,
        nbRp: null, 
        name: null, 
        id: null, 
        description: null, 
        given_date: null, 
        expired: null, };
      
      const result = fixture.orderGivenQuestFromPeriod(givenQuest)
      expect(result[0].length).toEqual(1);

    });

  });

  describe('orderGivenQuestFromPeriod', () => {  
    
    it( 'Suivant la valeur de période, sélectionne le type de la quête, ici on a sélectionné une WeeklyQuest', () => {

      var givenQuest: Quest = { 
        userId: null, 
        period: 2, 
        type: null, 
        expiration_date: null,
        nbRp: null, 
        name: null, 
        id: null, 
        description: null, 
        given_date: null, 
        expired: null, };
      
      const result = fixture.orderGivenQuestFromPeriod(givenQuest)
      expect(result[1].length).toEqual(1);

    });

  });

  describe('orderGivenQuestFromPeriod', () => {  
    
    it( 'Suivant la valeur de période, sélectionne le type de la quête, ici on a sélectionné une MonthlyQuest', () => {

      var givenQuest: Quest = { 
        userId: null, 
        period: 3, 
        type: null, 
        expiration_date: null,
        nbRp: null, 
        name: null, 
        id: null, 
        description: null, 
        given_date: null, 
        expired: null, };
      
      const result = fixture.orderGivenQuestFromPeriod(givenQuest)
      expect(result[2].length).toEqual(1);

    });

  });

  describe('orderGivenQuestFromPeriod', () => {  
    
    it( 'Suivant la valeur de période, sélectionne le type de la quête, ici on a inséré une valeur erronée', () => {

      var givenQuest: Quest = { 
        userId: null, 
        period: 4, 
        type: null, 
        expiration_date: null,
        nbRp: null, 
        name: null, 
        id: null, 
        description: null, 
        given_date: null, 
        expired: null, };
      
      const result = fixture.orderGivenQuestFromPeriod(givenQuest)
      expect(result[2].length).not.toEqual(1);

    });

  });

  });



