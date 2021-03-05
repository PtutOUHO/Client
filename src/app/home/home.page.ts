import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public title: string = "";

  constructor(
      public authService: AuthenticationService,
      public router: Router
) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  updateTitlePage(value: string): void {
    this.title = value;
  }
}
