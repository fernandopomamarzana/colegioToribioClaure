import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ChatComponent } from './componentes/chat/chat.component';
import { ChatCursoComponent } from './componentes/chat-curso/chat-curso.component';
import { EmogisComponent } from './componentes/emogis/emogis.component';

import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
@NgModule({
  declarations: [AppComponent,ChatComponent,ChatCursoComponent,EmogisComponent],
  entryComponents: [ChatComponent,ChatCursoComponent,EmogisComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxIonicImageViewerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    File,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
