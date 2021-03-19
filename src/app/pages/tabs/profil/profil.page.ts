import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})

export class ProfilPage implements OnInit {
  public userData: any;
  constructor(
    public router: Router,
    public authService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  resetPassword() {
    this.authService.ResetPassword(this.userData.email);
    
    this.authService.SignOut();
  }

}
