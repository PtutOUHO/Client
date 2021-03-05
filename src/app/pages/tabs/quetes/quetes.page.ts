import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quetes',
  templateUrl: './quetes.page.html',
  styleUrls: ['./quetes.page.scss'],
})
export class QuetesPage implements OnInit {

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
