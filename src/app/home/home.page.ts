import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";
import {
  AngularFirestore,
} from "@angular/fire/firestore";
import { LoginPage } from "../pages/login/login.page";
import { RegistrationPage } from "../pages/registration/registration.page";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  public userData: any;
  title = '';
  login: LoginPage;
  register: RegistrationPage;

  constructor(
    public afStore: AngularFirestore,
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
    this.GetUserData();
  }  

  ngOnDestroy() {
  }

  updateTitlePage(): void {
    setTimeout(() => {
      let pages = this.router.url.split("/");
      this.title = pages[pages.length - 1];
    }, 1);
  }

  GetUserData() {
    const uid: string = JSON.parse(localStorage.getItem("user")).uid;
    const test: string = "";
    this.afStore.collection("users").doc(uid).valueChanges().subscribe((data : string)=>{ localStorage.setItem("userData", JSON.stringify(data));});
  }

  SignOut() {
    this.authService.SignOut();
    this.ngOnDestroy();
  }
  
}
