import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
declare let google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {
  latitude: any;
  longitude: any;
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  public userData: any;

  constructor(
      private geolocation: Geolocation,
      public router: Router
  ) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        zoom: 6
      });
      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Vous êtes ici ' + this.userData.firstname);
      infoWindow.open(map);
      map.setCenter(pos);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
