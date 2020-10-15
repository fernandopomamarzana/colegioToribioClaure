import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistromateriaPage } from './registromateria.page';

describe('RegistromateriaPage', () => {
  let component: RegistromateriaPage;
  let fixture: ComponentFixture<RegistromateriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistromateriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistromateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
