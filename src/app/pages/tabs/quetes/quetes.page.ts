import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication-service';
import { Quest } from '../../../shared/quest';


@Component({
  selector: 'app-quetes',
  templateUrl: './quetes.page.html',
  styleUrls: ['./quetes.page.scss'],
})

export class QuetesPage implements OnInit {
  afStore: AngularFirestore;
  todayDate: Date;
  uid: any;
  // Liste globales des quêtes
  givenQuest: Quest[];
  // Liste des quêtes du front
  givenDailyQuest: Quest[] = [];
  givenWeeklyQuest: Quest[] = [];
  givenMonthlyQuest: Quest[] = [];
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.afStore = this.authService.afStore;
    this.uid = JSON.parse(localStorage.getItem('userData')).uid;

    this.getGivenQuestFromDatabase();
  }

  // Récupérer les quêtes proposées à l'utilisateur et attendre avant de déclencher la suite
  async getGivenQuestFromDatabase() {
    this.givenQuest = [];
    this.givenDailyQuest = [];
    this.givenWeeklyQuest = [];
    this.givenMonthlyQuest = [];
    const collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      const quete = doc.data() as Quest;
      this.givenQuest.push(quete);
      this.orderGivenQuestFromPeriod(quete);
    });
    this.ngSuite();
  }

  ngSuite() {
    // Vérifies quelles sont les quêtes expirées puis actualise le front s'il y en a
    this.checkIfGivenQuestAreExpired();

    // Vérifies si l'utilisateur a le bon nombre de quêtes proposées, sinon les génère et actualise le front
    this.checkRemainingGivenQuest();

    // Supprimes les quêtes expirées seulement si elles n'ont jamais été sélectionnées (pour les stats)
    this.removeUnselectedExpiredQuests();
  }

  // Trie les quêtes par période pour le front
  orderGivenQuestFromPeriod(quest: Quest) {
    if (quest.selection === undefined) {
      switch (quest.period) {
        case 1:
          this.givenDailyQuest.push(quest);
          break;
        case 2:
          this.givenWeeklyQuest.push(quest);
          break;
        case 3:
          this.givenMonthlyQuest.push(quest);
          break;
        default:
          break;
      }
    }
    return [this.givenDailyQuest, this.givenWeeklyQuest, this.givenMonthlyQuest]; // Pour les tests
  }

  // Actualise le front
  refreshGivenDisplay() {
    this.givenDailyQuest = [];
    this.givenWeeklyQuest = [];
    this.givenMonthlyQuest = [];
    this.givenQuest.forEach(quest => {
      this.orderGivenQuestFromPeriod(quest);
    });
  }

  checkRemainingGivenQuest() {
    // Voir combien de quetes il faut generer et les generer
    const questToGenerate = [1, 2, 3];
    this.givenQuest.forEach(quest => {
      questToGenerate[quest.period - 1]--;
    });
    let index = 1;
    let needRefresh = false;
    questToGenerate.forEach(numberToGenerate => {
      if (numberToGenerate > 0) {
        for (let i = 0; i < numberToGenerate; i++) {
          this.generateQuest(index);
          needRefresh = true;
        }
      }
      index++;
    });
    if (needRefresh) {
      this.refreshGivenDisplay();
    }
  }

  checkIfGivenQuestAreExpired() {
    let index = 0;
    let refresh = false;
    this.givenQuest.forEach(quete => {
      if (this.checkDateExpired(quete.expiration_date)) {
        quete.expired = true;
        this.authService.afStore.collection('quests').doc(quete.id).set(JSON.parse(JSON.stringify(quete)), {
          merge: true,
        });
        delete this.givenQuest[index];
        refresh = true;
      }
      index++;
    });
    if (refresh) {
      this.refreshGivenDisplay();
    }
  }

  async removeUnselectedExpiredQuests() {
    // Prendre toutes les quêtes ou selection est null et expired est true
    // Les supprimer
    const collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('expired', '==', true));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      const quete = doc.data() as Quest;
      if (quete.selection === undefined) {
        this.authService.afStore.collection('quests').doc(quete.id).delete();
      }
    });
  }

  getRemainingTime(date_expiration: Date): any {
    const now = new Date().valueOf();
    const ms = date_expiration.valueOf() - now;
    return this.convertMillisecondsToDigitalClock(ms);

  }

  // Avoir le temps restant
  convertMillisecondsToDigitalClock(ms: number) { // JEST
    const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
    const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    return {
      hours,
      minutes,
      seconds,
      clock: hours + ':' + minutes + ':' + seconds
    };
  }

  checkDateExpired(date_expiration: Date): boolean { // JEST
    const isExpired = this.compareDate(new Date(), date_expiration);
    if (isExpired === 1 || isExpired === 0) {
      return true;
    }
    else {
      return false;
    }
  }

  public compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1); const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) { return 0; }

    if (d1 > d2) { return 1; }

    if (d1 < d2) { return -1; }
  }

  // Génération
  generateQuest(period: number) {
    let questType;
    let questDistance;
    let questTime;
    let randomType = Math.floor(Math.random() * 3) + 1;
    switch (randomType) {
      case 1: {
        // "ChronoQuest"
        questTime = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      case 2: {
        // "DistanceQuest"
        questDistance = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      case 3: {
        // "FootingQuest"
        questDistance = (Math.floor(Math.random() * 3) + 1) * period;
        questTime = (Math.floor(Math.random() * 3) + 1) * period * 11;
        break;
      }
      default: {
        break;
      }
    }
    const id: string = this.afStore.createId();
    const quest = new Quest(id, period, randomType, questDistance, questTime);
    this.givenQuest.push(quest);
    this.authService.afStore.collection('quests').doc(id).set(JSON.parse(JSON.stringify(quest)), {
      merge: true,
    });
  }

  async goToShoes(id) {
    let index = 0;
    const collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('selection.expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      index++;
  });
    if (index >= 3) {
    alert('You can only choose 3 quests maximum !');
  }
  else {
    this.router.navigate(['/shoes', id]);
  }
}

}

