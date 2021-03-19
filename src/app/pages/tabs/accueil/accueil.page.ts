import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomePage} from '../../../home/home.page';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  public userData: any;

  constructor(
      public router: Router,
      public homePage: HomePage
      ) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  displayMap() {
    this.router.navigate(['home/map']);
    this.homePage.title = 'map';
  }
}
