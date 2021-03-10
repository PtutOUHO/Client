import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
      public authService: AuthenticationService,
      public router: Router
  ) { }

  ngOnInit(){
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home/accueil']);
    }}

  signUp(email, password, firstname, lastname, pseudo, birthdate){
    this.authService.RegisterUser(email.value, password.value)
        .then((res) => {
          this.authService.SetUser(res.user.uid, email.value, firstname.value, lastname.value, pseudo.value, birthdate.value, new Date());
          this.authService.SendVerificationMail();
          this.router.navigate(['verify-email']);
        }).catch((error) => {
      window.alert(error.message);
    });
  }

}
