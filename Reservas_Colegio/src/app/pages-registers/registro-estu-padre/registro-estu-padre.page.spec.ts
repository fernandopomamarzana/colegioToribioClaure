import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroEstuPadrePage } from './registro-estu-padre.page';

describe('RegistroEstuPadrePage', () => {
  let component: RegistroEstuPadrePage;
  let fixture: ComponentFixture<RegistroEstuPadrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEstuPadrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEstuPadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
