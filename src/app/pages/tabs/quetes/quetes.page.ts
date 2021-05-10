import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: "app-quetes",
  templateUrl: "./quetes.page.html",
  styleUrls: ["./quetes.page.scss"],
})

export class QuetesPage implements OnInit {
  test : any;
  constructor(
    public authService: AuthenticationService,
    public router: Router

  ) {}
    
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
  ];

  ngOnInit() {
  }
}
