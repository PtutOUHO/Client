import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication-service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.page.html',
  styleUrls: ['./parametres.page.scss'],
})
export class ParametresPage implements OnInit {
  constructor(
    public home: HomePage, 
    public authService: AuthenticationService,
  ) {}

  ngOnInit() {}

  SignOut() {
    this.authService.SignOut();
    this.home.title = "Accueil";
  }
}
