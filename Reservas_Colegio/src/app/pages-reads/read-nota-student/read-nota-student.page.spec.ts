import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadNotaStudentPage } from './read-nota-student.page';

describe('ReadNotaStudentPage', () => {
  let component: ReadNotaStudentPage;
  let fixture: ComponentFixture<ReadNotaStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadNotaStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadNotaStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
