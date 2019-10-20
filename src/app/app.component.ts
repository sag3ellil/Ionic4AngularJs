import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Time } from '@angular/common';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  

  public _APP = {
    "VersionEngineAPI": "1.1.5",
    "Version": "1.0.0",
  
    
  };
  public get APP() {
    return this._APP;
  }
  public set APP(value) {
    this._APP = value;
  }
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar    
  ) {
    this.initializeApp();
    //this.showLoader();
  }    

  
  
  initializeApp() {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();           
    });

  }
  
  async delay(ms: number) 
  {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>{
      return console.log("fired");
    });
  }

  sleep = function(time : number) 
  {
    return new Promise((resolve)=>setTimeout(resolve, time));
  }

}