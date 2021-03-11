import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/authentication-service";
import { Router } from "@angular/router";
import {
  AngularFirestore,
} from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public user: any;
  title = '';

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
    this.user = this.GetUserData();
    localStorage.setItem('userData', this.user);
  }

  updateTitlePage(): void {
    setTimeout(() => {
      var pages = this.router.url.split("/");
      this.title = pages[pages.length - 1];
    }, 1);
  }

  GetUserData() {
    const uid: string = JSON.parse(localStorage.getItem("user")).uid;
    //const doc = this.afStore.doc(`users/${uid}`);
    //const userRef = this.afStore.doc("users/$" + uid).valueChanges;
    //return userRef;
    //${JSON.parse(localStorage.getItem("user")).uid}
    /* this.afStore.collection('users').doc(uid).ref.get().then((doc) => {
      console.log(doc.data);
    }); */

    /*   this.afStore.collection('users').doc("MyOAAInyeMVpbm1sSEdGMfzwfTu1").valueChanges().subscribe(data=>{
      return data;
  }) */
    return this.afStore.collection("users").doc(uid).valueChanges();
    //  localStorage.setItem("userData", userRef.);
  }
  
}
