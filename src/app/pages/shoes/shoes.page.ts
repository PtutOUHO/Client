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

    let quest_id = this.activatedRouter.snapshot.paramMap.get('quest_id');
    this.authService.afStore.collection('Quest').doc(quest_id).valueChanges().forEach(doc => {
      var quest = doc as Quest;
    });
  };

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
  overed(e, css = "checked")
  previousSiblings.forEach(e => e.classList.add(css));
}

function overed(e, css = "checked"){
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
  return siblings;
}



