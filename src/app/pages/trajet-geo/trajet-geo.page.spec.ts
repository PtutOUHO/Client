import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrajetGeoPage } from './trajet-geo.page';

describe('TrajetGeoPage', () => {
  let component: TrajetGeoPage;
  let fixture: ComponentFixture<TrajetGeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajetGeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrajetGeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
