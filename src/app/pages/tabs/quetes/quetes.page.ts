import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";
import { Quest } from "../../../shared/quest";


@Component({
  selector: "app-quetes",
  templateUrl: "./quetes.page.html",
  styleUrls: ["./quetes.page.scss"],
})

export class QuetesPage implements OnInit {
<<<<<<< HEAD
  afStore: AngularFirestore;
  constructor(
    public authService: AuthenticationService,
    public router: Router

  ) { }

  questList = [
    {
      quest_name: 'Poulet'
    },
    {
      quest_description: 'Clean Code'
    },
    {
      quest_creationDate: '0'
    },
    {
      quest_type: 'on verra'
    },
    {
      quest_nbRp: '200'
    },
    {
      quest_distance: 'optionnel'
    },
    {
      quest_time: 'optionnel'
    },
    {
      quest_userId: 'optionnel'
    }
=======
  test: any;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  questDailyList = [
    {
      quest_id: "jyguhkfzeioflgzefb",
      quest_name: "FootingQuest",
      quest_description: "Voici la description",
      quest_creation_date: Date.now(),
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
      quest_creation_date: Date.now(),
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
      quest_creation_date: Date.now(), 
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
      quest_creation_date: Date.now(), 
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
      quest_creation_date: Date.now(), 
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
      quest_creation_date: Date.now(), 
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2", 
      quest_period: 3, 
      quest_type: 3, 
      nbRp: 1000, 
      quest_distance: 2, 
      quest_temps: 2 },
>>>>>>> 9bb8648dd0e7c5b2fb94d8a04e22fabec4e4d9dc
  ];

  ngOnInit() {
    this.afStore = this.authService.afStore;
    this.generateDailyQuest();
  }

  generateDailyQuest() {
    var questType;
    var questDistance;
    var questTime;
    var uid = JSON.parse(localStorage.getItem('userData')).uid;
    var collection = this.authService.afStore.collection("Quest", ref => ref.where('quest_userId', '==', uid));
    var documentList = collection.valueChanges();
    documentList.forEach(doc => {
      doc.forEach(quest => {
        var quete = <Quest>quest;
        if (compareDate(quete.quest_creation_date.getDay() + 1, this.todayDate) == 1) {
          
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

  goToShoes(id) {
    console.log(id);
    this.router.navigate(['/shoes', id]);
  }


}
