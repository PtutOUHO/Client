import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Quest } from 'src/app/shared/quest';
import { AuthenticationService } from "../../shared/authentication-service";
import { QuetesPage } from '../tabs/quetes/quetes.page';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.page.html',
  styleUrls: ['./shoes.page.scss'],
})

export class ShoesPage implements OnInit {
  quest_id: string;
  quest: Quest = { userId: null, period: null, type: null, expiration_date: null, nbRp: null, name: null, id: null, description: null, given_date: null, expired: null, };
  uid = JSON.parse(localStorage.getItem('userData')).uid;
  static difficulty: number = 1;
  difficulty: number = 1;
  constructor(private router: Router, private activatedRouter: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.calculWhenDifficultyChange()
    const allStars = document.querySelectorAll(".shoes");

    allStars.forEach((shoes) => {
      shoes.addEventListener("click", saveRating);
      shoes.addEventListener("mouseover", addCSS);
      shoes.addEventListener("mouseleave", removeCSS);
    });

    this.quest_id = this.activatedRouter.snapshot.paramMap.get('quest_id');
    this.getQuestFromDatabase();
  }
  async calculWhenDifficultyChange() {
    var interval =  setInterval(() => {
      this.difficulty = ShoesPage.difficulty;
    }, 1000);
  }

  returnToQuest(){
    if(confirm("Are you sure you want to abandon your quest ?"))
      this.router.navigate(['/home/quetes']);
  }

  async getQuestFromDatabase() {
    let doc = await this.authService.afStore.collection('quests').doc(this.quest_id).get().toPromise();
    this.quest = doc.data() as Quest;
    if (this.quest.userId != this.uid || this.quest.selection != undefined) {
      alert("You can't try to redirect yourself using an unusual way");
      this.router.navigate(['/home/quetes']);
      return;
    }
  }

  selectQuestWithDifficulty() {
    this.quest.selection = { shoes: null, selection_date: null, expiration_date: null, expired: null };
    this.quest.selection.selection_date = new Date();
    this.quest.selection.expiration_date = new Date();
    this.quest.selection.shoes = ShoesPage.difficulty;

    switch (this.quest.period) {
      case 1:
        this.quest.selection.expiration_date.setDate(this.quest.selection.selection_date.getDate() + 1)
        break;
      case 2:
        this.quest.selection.expiration_date.setDate(this.quest.selection.selection_date.getDate() + 7)
        break;
      case 3:
        this.quest.selection.expiration_date.setDate(this.quest.selection.selection_date.getDate() + 31)
        break;
      default:
        break;
    }
    this.quest.selection.expired = false;
    this.authService.afStore.collection('quests').doc(this.quest.id).set(this.quest, {
      merge: true,
    }).then(() => {
      window.location.href = "/home/quetes";

    });
  }

}

function addCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.add(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  previousSiblings.forEach(e => e.classList.add(css));
}

function removeCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.remove(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  previousSiblings.forEach(e => e.classList.remove(css));
}

function getPreviousSliblings(e) {
  let siblings = [];
  const spanNodeType = 1;
  while (e = e.previousSibling) {
    if (e.nodeType === spanNodeType) {
      siblings = [e, ...siblings];
    }
  }
  ShoesPage.difficulty = siblings.length + 1;
  return siblings;
}

function saveRating(e, css = "checked") {
  removeEventListenersToAllStars();
}

function removeEventListenersToAllStars() {

  const allStars = document.querySelectorAll(".shoes");
  allStars.forEach((star) => {
    star.removeEventListener("click", saveRating);
    star.removeEventListener("mouseover", addCSS);
    star.removeEventListener("mouseleave", removeCSS);
    star.addEventListener("click", customCss)
  });
}

function customCss(e, css = "checked") {
    const overedStar = e.target;

    const allStars = document.querySelectorAll(".shoes");
    allStars.forEach(e => e.classList.remove(css))
    const previousSiblings = getPreviousSliblings(overedStar);
    previousSiblings.push(overedStar)
    previousSiblings.forEach(e => e.classList.add(css));
}



