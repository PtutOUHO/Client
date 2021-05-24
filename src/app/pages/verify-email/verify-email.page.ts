import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../shared/authentication-service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.page.html",
  styleUrls: ["./verify-email.page.scss"],
})
export class VerifyEmailPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  public addNumbers (
    number1: number = 1,
    number2: number = 2,
  ): number {
    return number1 + number2;
  }


  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["home/accueil"]);
    }
  }

  redirectLogin() {
    window.location.href = "/login";
  }
}
