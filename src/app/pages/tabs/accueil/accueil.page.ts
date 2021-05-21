import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from "../../../shared/authentication-service";
import {HomePage} from '../../../home/home.page';
import { Quest } from 'src/app/shared/quest';
import { User } from 'src/app/shared/user';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  public userData: any;
  uid = JSON.parse(localStorage.getItem('userData')).uid;
  //Liste globales des quêtes
  selectedQuest: Quest[];
  //Liste des quêtes du front
  selectedDailyQuest: Quest[] = [];
  selectedWeeklyQuest: Quest[] = [];
  selectedMonthlyQuest: Quest[] = [];

  constructor(
      public router: Router,
      public homePage: HomePage,
      public authService: AuthenticationService
      ) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getSelectedQuestFromDatabase();
  } 

  //Récupérer les quêtes sélectionnées par l'utilisateur et attendre avant de déclencher la suite
  async getSelectedQuestFromDatabase() {
    this.selectedQuest = [];
    this.selectedDailyQuest = [];
    this.selectedWeeklyQuest = [];
    this.selectedMonthlyQuest = [];
    let collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.uid).where('selection.expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      var quete = doc.data() as Quest;
      this.selectedQuest.push(quete);
      this.orderSelectedQuestFromPeriod(quete)
    });
    this.ngSuite();
  }

  ngSuite() {
    //Vérifies quelles sont les quêtes expirées puis actualise le front s'il y en a
    this.checkIfSelectedQuestAreExpired();
  }

  
  orderSelectedQuestFromPeriod(quest: Quest) {

    switch (quest.period) {
      case 1:
        this.selectedDailyQuest.push(quest);
        break;
      case 2:
        this.selectedWeeklyQuest.push(quest);
        break;
      case 3:
        this.selectedMonthlyQuest.push(quest);
        break;
      default:
        break;
    }
  }

  refreshSelectedDisplay() {
    this.selectedDailyQuest = [];
    this.selectedWeeklyQuest = [];
    this.selectedMonthlyQuest = [];
    this.selectedQuest.forEach(quest => {
      this.orderSelectedQuestFromPeriod(quest);
    })
  }

  checkIfSelectedQuestAreExpired() {
    var index = 0;
    var refresh = false;
    this.selectedQuest.forEach(quete => {
      if (this.checkDateExpired(quete.selection.expiration_date)) {
        quete.selection.expired = true;
        delete this.selectedQuest[index];
        this.authService.afStore.collection('quests').doc(quete.id).set(quete, {
          merge: true,
        });
        this.giveRewards(quete);

        delete this.selectedQuest[index];
        refresh = true;
      }
      index++;
    })
    if (refresh) {
      this.refreshSelectedDisplay()
    }
    console.log(this.selectedQuest)
  }

  //Attribut les récompenses lors de l'expiration de la quête
  async giveRewards(quete: Quest) {
    let collection = this.authService.afStore.collection('users', ref => ref.where('uid', '==', this.uid));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(user => {
      var userData = user.data() as User;

      //Calcul
      var pourcentage: number;
      var rpToGive: number;
      switch (quete.type) {
        case 1:
          //Chrono
          pourcentage = Math.floor(100 * quete.selection.time_sucess / quete.time);
          rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          break;
        case 2:
          //Distance
          pourcentage = Math.floor(100 * quete.selection.distance_sucess / quete.distance);
          rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          break;
        case 3:
          //Distance
          if (quete.selection.distance_sucess == quete.distance) {
            var pourcentageTempsGagne = Math.floor(100 * quete.time / quete.selection.time_sucess);
            rpToGive = quete.selection.shoes * quete.nbRp * pourcentageTempsGagne / 100;

          }
          else if (quete.selection.time_sucess == quete.time) {
            //Temps gagné
            pourcentage = Math.floor(100 * quete.selection.distance_sucess / quete.distance);
            rpToGive = quete.selection.shoes * quete.nbRp * pourcentage / 100;
          }
          break;
      }
      rpToGive = Math.floor(rpToGive);
      userData.nbRp += rpToGive;
      quete.selection.percentage = pourcentage;
      quete.selection.nbRp = rpToGive;

      this.authService.afStore.collection('users').doc(this.uid).set(userData, {
        merge: true,
      });

      this.authService.afStore.collection('quests').doc(quete.id).set(quete, {
        merge: true,
      });
    });
  }

  checkDateExpired(date_expiration: Date): boolean { //JEST
    var isExpired = this.compareDate(new Date(), date_expiration);
    if (isExpired == 1 || isExpired == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  public compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1); const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) { return 0; }

    if (d1 > d2) { return 1; }

    if (d1 < d2) { return -1; }
  }

  displayMap() {
    this.router.navigate(['home/map']);
    this.homePage.title = 'map';
  }

  displayMapWithDirection() {
    this.router.navigate(['home/trajet-geo']);
    this.homePage.title = 'trajet';
  }

  goToQuestEnCours(){
    this.router.navigate(['/quetes-en-cours']);
  }

  displayQuestRide() {
    this.router.navigate(['/course']);
  }
}
