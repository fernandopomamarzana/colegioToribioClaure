import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewNotifiPageRoutingModule } from './preview-notifi-routing.module';

import { PreviewNotifiPage } from './preview-notifi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviewNotifiPageRoutingModule
  ],
  declarations: [PreviewNotifiPage]
})
export class PreviewNotifiPageModule {}
