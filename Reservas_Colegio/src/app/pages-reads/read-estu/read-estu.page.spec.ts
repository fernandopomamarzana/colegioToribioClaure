import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadEstuPage } from './read-estu.page';

describe('ReadEstuPage', () => {
  let component: ReadEstuPage;
  let fixture: ComponentFixture<ReadEstuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadEstuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadEstuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
