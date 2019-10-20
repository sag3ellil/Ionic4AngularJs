


import { Component, OnInit } from '@angular/core';

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
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { UsernameValidator } from  'src/app/pages/addusuario/username';
import { RouterModule, Routes } from '@angular/router';
import { cpfValidator } from  'src/app/pages/addusuario/cpfValidator';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-rastreio',
  templateUrl: './rastreio.page.html',
  styleUrls: ['./rastreio.page.scss'],
})
export class RastreioPage implements OnInit {

  public    form: NgForm;
  public slideOneForm:FormGroup;


  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db : Storage,
  )
    
    { 
       
      this.slideOneForm = formBuilder.group({
        segmento: ['',Validators.compose([Validators.required])],
        usuario:['',Validators.compose([Validators.required])],
        grupo: ['',Validators.compose([Validators.required])],
        data1:[],
        data2:[],
        device:[]
      
        //*tipo:[],


      })
    }


public codigo:any;
  ngOnInit() {
    this.ConsultaSeg()
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.obterDadosDoUsuarioAtivo()
    this.getImei()
  }
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }

  public ss:any;
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
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }
  
  
  public dadosUs:any;
  public groups:any;
  public nome:any[];
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
           console.log("grps :",this.groups)
       
           this.nome=[this.dadosUs[0].nome]
           if(this.dadosUs[0].perfil!="U")
           this.nome=[this.dadosUs[0].nome,'']
           console.log("grps: ",this.nome)
 
 
 
         
          }
       }
        catch (err) 
       {
         this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
       }
     });
   }



   public g:any;
   saveGroup(items)
   {
 console.log("items   :",items)
  this.g=items
   }
   public u:any;
   saveUsuario()
   {
 this.u=this.codigo
 console.log("u", this.u)
   }
 
 
 public s:any;
 
   saveSegmento(){
     console.log(this.dadosUs)
     this.s=this.dadosUs[0].segmento
     console.log("seg", this.s)
   
   }
 public dd1:any;
   getD(item){
     console.log(item)
this.dd1=item
   }


   public dd2:any;
   getD2(item){
     console.log(item)
this.dd2=item
   }

   public submit :any;
 



   
   public L:Map;
   public lat:any=-15.7801 ;
   public lng:any=-47.9292 ;
  
   polygon :any
    public map:Map;
    public circle:any;
  
  
  public iemi:any;
  getImei()
  {

    
    this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaIEMIRastreioIonic","DataJson", this.codigo).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao encontrado!' });
        } else {
          //mostro os módulos
          console.log("submit:", resultado);
          this.iemi = resultado;
          console.log("this iemi",this.iemi);
          
        
        
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao!' });
      }
    });
  }
  public submite:any;
  pesquisar(form)
   {

  //  console.log("mmmmm",e)
    console.log("mmmmm",form.value)
    document.getElementById('table').style.display='none';
     
    document.getElementById('mapid').style.display='block';

 






      form.value.segmento=this.ss[0].segmento
      //   form.value.tipo=this.valueGetTipo
     /* if(this.u==undefined)
      form.value.usuario= ""
      else*/
      if (form.value.usuario=="")
      form.value.usuario= 0
      else
      form.value.usuario= this.codigo

      
      form.value.grupo= this.dadosUs[0].codigo
      form.value.segmento=this.s
     
    let d1=this.dd1
    let d2=this.dd2

    console.log(d1)
    console.log(d2)

   // let dateString = "22-04-2017"; //whatever date string u have
    let dateObject1 = moment(d1, "YYYY-MM-DD HH:mm:ss").toDate();
    form.value.data1=dateObject1
    let dateObject2 = moment(d2, "YYYY-MM-DD HH:mm:ss").toDate();
    form.value.data2=dateObject2


    form.value.opcao= 3
    //console.log("form.value.opcao",form.value.opcao)


    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": form.value
        };
    

  console.log("form",form.value);
 this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaRastreioIonic","DataJson", params2).then(res => {
    let resultado: any = res;
    try {
      if (resultado.length == 0) {
        //nenhum modulo encontrado
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao encontrado!' });
      } else {
        //mostro os módulos
        console.log("submit:", resultado);
        this.submite = resultado;
        console.log(this.submite);
        
        this.map = new Map('mapid').setView([this.submite[0].latitude, this.submite[0].longitude], 10);
        tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'edupala.com © ionic LeafLet',
        }).addTo(this.map);
    
        for(var i=0;i<this.submite.length;i++)
        {



        marker([this.submite[i].latitude, this.submite[i].longitude]).addTo(this.map)
      //  marker([this.submite.longitude, this.submite.longitude]).addTo(this.map)
         // .bindPopup('Ionic 4 <br> Leaflet.')
         //.openPopup();
      }
      }
    } catch (err) {
      this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao!' });
    }
  });






    /*
    setTimeout(() => {
      this.L = new Map('mapid').setView([this.lat, this.lng], 8);
     
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         // tslint:disable-next-line
        attribution: 'Map data &copy; <a   href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a   href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18
      }).addTo(this.L);
      marker([this.lat, this.lng]).addTo(this.L);
     /* this.polygon  = this.L.polygon([
        [this.lng, this.lat]
        
      ]).addTo(this.L);
      var popup = this.L.popup()
      .setLatLng([this.lng, this.lat])
      .setContent("I am a standalone popup.")
      .openOn(this.L);
    }, 50);*/
    
    
    setTimeout(function(){
      //do what you need here
    }, 2000);
    
    
    
    /*var circle = this.L.circle([this.lng, this.lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.L);*/
    
    
    
    
    
    
      
    
   //   marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
     // this.polygon.bindPopup("I am a polygon.");
   }   

   




  /* pesquisar(form){
  
     document.getElementById('table').style.display='block';
     
     document.getElementById('mapid').style.display='none';
     console.log("form",form.value)
         console.log(this.slideOneForm)
        console.log("validation" ,this.slideOneForm.status)
         if(this.slideOneForm.value.data1==null || this.slideOneForm.value.data2==null )
         {
           console.log("Invalid")
           this.alertService.presentAlert({pTitle:'ValParaiso',pSubtitle:'Erreur :',pMessage:' Verifique o formulário,você precisa colocar data  !'} );
     
         }
         else
         {
    
               form.value.segmento=this.ss[0].segmento
               //   form.value.tipo=this.valueGetTipo
              // if(this.u==undefined)
              // form.value.usuario= ""
             //  else
               form.value.usuario= this.codigo
               form.value.grupo= ''
               form.value.segmento=this.s
              
             let d1=this.dd1
             let d2=this.dd2
    
             console.log(d1)
             console.log(d2)
 
            // let dateString = "22-04-2017"; //whatever date string u have
             let dateObject1 = moment(d1, "YYYY-MM-DD HH:mm:ss").toDate();
             form.value.data1=dateObject1
             let dateObject2 = moment(d2, "YYYY-MM-DD HH:mm:ss").toDate();
             form.value.data2=dateObject2
 

             form.value.opcao= 1
             //console.log("form.value.opcao",form.value.opcao)
 
 
      
           console.log("form",form.value);
           this.Authorizer.QueryStoreProcNgForm('consultaInfracao3',"DataJson", form.value).then(res => {
             let resultado: any = res;
             try {
               if (resultado.length == 0) {
                 //nenhum modulo encontrado
                 this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao encontrado!' });
               } else {
                 //mostro os módulos
                 console.log("submit:", resultado);
                 this.submit = resultado;
                 console.log(this.submit);
               }
             } catch (err) {
               this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Infracao!' });
             }
           });
         }
 
   }
 


*/
}
