import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "src/app/shared/user";
import { AuthenticationService } from "../../../shared/authentication-service";
import { Quest } from "../../../shared/quest";


@Component({
  selector: "app-quetes",
  templateUrl: "./quetes.page.html",
  styleUrls: ["./quetes.page.scss"],
})

export class QuetesPage implements OnInit {
  afStore: AngularFirestore;
  todayDate: Date;
  uid: any;
  //Liste globales des quêtes
  givenQuest: Quest[];
  selectedQuest: Quest[];
  //Liste des quêtes du front
  givenDailyQuest: Quest[] = [];
  givenWeeklyQuest: Quest[] = [];
  givenMonthlyQuest: Quest[] = [];
  selectedDailyQuest: Quest[] = [];
  selectedWeeklyQuest: Quest[] = [];
  selectedMonthlyQuest: Quest[] = [];
  //Liste des listes de quêtes pour l'actualisation du front
  GivenQuestLists: Quest[][] = [this.givenDailyQuest, this.givenWeeklyQuest, this.givenMonthlyQuest];
  SelectedQuestLists: Quest[][] = [this.selectedDailyQuest, this.selectedWeeklyQuest, this.selectedMonthlyQuest];
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {
    this.afStore = this.authService.afStore;
    this.uid = JSON.parse(localStorage.getItem('userData')).uid;

    this.getGivenQuestFromDatabase();
  }


  ngOnInit() {
  }

