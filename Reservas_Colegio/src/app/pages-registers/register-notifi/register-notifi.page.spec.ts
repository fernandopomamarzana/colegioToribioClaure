import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterNotifiPage } from './register-notifi.page';

describe('RegisterNotifiPage', () => {
  let component: RegisterNotifiPage;
  let fixture: ComponentFixture<RegisterNotifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNotifiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterNotifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
