import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroNotasPage } from './registro-notas.page';

describe('RegistroNotasPage', () => {
  let component: RegistroNotasPage;
  let fixture: ComponentFixture<RegistroNotasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNotasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
