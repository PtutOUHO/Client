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
    var pages = this.router.url.split('/');
    this.title = pages[pages.length - 1];
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  updateTitlePage(value: string): void {
    this.title = value;
  }
}
