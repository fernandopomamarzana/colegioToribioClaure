import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmogisComponent } from './emogis.component';

describe('EmogisComponent', () => {
  let component: EmogisComponent;
  let fixture: ComponentFixture<EmogisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmogisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmogisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
