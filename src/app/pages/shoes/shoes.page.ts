import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Quest } from 'src/app/shared/quest';
import { AuthenticationService } from "../../shared/authentication-service";

/* const allStars = document.querySelectorAll('.shoes');
const rating = document.querySelector('.rating');

function saveRating(e) {
  removeEventListenerToAllStars();
  rating.innerHTML = e.target.dataset.shoes;
}

function removeEventListenerToAllStars() {
  allStars.forEach((shoes => {
    shoes.removeEventListener("click", saveRating);
    shoes.removeEventListener("mouseover", addCSS);
    shoes.removeEventListener("mouseleave", removeCSS);
  }))
}

function addCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.add(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  console.log("previousSibling", previousSiblings);
  previousSiblings.forEach(e => e.classList.add(css));
}


function removeCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.remove(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  console.log("previousSibling", previousSiblings);
  previousSiblings.forEach(e => e.classList.remove(css));

}

function getPreviousSliblings(e) {
  console.log("e.previousSibling", e.previousSibling);
  let siblings = [];
  const spanNodeType = 1;
  while (e = e.previousSibling) {
    if (e.nodeType === spanNodeType) {
      siblings = [e, ...siblings];
    }
  }
  return siblings;
} */

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.page.html',
  styleUrls: ['./shoes.page.scss'],
})

export class ShoesPage implements OnInit {
  quest_id: string;
  quest: Quest = {userId: null, period: null, type: null, expiration_date: null, nbRp: null, name: null, id: null, description: null, given_date: null, expired: null, };
  uid = JSON.parse(localStorage.getItem('userData')).uid;
  static difficulty: number = 1;
  constructor(private activatedRouter: ActivatedRoute, private authService: AuthenticationService) {
  }

  ngOnInit() {
    const allStars = document.querySelectorAll(".shoes");
    //const rating = document.querySelectorAll(".rating");
    console.log("allStars", allStars);

    allStars.forEach((shoes) => {
      shoes.addEventListener("click", saveRating);
      shoes.addEventListener("mouseover", addCSS);
      shoes.addEventListener("mouseleave", removeCSS);
    });

    this.quest_id = this.activatedRouter.snapshot.paramMap.get('quest_id');
    this.getQuestFromDatabase();
  }
  
  async getQuestFromDatabase() {
    var doc = await this.authService.afStore.collection('quests').doc(this.quest_id).get().toPromise();
    this.quest = doc.data() as Quest;
    if (this.quest.userId != this.uid || this.quest.selection != undefined) {
      //TODO Afficher erreur et redirection
      return;
    }
  }

  selectQuestWithDifficulty() {
    this.quest.selection.selection_date = new Date();
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
  });
  //TODO Redirection
  }

}

function saveRating(e) {
  removeEventListenerToAllStars();
}

function removeEventListenerToAllStars() {
  const allStars = document.querySelectorAll(".shoes");
  allStars.forEach((shoes) => {
    shoes.removeEventListener("click", saveRating);
    shoes.removeEventListener("mouseover", addCSS);
    shoes.removeEventListener("mouseleave", removeCSS);
  });
}

function addCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.add(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  console.log("previousSibling", previousSiblings);
  previousSiblings.forEach(e => e.classList.add(css));
}

function overed(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.add(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  console.log("previousSibling", previousSiblings);
}


function removeCSS(e, css = "checked") {
  const overedStar = e.target;
  overedStar.classList.remove(css);
  const previousSiblings = getPreviousSliblings(overedStar);
  console.log("previousSibling", previousSiblings);
  previousSiblings.forEach(e => e.classList.remove(css));

}

function getPreviousSliblings(e) {
  console.log("e.previousSibling", e.previousSibling);
  let siblings = [];
  const spanNodeType = 1;
  while (e = e.previousSibling) {
    if (e.nodeType === spanNodeType) {
      siblings = [e, ...siblings];
    }
  }
  ShoesPage.difficulty = siblings.length + 1;
  alert(ShoesPage.difficulty)
  return siblings;
}



