import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOfferPage } from './add-offer.page';

describe('AddOfferPage', () => {
  let component: AddOfferPage;
  let fixture: ComponentFixture<AddOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
