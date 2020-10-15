import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadNotaProfesorPage } from './read-nota-profesor.page';

describe('ReadNotaProfesorPage', () => {
  let component: ReadNotaProfesorPage;
  let fixture: ComponentFixture<ReadNotaProfesorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadNotaProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadNotaProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
