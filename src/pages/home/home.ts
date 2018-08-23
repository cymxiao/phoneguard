import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { timer } from 'rxjs/observable/timer';

import { BackgroundMode } from '@ionic-native/background-mode';
import { LockScreenComponent } from 'ionic-simple-lockscreen';
//import { BatteryStatus } from '@ionic-native/battery-status';
import { NativeAudio } from '@ionic-native/native-audio';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  testDataTitle: string; 
  public proximity: number;

  step1:string ;
  step2:string ;

  timeInit: number = 0;
  openTimes: number = 0;
  lockScreenOpened: boolean;

  isAndroidOff: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private bgMode: BackgroundMode,
   
    private sensors: Sensors,
    private nativeAudio: NativeAudio) { 
    if (!this.bgMode.isEnabled()) {
      this.bgMode.enable();

    }
    this.testDataTitle = '测试 proximity';

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad called'); 
    this.openLockscreen();
    //if(this.platform.is('android')){ 
    this.load_Sensors();
    //}
  }
 


  private load_Sensors() {
    this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY).then( () => {
      //this.sensors.enableSensor("PROXIMITY").then( () => {
      console.log('start Sensor enabled' );
      this.step1 = 'start Sensor enabled';
      setInterval(() => { 
        this.sensors.getState().then((values) => {
          this.step2 = 'start set setInterval';
          console.dir(values[0]);
          if (values && values[0]) {
            this.proximity = values[0];
          }
        });
      }, 5000);
    }).catch( (e) =>{
      console.log('load_Sensors error');
      this.step1 = 'load_Sensors error';
      console.dir(e);
    });
  
     
    // setInterval(() => { 
    //   this.sensors.enableSensor("PROXIMITY").then( (x) => { 
    //     console.dir(x);  
    //   }); 
    //   this.sensors.getState().then((values) => {
    //     console.dir(values[0]);
    //     if (values && values[0]) {
    //       this.proximity = values[0];
    //     }
    //   });
    // }, 1000);
 
  }



  openLockscreen() {
    //avoid open more than one lock screen
    console.log(this.lockScreenOpened);
    if (!this.lockScreenOpened) {
      this.lockScreenOpened = true;
      //this.modalCtrl.create(LockScreenComponent, {
      this.navCtrl.push(LockScreenComponent, {
        code: '1234',
        ACDelbuttons: false,
        passcodeLabel: '请输入 1234 解锁',
        onCorrect: function () {
          if (this.file) {
            console.log('stop file called.');
            this.file.stop();
          }
          console.log('输入正确!');
        },
        onWrong: function (attemptNumber) {
          console.log(attemptNumber + ' 错误密码输入次数(s)');
        }
      });
    }
  }



  // watch change in battery status
  // const subscription = this.batteryStatus.onChange().subscribe(status => {
  //   if(status && !status.isPlugged){
  //     this.playSound();
  //     this.openLockscreen();
  //   }
  //   console.log(status.level, status.isPlugged);
  // });

  //subscription.unsubscribe();

  // this.navCtrl.viewDidLoad.subscribe((vctrl) => {
  //   if (vctrl && vctrl.data && vctrl.data.code && vctrl.data.code==='1234') {
  //     //do something when load lock screen
  //   }  
  // });

  // this.navCtrl.viewDidLeave.subscribe((vctrl) => {
  //   if (vctrl && vctrl.data && vctrl.data.code && vctrl.data.code==='1234') {
  //     //do something when close lock screen
  //   }
  // });


  // playSound() {
  //   // Create a Media instance.  Expects path to file or url as argument
  //   // We can optionally pass a second argument to track the status of the media 
  //   if (this.platform && this.platform._platforms && this.platform._platforms.length > 0 && this.platform._platforms[0] === 'core') {
  //     return;
  //   }

  //   this.nativeAudio.preloadComplex('alert1', 'assets/alarm.mp3',0.8,1,0);
  //   this.nativeAudio.play('alert1', () => console.log('alert1 is done playing'));
  // }

}














