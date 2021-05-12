import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './amis.page.html',
  styleUrls: ['./amis.page.scss'],
})
export class AmisPage implements OnInit {

  constructor(
      public router: Router
  ) { }

  ngOnInit() {
  }

}
