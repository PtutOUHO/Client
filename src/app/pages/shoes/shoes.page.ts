import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Quest } from 'src/app/shared/quest';
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.page.html',
  styleUrls: ['./shoes.page.scss'],
})
export class ShoesPage implements OnInit {
  quest: Quest;

  constructor(private activatedRouter: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit() {
    let quest_id = this.activatedRouter.snapshot.paramMap.get('quest_id');
    var collection = this.authService.afStore.collection("Quest", ref => ref.where('quest_id', '==', quest_id));
    var documentList = collection.valueChanges();
    documentList.forEach(doc => {
      doc.forEach(quest => {
        //Traitement
        this.quest = <Quest>quest;
        this.quest;
      });
    });
  }

}
