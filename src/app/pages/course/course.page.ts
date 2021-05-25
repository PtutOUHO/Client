import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { Quest } from 'src/app/shared/quest';
declare var google;

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  // Mode course
  interval;
  courseMode = false;
  selectedQuest: Quest[];
  timeSecond = 0;
  timeToDisplay = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    clock: 0 + ':' + 0 + ':' + 0,
  };
  distanceKm = 0.0;
  distanceLastSave = 0.0;
  // Mode course

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0,
  };
  userData: any;
  latitude: number;
  longitude: number;
  beginLocation = { lat: 0, lng: 0 };

  constructor(
    private fb: FormBuilder,
    private geolocation: Geolocation,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.createDirectionForm();
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
      this.beginLocation.lat = this.currentLocation.lat;
      this.beginLocation.lng = this.currentLocation.lng;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        zoom: 7,
        center: { lat: resp.coords.latitude, lng: resp.coords.longitude },
      });
      this.directionsDisplay.setMap(map);
      this.userData = JSON.parse(localStorage.getItem('userData'));
      this.getSelectedQuestFromDatabase();
    });
  }

  ngOnInit() {}

  async getSelectedQuestFromDatabase() {
    this.selectedQuest = [];
    const collection = this.authService.afStore.collection('quests', (ref) =>
      ref
        .where('userId', '==', this.userData.uid)
        .where('selection.expired', '==', false)
    );
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach((doc) => {
      const quete = doc.data() as Quest;
      if (
        quete.selection.percentage === undefined ||
        quete.selection.percentage < 1
      ) {
        this.selectedQuest.push(quete);
      }
    });
  }

  // Mode Course
  // Démarrer le chrono
  startCourseMode() {
    this.courseMode = true;
    this.interval = setInterval(() => {
      this.timeSecond++;
      this.displayTime();
      // Toutes les 10 secondes
      if (this.timeSecond % 10 === 0 && this.timeSecond !== 0) {
        this.calculDistance();
        this.addDistanceAndTime(10);
        this.calculPercentage();
      }
      if (this.timeSecond % 30 === 0 && this.timeSecond !== 0) {
        // Save
        this.selectedQuest.forEach((quest) => {
          this.authService.afStore
            .collection('quests')
            .doc(quest.id)
            .set(JSON.parse(JSON.stringify(quest)), {
              merge: true,
            });
        });
      }
    }, 1000);
  }

  calculDistance() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    this.distanceKm = Math.sqrt(
      Math.pow(this.currentLocation.lng - this.beginLocation.lng, 2) +
        Math.pow(this.currentLocation.lat - this.beginLocation.lat, 2)
    );
  }

  // Mettre en pause le chrono
  pauseCourseMode() {
    this.courseMode = false;
    clearInterval(this.interval);
  }

  // Arreter le mode course
  stopCourseMode() {
    this.pauseCourseMode();
    // Calculer temps à ajouter depuis la derniere save
    const secondToAdd = this.timeSecond % 30;
    this.addDistanceAndTime(secondToAdd);
    this.calculPercentage();
    // Save
    if (this.selectedQuest.length !== 0) {
      this.selectedQuest.forEach((quest) => {
        this.authService.afStore
          .collection('quests')
          .doc(quest.id)
          .set(JSON.parse(JSON.stringify(quest)), {
            merge: true,
          })
          .then(() => {
            window.location.href = '/home/accueil';
          });
      });
    } else {
      this.router.navigate(['home/accueil']);
    }
  }

  displayTime() {
    this.timeToDisplay = this.convertMillisecondsToDigitalClock(
      this.timeSecond * 1000
    );
  }

  convertMillisecondsToDigitalClock(ms: number) {
    // JEST
    const hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
    const seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    return {
      hours,
      minutes,
      seconds,
      clock: hours + ':' + minutes + ':' + seconds,
    };
  }

  // Ajouter pour chaque quete le temps donner en parametre en fonction de son type, ainsi que la distance calculé
  addDistanceAndTime(secondToAdd: number) {
    this.selectedQuest.forEach((quest) => {
      // Ajouter le temps
      if (quest.type === 1 || quest.type === 3) {
        if (quest.selection.time_sucess === undefined) {
          quest.selection.time_sucess = 0;
        }
        quest.selection.time_sucess = quest.selection.time_sucess + secondToAdd;
      }
      // Ajouter la distance
      if (quest.type === 2 || quest.type === 3) {
        if (quest.selection.distance_sucess === undefined) {
          quest.selection.distance_sucess = 0;
        }
        if (this.distanceLastSave < this.distanceKm) {
          quest.selection.distance_sucess +=
            this.distanceKm - this.distanceLastSave;
        }
        this.distanceLastSave = this.distanceKm;
      }
    });
  }

  // Calculer le pourcentage des quetes en temps réel
  calculPercentage() {
    let pourcentage: number;
    this.selectedQuest.forEach((quete) => {
      if (quete.selection.percentage === undefined) {
        quete.selection.percentage = 0;
      }
      if (quete.selection.percentage < 1) {
        switch (quete.type) {
          case 1:
            // Chrono
            quete.selection.percentage =
              quete.selection.time_sucess / (quete.time * 60 * quete.selection.shoes);
            break;
          case 2:
          case 3:
            // FootingQuest et Distance
            quete.selection.percentage =
              quete.selection.distance_sucess / quete.distance * quete.selection.shoes;
            break;
        }
        if (quete.selection.percentage > 1) { quete.selection.percentage = 1; }
      }
    });
  }

  // Mode Course

  // Map

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route(
      {
        origin: this.currentLocation,
        destination: formValues.destination,
        travelMode: 'WALKING',
      },
      (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required],
    });
  }
}
