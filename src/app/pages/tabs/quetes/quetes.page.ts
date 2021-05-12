import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";
import { Quest } from "../../../shared/quest";


@Component({
  selector: 'app-quetes',
  templateUrl: './quetes.page.html',
  styleUrls: ['./quetes.page.scss'],
})

export class QuetesPage implements OnInit {
  afStore: AngularFirestore;
  todayDate: Date;
  constructor(
    public router: Router,
    private quest: Quest,
    public authService: AuthenticationService,
  ) {}


  ngOnInit() {
    this.afStore = this.authService.afStore;
    this.todayDate = new Date();

    let uid = JSON.parse(localStorage.getItem('userData')).uid;
    let collection = this.authService.afStore.collection('Quest', ref => ref.where('quest_userId', '==', uid));
    let documentList = collection.valueChanges();
    documentList.forEach(doc => {
        doc.forEach(quest => {
            const quete = quest as Quest;
            console.log(quete.quest_userId);
        });
    });

    if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
        this.generateDailyQuest();
    }
    this.creationDateQuest.setDate(this.creationDateQuest.getDay() + 7);
    if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
        this.generateWeeklyQuest();
    }
    this.creationDateQuest.setDate(this.creationDateQuest.getDay() + 23);
    if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
        this.generateMonthlyQuest();
    }
}

async generateDailyQuest() {
  var questType;
  var questDistance;
  var questTime;
  var uid = JSON.parse(localStorage.getItem('userData')).uid;
  var collection = this.authService.afStore.collection("Quest", ref => ref.where('quest_userId', '==', uid));
  var documentList = collection.valueChanges();
  documentList.forEach(doc => {
    doc.forEach(quest => {
      var quete = <Quest>quest;
      var date_expiration: Date;
      date_expiration.setDate(quete.quest_creation_date.getDay() + 1)
      if (this.compareDate(date_expiration, this.todayDate) == 1) {
        
      }
    });

  });
  switch (Math.floor(Math.random() * 3)) {
    case 1: {
      questType = "ChronoQuest"
      questDistance = Math.floor(Math.random() * 3);
      questTime = Math.floor(Math.random() * 3);
      break;
    }
    case 2: {
      questType = "DistanceQuest"
      questDistance = Math.floor(Math.random() * 3);
      break;
    }
    case 3: {
      questType = "FootingQuest"
      questTime = Math.floor(Math.random() * 3);
      break;
    }
    default: {
      break;
    }
  }
  if (questType != null) {
    var documentName = "dailyQuest_" + Date.now();
    await this.authService.afStore.collection('quests').add({ original: documentName });
    this.authService.afStore.collection('quests').doc(documentName).set({
      quest_name: documentName,
      quest_description: "test",
      quest_creationDate: Date.now(),
      quest_type: questType,
      quest_nbRp: 1000,
      quest_distance: questDistance,
      quest_time: questTime,
    });
  }
}
generateMonthlyQuest() {
  throw new Error("Method not implemented.");
}
generateWeeklyQuest() {
  throw new Error("Method not implemented.");
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
      quest_temps: 2 },
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
      quest_temps: 2 },
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
      quest_temps: 2 },
  ];

  goToShoes(id) {
    console.log(id);
    this.router.navigate(['/shoes', id]);
  }
}
