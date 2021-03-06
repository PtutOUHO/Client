import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication-service';
import { HomePage } from '../../../home/home.page';
import { Quest } from 'src/app/shared/quest';
import { User } from 'src/app/shared/user';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  public userData: any;
  // Liste globales des quêtes
  selectedQuest: Quest[];
  // Liste des quêtes du front
  selectedDailyQuest: Quest[] = [];
  selectedWeeklyQuest: Quest[] = [];
  selectedMonthlyQuest: Quest[] = [];

  constructor(
    public router: Router,
    public homePage: HomePage,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('userData')) != null) {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getSelectedQuestFromDatabase();
      }
    }, 500);
  }

  // Récupérer les quêtes sélectionnées par l'utilisateur et attendre avant de déclencher la suite
  async getSelectedQuestFromDatabase() {
    this.selectedQuest = [];
    this.selectedDailyQuest = [];
    this.selectedWeeklyQuest = [];
    this.selectedMonthlyQuest = [];
    const collection = this.authService.afStore.collection('quests', (ref) =>
      ref
        .where('userId', '==', this.userData.uid)
        .where('selection.expired', '==', false)
    );
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach((doc) => {
      const quete = doc.data() as Quest;
      this.selectedQuest.push(quete);
      this.orderSelectedQuestFromPeriod(quete);
    });
    this.ngSuite();
  }

  ngSuite() {
    // Vérifies quelles sont les quêtes expirées puis actualise le front s'il y en a
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
    this.selectedQuest.forEach((quest) => {
      this.orderSelectedQuestFromPeriod(quest);
    });
  }

  checkIfSelectedQuestAreExpired() {
    let index = 0;
    let refresh = false;
    this.selectedQuest.forEach((quete) => {
      if (this.checkDateExpired(quete.selection.expiration_date)) {
        quete.selection.expired = true;
        delete this.selectedQuest[index];
        this.authService.afStore
          .collection('quests')
          .doc(quete.id)
          .set(JSON.parse(JSON.stringify(quete)), {
            merge: true,
          });
        this.giveRewards(quete);

        delete this.selectedQuest[index];
        refresh = true;
      }
      index++;
    });
    if (refresh) {
      this.refreshSelectedDisplay();
    }
  }

  // Attribut les récompenses lors de l'expiration de la quête
  async giveRewards(quete: Quest) {
    const collection = this.authService.afStore.collection('users', (ref) =>
      ref.where('uid', '==', this.userData.uid)
    );
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach((user) => {
      const userData = user.data() as User;

      // Calcul
      let pourcentage: number;
      let rpToGive: number;
      switch (quete.type) {
        case 1:
          // Chrono
          pourcentage = quete.selection.time_sucess / (quete.time * 60 * quete.selection.shoes);
          if (pourcentage > 1) { pourcentage = 1; }
          break;
        case 2:
          // Distance
          pourcentage = quete.selection.distance_sucess / quete.distance * quete.selection.shoes;
          if (pourcentage > 1) { pourcentage = 1; }
          break;
        case 3:
          // Temps gagné
          if (quete.selection.distance_sucess >= quete.distance * quete.selection.shoes) {
            pourcentage = quete.time * quete.selection.shoes * 60 / quete.selection.time_sucess / 100;
          } else if (quete.selection.time_sucess >= quete.time * quete.selection.shoes) {
            // Distance
            pourcentage = quete.selection.distance_sucess / quete.distance * quete.selection.shoes;
            if (pourcentage > 1) { pourcentage = 1; }
          }
          break;
      }
      rpToGive = Math.floor(quete.selection.shoes * quete.nbRp * pourcentage);
      if (userData.nbRp === undefined) { userData.nbRp = 0; }
      userData.nbRp += rpToGive;
      quete.selection.percentage = pourcentage;
      quete.selection.nbRp = rpToGive;

      this.authService.afStore
        .collection('users')
        .doc(this.userData.uid)
        .set(userData, {
          merge: true,
        });

      this.authService.afStore
        .collection('quests')
        .doc(quete.id)
        .set(JSON.parse(JSON.stringify(quete)), {
          merge: true,
        });
    });
  }

  checkDateExpired(date_expiration: Date): boolean {
    // JEST
    const isExpired = this.compareDate(new Date(), date_expiration);
    if (isExpired === 1 || isExpired === 0) {
      return true;
    } else {
      return false;
    }
  }

  public compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) {
      return 0;
    }

    if (d1 > d2) {
      return 1;
    }

    if (d1 < d2) {
      return -1;
    }
  }

  displayMap() {
    this.router.navigate(['home/map']);
    this.homePage.title = 'map';
  }

  displayMapWithDirection() {
    this.router.navigate(['home/trajet-geo']);
    this.homePage.title = 'trajet';
  }

  displayCourseMode() {
    this.router.navigate(['course']);
    this.homePage.title = 'course';
  }
}
