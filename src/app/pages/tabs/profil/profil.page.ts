import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication-service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  resetPassword() {
    this.authService.ResetPassword(this.userData.email);
    this.toastr.success('Mail envoyé avec succes !', 'Changement de mot de passe ', { timeOut : 5500 }); // Le message reste 5,5 secondes
    this.authService.SignOut();
  }

  editProfil() {
    this.router.navigate(['profil-edit']);
  }

}
