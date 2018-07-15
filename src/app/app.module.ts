import { BrowserModule } from '@angular/platform-browser';

import { HomePageModule } from '../pages/home/home.module';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Gyroscope  } from '@ionic-native/gyroscope';
import { BatteryStatus } from '@ionic-native/battery-status';
import { NativeAudio } from '@ionic-native/native-audio';
import { Sensors } from '@ionic-native/sensors';

import { LockScreenComponent,LockScreenModule } from  'ionic-simple-lockscreen';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';


@NgModule({
  declarations: [
    MyApp,
    //HomePage 
  ],
  imports: [
    BrowserModule,
    LockScreenModule,
    HomePageModule,
    //Gyroscope,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LockScreenComponent, 
    //HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    BatteryStatus,
    NativeAudio,
    Gyroscope,//deviceGyroscope,
    Sensors,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
