import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";


@Component({
  selector: "app-quetes",
  templateUrl: "./quetes.page.html",
  styleUrls: ["./quetes.page.scss"],
})

export class QuetesPage implements OnInit {
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
      quest_id: "jyguhkfzeioflgzefb", 
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
      quest_id: "jyguhkfzeioflgzefb", 
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
      quest_id: "jyguhkfzeioflgzefb", 
      quest_name: "FootingQuest", 
      quest_description: "Voici la description", 
      quest_creation_date: Date.now(), 
      quest_userId: "83Rx2iDpyoZKJEDqSbbVEhj5pNG2", 
      quest_period: 3, 
      quest_type: 3, 
      nbRp: 1000, 
      quest_distance: 2, 
      quest_temps: 2 },
  ];

  ngOnInit() {
  }

  goToShoes() {
    this.router.navigate(['/shoes', this.questDailyList]);
  }


}
