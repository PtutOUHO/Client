import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(
      public authService: AuthenticationService,
      public router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

}
