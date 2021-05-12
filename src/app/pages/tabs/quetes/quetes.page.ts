import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Quest} from '../../../shared/quest';
import {AuthenticationService} from '../../../shared/authentication-service';


@Component({
  selector: 'app-quetes',
  templateUrl: './quetes.page.html',
  styleUrls: ['./quetes.page.scss'],
})

export class QuetesPage implements OnInit {
  test: any;
  constructor(
    public router: Router,
    private quest: Quest,
    public authService: AuthenticationService,
  ) {}
  creationDateQuest = this.quest.creation_date;
  todayDate = Date.now();

  questList = [
        {
          quest_name: 'Poulet'
        },
        {
          quest_description: 'Clean Code'
        },
        {
          quest_creationDate: '0'
        },
        {
          quest_type: 'on verra'
        },
        {
          quest_nbRp: '200'
        },
        {
          quest_distance: 'optionnel'
        },
        {
          quest_time: 'optionnel'
        },
        {
          quest_userId: 'optionnel'
        }
  ];

    public compareDate(date1: Date, date2: Date): number {
        const d1 = new Date(date1); const d2 = new Date(date2);

        const same = d1.getTime() === d2.getTime();
        if (same) { return 0; }

        if (d1 > d2) { return 1; }

        if (d1 < d2) { return -1; }
    }

    ngOnInit() {

        let uid = JSON.parse(localStorage.getItem('userData')).uid;
        let collection = this.authService.afStore.collection('Quest', ref => ref.where('quest_userId', '==', uid));
        let documentList = collection.valueChanges();
        documentList.forEach(doc => {
            doc.forEach(quest => {
                const quete = quest as Quest;
                console.log(quete.quest_userId);
            });
        });

        if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
            this.generateDailyQuest();
        }
        this.creationDateQuest.setDate(this.creationDateQuest.getDay() + 7);
        if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
            this.generateWeeklyQuest();
        }
        this.creationDateQuest.setDate(this.creationDateQuest.getDay() + 23);
        if (this.compareDate(this.creationDateQuest, this.todayDate) === -1) {
            this.generateMonthlyQuest();
        }
    }
}
