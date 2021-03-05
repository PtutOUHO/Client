import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public title: string = "";

  
  constructor(private router: Router) {}

  updateTitlePage(value: string): void {
    this.title = value;
  }
}
