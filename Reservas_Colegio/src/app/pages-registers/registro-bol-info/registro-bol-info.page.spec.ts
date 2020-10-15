import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroBolInfoPage } from './registro-bol-info.page';

describe('RegistroBolInfoPage', () => {
  let component: RegistroBolInfoPage;
  let fixture: ComponentFixture<RegistroBolInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroBolInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroBolInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
