import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
      public authService: AuthenticationService,
      public router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home/accueil']);
    }
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
        .then((res) => {
          setTimeout(() => {
            
          if (this.authService.isEmailVerified) {
            this.router.navigate(['home/accueil']);
          } else {
            window.alert('Email is not verified');
            return false;
          }
          }, 10)
        }).catch((error) => {
      window.alert(error.message);
    });
  }
  
  ngOnDestroy() {
  }

  goToRegisterPage() {
      this.router.navigate(['registration']);
  }

}