  refreshGivenDisplay() {
    this.givenDailyQuest = [];
    this.givenWeeklyQuest = [];
    this.givenMonthlyQuest = [];
    this.givenQuest.forEach(quest => {
      this.orderGivenQuestFromPeriod(quest);
    })
  }
  orderGivenQuestFromPeriod(quest: Quest) {

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
  orderSelectedQuestFromPeriod(quest: Quest) {

    switch (quest.period) {
      case 1:
        this.selectedDailyQuest.push(quest);
        break;
      case 2:
        this.selectedWeeklyQuest.push(quest);
        break;
      case 3:
        this.selectedMonthlyQuest.push(quest);
        break;
      default:
        break;
    }
  }

  refreshSelectedDisplay() {
    this.selectedDailyQuest = [];
    this.selectedWeeklyQuest = [];
    this.selectedMonthlyQuest = [];
  }

  checkRemainingGivenQuest() {
    //Voir combien de quetes il faut generer et les generer
    var questToGenerate = [1, 2, 3];
    this.givenQuest.forEach(quest => {
      questToGenerate[quest.period - 1]--;
    })
    var index = 1;
    var needRefresh: boolean = false;
    questToGenerate.forEach(numberToGenerate => {
      if (numberToGenerate > 0) {
        for (var i = 0; i < numberToGenerate; i++) {
          this.generateQuest(index);
          needRefresh = true;
        }
      }
      index++;
    })
    if (needRefresh)
      this.refreshGivenDisplay()
  }

  public compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1); const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) { return 0; }

    if (d1 > d2) { return 1; }

    if (d1 < d2) { return -1; }
  }

  goToShoes(id) {
    this.router.navigate(['/shoes', id]);
  }

  async getGivenQuestFromDatabase() {
    this.givenQuest = [];
    this.givenDailyQuest = [];
    this.givenWeeklyQuest = [];
    this.givenMonthlyQuest = [];
    let collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      var quete = doc.data() as Quest;
      if (quete.selection == undefined) {
        this.givenQuest.push(quete);
        this.orderGivenQuestFromPeriod(quete)
      }
    });
    this.getSelectedQuestFromDatabase();
  }

  async getSelectedQuestFromDatabase() {
    this.selectedQuest = [];
    this.selectedDailyQuest = [];
    this.selectedWeeklyQuest = [];
    this.selectedMonthlyQuest = [];
    let collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('selection.expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      var quete = doc.data() as Quest;
      this.selectedQuest.push(quete);
      this.orderSelectedQuestFromPeriod(quete)
    });
    this.ngSuite();
  }

  ngSuite() {
    this.checkIfGivenQuestAreExpired();
    this.checkIfSelectedQuestAreExpired();
    this.checkRemainingGivenQuest();
    this.removeUnselectedExpiredQuests();
  }

  checkIfGivenQuestAreExpired() {
    var index = 0;
    var refresh = false;
    this.givenQuest.forEach(quete => {
      if (this.checkDateExpired(quete.expiration_date)) {
        quete.expired = true;
        this.authService.afStore.collection('quests').doc(quete.id).set(quete, {
          merge: true,
        });
        delete this.givenQuest[index];
        refresh = true;
      }
      index++;
    });
    if (refresh) {
      this.refreshGivenDisplay()
    }
  }

  checkIfSelectedQuestAreExpired() {
    var index = 0;
    var refresh = false;
    this.selectedQuest.forEach(quete => {
      if (this.checkDateExpired(quete.selection.expiration_date)) {
        quete.selection.expired = true;
        delete this.selectedQuest[index];
        this.authService.afStore.collection('quests').doc(quete.id).set(quete, {
          merge: true,
        });
        //TODO Donner récompenses
        this.giveRewards(quete);

        delete this.selectedQuest[index];
        refresh = true;
      }
      index++;
    })
    if (refresh) {
      this.refreshSelectedDisplay()
    }
  }

  async giveRewards(quete: Quest) {
    let collection = this.authService.afStore.collection('users', ref => ref.where('uid', '==', this.uid));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(user => {
      var userData = user.data() as User;

      //Calcul
      var pourcentage: number;
      var rpToGive: number;
      switch (quete.type) {
        case 1:
          //Chrono
          pourcentage = Math.floor(100 * quete.selection.time_sucess / quete.time);
          rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          break;
        case 2:
          //Distance
          pourcentage = Math.floor(100 * quete.selection.distance_sucess / quete.distance);
          rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          break;
        case 3:
          //Distance
          if (quete.selection.distance_sucess == quete.distance) {
            var pourcentageTempsGagne = Math.floor(100 * quete.time / quete.selection.time_sucess);
            rpToGive = quete.selection.shoes * quete.nbRp * pourcentageTempsGagne / 100;

          }
          else if (quete.selection.time_sucess == quete.time) {
            //Temps gagné
            pourcentage = Math.floor(100 * quete.selection.distance_sucess / quete.distance);
            rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          }
          break;
      }
      rpToGive = Math.floor(rpToGive);
      userData.nbRp += rpToGive;
      quete.selection.percentage = pourcentage;
      quete.selection.nbRp = rpToGive;

      this.authService.afStore.collection('users').doc(this.uid).set(userData, {
        merge: true,
      });

      this.authService.afStore.collection('quests').doc(quete.id).set(quete, {
        merge: true,
      });
    });
  }

  async removeUnselectedExpiredQuests() {
    //Prendre toutes les quêtes ou selection est nulle et expired est true
    //Les supprimer
    let collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('expired', '==', true));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      var quete = doc.data() as Quest;
      if (quete.selection == undefined)
        this.authService.afStore.collection('quests').doc(quete.id).delete();
    });
  }

  getRemainingTime(date_expiration: Date): any {
    var now = new Date().valueOf();
    var ms = date_expiration.valueOf() - now;
    return this.convertMillisecondsToDigitalClock(ms);

  }

  // Avoir le temps restant
  convertMillisecondsToDigitalClock(ms: number) { //JEST
    var hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    var minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
    var seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      clock: hours + ":" + minutes + ":" + seconds
    };
  }

  checkDateExpired(date_expiration: Date): boolean { //JEST
    var isExpired = this.compareDate(new Date(), date_expiration);
    if (isExpired == 1 || isExpired == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  //Génération
  generateQuest(period: number) {
    var questType;
    var questDistance;
    var questTime;
    var randomType = Math.floor(Math.random() * 3) + 1;
    switch (randomType) {
      case 1: {
        //"ChronoQuest"
        questTime = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      case 2: {
        //"DistanceQuest"
        questDistance = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      case 3: {
        //"FootingQuest"
        questDistance = (Math.floor(Math.random() * 3) + 1) * period;
        questTime = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      default: {
        break;
      }
    }
    var id: string = this.afStore.createId();
    var quest = new Quest(id, period, randomType, questDistance, questTime);
    this.givenQuest.push(quest);
    this.authService.afStore.collection('quests').doc(id).set(JSON.parse(JSON.stringify(quest)), {
      merge: true,
    });
  }

}

