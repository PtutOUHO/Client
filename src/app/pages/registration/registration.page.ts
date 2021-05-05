import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../shared/authentication-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
      public authService: AuthenticationService,
      public router: Router,
      private toastr: ToastrService

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
          this.toastr.success('Mail envoyé avec succes !', 'un email vous as été envoyé', { timeOut : 5500 }); // Le message reste 5,5 secondes
          this.router.navigate(['verify-email']);
        }).catch((error) => {
      window.alert(error.message);
    });
  }
  
  ngOnDestroy() {
  }

}
