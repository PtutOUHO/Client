import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthenticationService } from 'src/app/shared/authentication-service';
import { Quest } from 'src/app/shared/quest';
declare var google;

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  //Mode course
  interval;
  selectedQuest: Quest[];
  timeSecond: number = 0;
  distanceKm: number = 0.00;
  distanceLastSave: number = 0.00;
  //Mode course


  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  userData: any;
  constructor(private fb: FormBuilder, private geolocation: Geolocation, public authService: AuthenticationService) {
    // this.createDirectionForm();
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getSelectedQuestFromDatabase()

  }

  async getSelectedQuestFromDatabase() {
    this.selectedQuest = [];
    let collection = this.authService.afStore.collection('quests', ref => ref.where('userId', '==', this.userData.uid).where('selection.expired', '==', false));
    const documentList = await collection.get().toPromise();
    documentList.docs.forEach(doc => {
      let quete = doc.data() as Quest;
      this.selectedQuest.push(quete);
    });
  }

  //Mode Course
  //Démarrer le chrono
  async startCourseMode() {
    this.interval = setInterval(() => {
      this.timeSecond++
      //Toutes les 30 secondes
      if (this.timeSecond % 30 == 0 && this.timeSecond != 0) {
        this.addDistanceAndTime(30);
        this.calculPercentage();
      }
    }, 1000)
  }

  //Mettre en pause le chrono
  async pauseCourseMode() {
    clearInterval(this.interval);
  }

  //Arreter le mode course
  async stopCourseMode() {
    //Calculer temps à ajouter depuis la derniere save
    let secondToAdd = this.timeSecond % 30;
    await this.addDistanceAndTime(secondToAdd);
    await this.calculPercentage();
    //TODO Message possible d'arrêt de quête et redirection
  }

  //Ajouter pour chaque quete le temps donner en parametre en fonction de son type, ainsi que la distance calculé
  addDistanceAndTime(secondToAdd: number) {
    this.selectedQuest.forEach(quest => {
      //Ajouter le temps
      if (quest.type == 1 || quest.type == 3) {
        if (quest.selection.time_sucess == undefined)
          quest.selection.time_sucess == 0;
        quest.selection.time_sucess += secondToAdd;

      }
      //Ajouter la distance
      if (quest.type == 2 || quest.type == 3) {
        if (quest.selection.distance_sucess == undefined)
          quest.selection.distance_sucess == 0;
          quest.selection.distance_sucess += (this.distanceKm - this.distanceLastSave)
      }
      //Save
      this.authService.afStore.collection("quests").doc(quest.id).set(quest, {
        merge: true,
      });
    });
    this.distanceLastSave = this.distanceKm;
  }

  //Calculer le pourcentage des quetes en temps réel
  async calculPercentage() {
    let pourcentage: number;
    this.selectedQuest.forEach(quete => {
      switch (quete.type) {
        case 1:
          //Chrono
          quete.selection.percentage = Math.floor(100 * quete.selection.time_sucess / quete.time);
          break;
        case 2:
        case 3:
          //FootingQuest et Distance
          quete.selection.percentage = Math.floor(100 * quete.selection.distance_sucess / quete.distance);
          break;
      }
    })
  }

  //Mode Course

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.geolocation.watchPosition()
        .subscribe(position => {
          if ('coords' in position) {
            console.log(position.coords.longitude + ' ' + position.coords.latitude);
            this.currentLocation.lng = position.coords.longitude;
            this.currentLocation.lat = position.coords.latitude;
          }
        });
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: { lat: 43.60, lng: 1.44 }
    });
    this.directionsDisplay.setMap(map);
  }

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: formValues.destination,
      travelMode: 'WALKING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
