import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController ,NavParams} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
//import { NgForm } from '@angular/forms';
//import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AgeValidator } from  'src/app/pages/addusuario/age';
import { ConfSenha } from  'src/app/pages/addusuario/ConSenha';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from  'src/app/pages/addusuario/username';
import { RouterModule, Routes } from '@angular/router';
import { cpfValidator } from  'src/app/pages/addusuario/cpfValidator';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

import { IonicStorageModule } from '@ionic/storage';
import { MapOperator } from 'rxjs/internal/operators/map';
@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
})
export class LocalizacaoPage implements OnInit {



    public    form: NgForm;
    public slideOneForm:FormGroup;
    public Segmento:any;

 public  codigo: any ;
  
 
 
 constructor( private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db : Storage) 
    { 

      this.slideOneForm = formBuilder.group({
        
          Segmento:[],
          group:[],
          nome:[]
         



       
    });
    }
    exit()
    {
      console.log(" goBack")
      this.navCtrl.navigateRoot('/login');  
    }
    public prfil:any;
  ngOnInit() {
   /* this.ConsultaSeg()
    this.prfil=JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.obterDadosDoUsuarioAtivo()*/
    

  }
  


   public L:Map;
   public lat:any=-15.7801 ;
   public lng:any=-47.9292 ;
  
   polygon :any
    
    public circle:any;

 
 
 
 
 
 
    entrar(form: NgForm) {    
      
      
/********** */
console.log("seg value :")
console.log("get l lat",'')
let params1;
console.log(form)
console.log("form value usu",'')


/*
if(form.value.nome!=""||form.value.nome!=null||form.value.nome!='null'||form.value.nome!=undefined)
   params1=this.codigo;
   else 
   params1=0
   
console.log("params",params1)
console.log(form.value.form)

let params2={
"StatusCRUD":"",
"CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
"Hashkey":sessionStorage.getItem("SessionHashkey"),
"FormValue": params1
};

this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spGetLongLat","DataJson", params2).then(res => {
  let resultado: any = res;
  console.log("res",res)
  try {
    if (resultado.length == 0) {
      //nenhum modulo encontrado
      this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum longitude and latitude encontrado!' });
    } else {
      //mostro os módulos
      console.log("segmentos:", resultado);
      this.longLat = resultado;
      */
      console.log("res long :" , '')
      this.lng=-47.92972
      this.lat=-15.77972
   


      setTimeout(() => {
        this.L = new Map('mapid').setView([this.lat, this.lng], 8);
       
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           // tslint:disable-next-line
          attribution: 'Map data &copy; <a   href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a   href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   © <a href="https://www.mapbox.com/">Mapbox</a>',
              maxZoom: 18
        }).addTo(this.L);
        
       /* this.polygon  = this.L.polygon([
          [this.lng, this.lat]
          
        ]).addTo(this.L)*/
        //var popup = this.L.popup()
     
          marker([this.lat, this.lng]).addTo(this.L)
      
      
       
        
     
});

/************ */

   //   this.getLongLat(form)




/*var circle = this.L.circle([this.lng, this.lat], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(this.L);*/






  

 /* marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  this.polygon.bindPopup("I am a polygon.");*/
      }   

     
 public numero :any;
      
public ss: any ;

      ConsultaSeg() 
      {
        console.log("seg value :")
        let params1=null;
    
        this.Authorizer.QueryStoreProc1('ConsultaSeg',"", params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
            } else {
              //mostro os módulos
              console.log("segmentos:", resultado);
              this.ss = resultado;
            }
          } catch (err) 
          {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
          }
        });
      }
/*
    
      public nome:any[];
     public groups:any;
     public dadosUs:any;
      obterDadosDoUsuarioAtivo()
      {
       
        let params1=this.codigo;
    
        this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
            } 
            else
             {
              //mostro os módulos
              console.log("segmentos:", resultado);
              this.dadosUs = resultado;
              console.log("this dados ",this.dadosUs)
            this.groups=this.dadosUs[0].groupos
           
            console.log("grps: ",this.groups)
            console.log("perfil",this.prfil)
           
            this.nome=[this.dadosUs[0].nome]
            if(this.prfil!="U")
            
            this.nome=[this.dadosUs[0].nome,'']
            console.log(this.nome)
            

             }
          }
           catch (err) 
          {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
          }
        });
      }

  

      getUsuario(items)
      {
        console.log(items)
        if(items.detail.value==""||items.detail.value==undefined)
        this.codigo=0

        console.log("codigo",this.codigo)
      }

      longLat:any;

      getLongLat(form) 
      {
        console.log("seg value :")
        console.log("get l lat",this.codigo)
        let params1;
        console.log(form)
        console.log("form value usu",form.value.nome)
        if(form.value.nome!=""||form.value.nome!="")
           params1=this.codigo;
           else 
           params1=0
    console.log("params",params1)
console.log(form.value.form)

    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": params1
     };
  
     this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spGetLongLat","DataJson", params2).then(res => {
          let resultado: any = res;
          console.log("res",res)
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum longitude and latitude encontrado!' });
            } else {
              //mostro os módulos
              console.log("segmentos:", resultado);
              this.longLat = resultado;
              console.log("res long :" , this.longLat)
              this.lng=this.longLat[0].longitude
              this.lat=this.longLat[0].latitude
              this.numero= this.longLat.length;
            }
          } catch (err) 
          {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum longitude and latitude!' });
          }
        });
      }







*/

}
