import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public href: string = "";
  page: string = 'profil';

  constructor(private router: Router) {
    console.log("coucou");
  }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
}

}
