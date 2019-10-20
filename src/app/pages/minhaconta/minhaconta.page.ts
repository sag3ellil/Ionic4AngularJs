import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { NgForm } from '@angular/forms';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhaContaPage implements OnInit {   
  public SrcPhotoAvatar: any = "assets/imgs/perfil.png";
  public DataSet: any;
  
  constructor(        
    private Authorizer: AuthService,
    private env: EnvService,
    private navCtrl: NavController                
  ) { }

  ngOnInit() {   
    this.DataSet = JSON.parse(sessionStorage.SessionUser);  
  }  
  RegisterUpdate(form){
    
  }
  

}
