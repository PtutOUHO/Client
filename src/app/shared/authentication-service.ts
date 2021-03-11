import { Injectable, NgZone } from "@angular/core";
import { auth } from "firebase/app";
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  SaveUserData() {
    const uid: string = JSON.parse(localStorage.getItem("user")).uid;
    const doc =  this.afStore.doc(`users/${uid}`).toString();
    
    console.log(doc);
    //const userRef = this.afStore.doc("users/$" + uid).valueChanges;
    //return userRef;
    //${JSON.parse(localStorage.getItem("user")).uid}

    //  localStorage.setItem("userData", userRef.);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(["verify-email"]);
    });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          "Password reset email has been sent, please check your inbox."
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["home"]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  /*  SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            pseudo: user.pseudo,
            date_inscription: user.date_inscription
        };
        return userRef.set(userData, {
            merge: true
        });
    }
*/

  //Méthodes universelles
  SetUser(
    uid,
    email,
    firstname,
    lastname,
    pseudo,
    birthdate,
    inscription_date
  ) {
    const user: User = {
      uid: uid,
      email: email,
      firstname: firstname,
      lastname: lastname,
      pseudo: pseudo,
      birthdate: birthdate,
      inscription_date: inscription_date,
    };
    return this.SetUserData(user);
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    return userRef.set(user, {
      merge: true,
    });
  }

  testSetQuest() {
    return this.SaveUserData();
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["login"]);
    });
  }
}
