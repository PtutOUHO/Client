import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../shared/authentication-service";

@Component({
  selector: "app-parametres",
  templateUrl: "./parametres.page.html",
  styleUrls: ["./parametres.page.scss"],
})
export class ParametresPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}
}
