import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterNotifiPageRoutingModule } from './register-notifi-routing.module';

import { RegisterNotifiPage } from './register-notifi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterNotifiPageRoutingModule
  ],
  declarations: [RegisterNotifiPage]
})
export class RegisterNotifiPageModule {}
