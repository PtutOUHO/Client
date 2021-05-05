import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/authentication-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public userData: any;
  constructor(
      public authService: AuthenticationService,
      public router: Router,
      private toastr: ToastrService,
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home/accueil']);
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));
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
  
  resetPassword() {
    this.authService.ResetPassword(this.userData.email);
    this.toastr.success('Mail envoyé avec succes !', 'Changement de mot de passe ', { timeOut : 5500 }); // Le message reste 5,5 secondes
    this.authService.SignOut();
    
  }
  
  ngOnDestroy() {
  }

  goToRegisterPage() {
      this.router.navigate(['registration']);

  }

}
