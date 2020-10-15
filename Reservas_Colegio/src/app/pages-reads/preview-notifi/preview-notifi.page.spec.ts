import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewNotifiPage } from './preview-notifi.page';

describe('PreviewNotifiPage', () => {
  let component: PreviewNotifiPage;
  let fixture: ComponentFixture<PreviewNotifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewNotifiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewNotifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
