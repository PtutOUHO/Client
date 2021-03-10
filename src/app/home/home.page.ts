import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  title = '';

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    const pages = this.router.url.split('/');
    this.title = pages[pages.length - 1];

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["login"]);
    }
    else if (this.title == "home") {
      this.router.navigate(["home/accueil"]);
      this.title = "Accueil";
    }
  }

  updateTitlePage(): void {
    setTimeout(() => {
      var pages = this.router.url.split("/");
      this.title = pages[pages.length - 1];
    }, 1);
  }

  
}
