import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { timer } from 'rxjs/observable/timer';

import { BackgroundMode } from '@ionic-native/background-mode';
import { LockScreenComponent } from 'ionic-simple-lockscreen';
import { BatteryStatus } from '@ionic-native/battery-status';
import { NativeAudio } from '@ionic-native/native-audio';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  x: any;
  y: any;
  z: any;
  testDataTitle: string;

  public proximity: number;


  timeInit: number = 0;
  openTimes: number = 0;
  lockScreenOpened: boolean;

  isAndroidOff: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private bgMode: BackgroundMode,
    private batteryStatus: BatteryStatus,
    public gyroscope: Gyroscope,
    private sensors: Sensors,
    private nativeAudio: NativeAudio) {
    //console.dir(this.platform);
    if (!this.bgMode.isEnabled()) {
      this.bgMode.enable();

    }
    this.testDataTitle = '测试gyroscope';

  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad called');
    this.load_Gyroscope();
    if(this.platform.is('android')){
      this.load_Sensors();
    }
  }

  private load_Gyroscope() {
    let options: GyroscopeOptions = {
      frequency: 1000
    };

    if (this.gyroscope) {
      this.platform.ready().then(() => {
        this.gyroscope.getCurrent(options)
          .then((orientation: GyroscopeOrientation) => {
            this.x = orientation.x;
            this.y = orientation.y;
            this.z = orientation.z;
            console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
          })
          .catch((ex) => {
            console.dir(ex);
          });
      });
    } else {
      this.x = 'no gyroscope';
    }
  }


  private load_Sensors() {
    // //this.sensors.enableSensor(TYPE_SENSOR.PROXIMITY).then( () => {
    //   this.sensors.enableSensor("PROXIMITY").then( () => {
    //   console.log('start Sensor enabled' );
    //   setInterval(() => { 
    //     this.sensors.getState().then((values) => {
    //       console.dir(values[0]);
    //       if (values && values[0]) {
    //         this.proximity = values[0];
    //       }
    //     });
    //   }, 1000);
    // }).catch( (e) =>{
    //   console.log('load_Sensors error');
    //   console.dir(e);
    // });
    //this.sensors.enableSensor("PROXIMITY");
     
    setInterval(() => { 
      this.sensors.enableSensor("PROXIMITY").then( (x) => { 
        console.dir(x);  
      }); 
      this.sensors.getState().then((values) => {
        console.dir(values[0]);
        if (values && values[0]) {
          this.proximity = values[0];
        }
      });
    }, 1000);
 
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














