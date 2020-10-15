import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MateriascursoPage } from './materiascurso.page';

describe('MateriascursoPage', () => {
  let component: MateriascursoPage;
  let fixture: ComponentFixture<MateriascursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriascursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MateriascursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
