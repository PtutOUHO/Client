import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuetesEnCoursPage } from './quetes-en-cours.page';

describe('QuetesEnCoursPage', () => {
  let component: QuetesEnCoursPage;
  let fixture: ComponentFixture<QuetesEnCoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuetesEnCoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuetesEnCoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
