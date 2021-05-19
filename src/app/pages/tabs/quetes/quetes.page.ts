import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { from } from "rxjs";
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
  givenQuest: Quest[];
  selectedQuest: Quest[];
  givenDailyQuest: Quest[];
  givenWeeklyQuest: Quest[];
  givenMonthlyQuest: Quest[];
  selectedDailyQuest: Quest[];
  selectedWeeklyQuest: Quest[];
  selectedMonthlyQuest: Quest[];
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
  checkRemainingGivenQuest() {
    //Voir combien de quetes il faut generer et les generer
    var questToGenerate = [1, 2, 3];
    this.givenQuest.forEach(quest => {
      questToGenerate[quest.period - 1]--;
    })
    var index = 1;
    questToGenerate.forEach(numberToGenerate => {
      if (numberToGenerate > 0) {
        for (var i = 0; i < numberToGenerate; i++) {
          this.generateQuest(index);
        }
      }
      index++;
    })
  }

  public compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1); const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) { return 0; }

    if (d1 > d2) { return 1; }

    if (d1 < d2) { return -1; }
  }

  questDailyList = [
    {
      quest_id: "jyguhkfzeioflgzefb",
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      nbRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
  ];

  questWeeklyList = [
    {
      quest_id: "jyguhkfzeioflgzefb",
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      nbRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
    {
      quest_id: "jyguhkfzeioflgzefb",
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      nbRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
  ];

  questMonthlyList = [
    {
      quest_id: 10,
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      bRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
    {
      quest_id: 10,
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      nbRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
    {
      quest_id: 10,
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: new Date(),
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2",
      quest_period: 3,
      quest_type: 3,
      nbRp: 1000,
      quest_distance: 2,
      quest_temps: 2
    },
  ];

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
      this.givenQuest.push(quete);
      switch (quete.period) {
        case 1:
          this.givenDailyQuest.push(quete);
          break;
        case 2:
          this.givenWeeklyQuest.push(quete);
          break;
        case 3:
          this.givenMonthlyQuest.push(quete);
          break;
        default:
          break;
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
      switch (quete.period) {
        case 1:
          this.selectedDailyQuest.push(quete);
          break;
        case 2:
          this.selectedWeeklyQuest.push(quete);
          break;
        case 3:
          this.selectedMonthlyQuest.push(quete);
          break;
        default:
          break;
      }
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
      this.getGivenQuestFromDatabase();
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
        delete this.selectedQuest[index];
        refresh = true;
      }
      index++;
    })
    if (refresh) {
      this.getSelectedQuestFromDatabase();
    }
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

  // CONVERT MILLISECONDS TO DIGITAL CLOCK FORMAT
  convertMillisecondsToDigitalClock(ms: number) {
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

  checkDateExpired(date_expiration: Date): boolean {
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
        questDistance = (Math.floor(Math.random() * 3) + 1) * period;
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
        questTime = (Math.floor(Math.random() * 3) + 1) * period;
        break;
      }
      default: {
        break;
      }
    }
    var id: string = this.afStore.createId();
    var quest = new Quest(id, period, randomType, questDistance, questTime);
    this.authService.afStore.collection('quests').doc(id).set(JSON.parse(JSON.stringify(quest)), {
      merge: true,
    });
  }

}

