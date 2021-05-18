import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { type } from "os";
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
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {
  }


  ngOnInit() {
    this.afStore = this.authService.afStore;
    this.uid = JSON.parse(localStorage.getItem('userData')).uid;
    this.todayDate = new Date();

    this.givenQuest = this.getGivenQuestFromDatabase();
    this.selectedQuest = this.getSelectedQuestFromDatabase();
    this.checkIfGivenQuestAreExpired();
    this.checkIfSelectedQuestAreExpired();
    this.checkRemainingGivenQuest();
    this.removeUnselectedExpiredQuests();
  }
  checkRemainingGivenQuest() {
    //Voir combien de quetes il faut generer et les generer
    var questToGenerate = [1, 2, 3];
    this.givenQuest.forEach(quest => {
      questToGenerate[quest.period]--;
    })
    var index = 1;
    questToGenerate.forEach(numberToGenerate => {
      for (var i = 0; i < numberToGenerate; i++) {
          this.generateQuest(index);
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
    console.log(id);
    this.router.navigate(['/shoes', id]);
  }

  getGivenQuestFromDatabase(): Quest[] {
    var questList: Quest[];
    let collection = this.authService.afStore.collection('Quest', ref => ref.where('userId', '==', this.uid).where('expired', '==', false));
    let documentList = collection.valueChanges();
    documentList.forEach(doc => {
      doc.forEach(quest => {
        const quete = quest as Quest;
        questList.push(quete);
      });
    });
    return questList;
  }

  getSelectedQuestFromDatabase(): Quest[] {
    var questList: Quest[];
    let collection = this.authService.afStore.collection('Quest', ref => ref.where('userId', '==', this.uid).where('selection.expired', '==', false));
    let documentList = collection.valueChanges();
    documentList.forEach(doc => {
      doc.forEach(quest => {
        const quete = quest as Quest;
        questList.push(quete);
      });
    });
    return questList;
  }

  checkIfGivenQuestAreExpired() {
    var index = 0;
    this.givenQuest.forEach(quete => {
      if (this.checkDateExpired(quete.expiration_date)) {
        quete.expired = true;
        this.authService.afStore.collection('Quest').doc(quete.id).set(quete, {
          merge: true,
        });
        delete this.givenQuest[index];
      }
      index++;
    });
  }

  checkIfSelectedQuestAreExpired() {
    var index = 0;
    this.selectedQuest.forEach(quete => {
      if (this.checkDateExpired(quete.selection.expiration_date)) {
        quete.selection.expired = true;
        this.authService.afStore.collection('Quest').doc(quete.id).set(quete, {
          merge: true,
        });
        //TODO Donner récompenses
        delete this.selectedQuest[index];
      }
      index++;
    })
  }

  removeUnselectedExpiredQuests() {
    //Prendre toutes les quêtes ou selection est nulle et expired est true
    //Les supprimer
    
    let collection = this.authService.afStore.collection('Quest', ref => ref.where('userId', '==', this.uid).where('expired', '==', true).where('selection.expired', '==', null));
    let documentList = collection.valueChanges();
    documentList.forEach(doc => {
      doc.forEach(quest => {
        const quete = quest as Quest;
        this.authService.afStore.collection('Quest').doc(quete.id).delete;
      });
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
    var isExpired = this.compareDate(date_expiration, new Date());
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
    switch (Math.floor(Math.random() * 3)) {
      case 1: {
        questType = "ChronoQuest"
        questDistance = Math.floor(Math.random() * 3) * period;
        questTime = Math.floor(Math.random() * 3) * period;
        break;
      }
      case 2: {
        questType = "DistanceQuest"
        questDistance = Math.floor(Math.random() * 3) * period;
        break;
      }
      case 3: {
        questType = "FootingQuest"
        questTime = Math.floor(Math.random() * 3) * period;
        break;
      }
      default: {
        break;
      }
    }
    if (questType != null) {
      var id: string = this.afStore.createId();
      var quest = new Quest(id, period, questType, questDistance, questTime);
      this.authService.afStore.collection('quests').doc(id).set(quest, {
        merge: true,
      });
    }
  }

}

