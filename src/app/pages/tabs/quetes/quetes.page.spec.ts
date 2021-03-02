import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuetesPage } from './quetes.page';

describe('QuetesPage', () => {
  let component: QuetesPage;
  let fixture: ComponentFixture<QuetesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuetesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
