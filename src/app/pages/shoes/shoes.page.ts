import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.page.html',
  styleUrls: ['./shoes.page.scss'],
})
export class ShoesPage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute) {
    let quest_id = this.activatedRouter.snapshot.paramMap.get('quest_id');
    console.log(quest_id);
   }

  ngOnInit() {
  }

}
