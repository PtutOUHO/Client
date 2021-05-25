import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.page.html',
  styleUrls: ['./profil-edit.page.scss'],
})
export class ProfilEditPage implements OnInit {
  userData: any;
  userId: string;

  constructor(
    public authService: AuthenticationService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.userId = this.userData.userId;
  }

  nullMessage() {
    this.toastr.error(
      'Tous les champs ne sont pas remplie',
      'Demande annulée ! ',
      { timeOut: 5500 }
    );
  }

  async updateProfil(
    nom: { value: any },
    prenom: { value: any },
    pseudo: { value: any },
    birthdate: { value: any }
  ) {
    const args = [nom, prenom, pseudo, birthdate];
    let go = true;
    args.forEach((arg) => {
      if (arg.value === '') {
        this.nullMessage();
        go = false;
      }
    });
    if (go) {
      const loading = this.loadingCtrl.create({
        message: 'Modification',
        spinner: 'crescent',
        showBackdrop: true,
      });

      this.afs
        .collection('users')
        .doc(this.userData.uid)
        .set(
          {
            lastname: nom.value,
            firstname: prenom.value,
            pseudo: pseudo.value,
            birthdate: birthdate.value,
          },
          { merge: true }
        )
        .then(() => {
          this.toastr.success('Modification Réussite !', 'sauvegardé ! ', {
            timeOut: 3000,
          }); // Le message reste 5,5 secondes
          this.router.navigate(['/home/profil']);
        })
        .catch((error) => {
          this.toastr.error(error.message, 'erreur ! ', { timeOut: 5500 }); // Le message reste 5,5 secondes
        });
    }
  }
}
