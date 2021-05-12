import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShoesPage } from './shoes.page';

describe('ShoesPage', () => {
  let component: ShoesPage;
  let fixture: ComponentFixture<ShoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
