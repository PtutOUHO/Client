import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: "app-quetes",
  templateUrl: "./quetes.page.html",
  styleUrls: ["./quetes.page.scss"],
})
export class QuetesPage implements OnInit {
  test : any;
  constructor(
    public authService: AuthenticationService,
    public router: Router

  ) {}

  public lists = [
    {
      name: 'poulet',
    }
  ];

  ngOnInit() {
  }
}
