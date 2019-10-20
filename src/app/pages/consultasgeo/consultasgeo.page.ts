import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { NgForm } from '@angular/forms';
//import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';

@Component({
  selector: 'app-consultasgeo',
  templateUrl: './consultasgeo.page.html',
  styleUrls: ['./consultasgeo.page.scss'],
})
export class ConsultasgeoPage implements OnInit {

  Codigo : String  
  Nome: string;     
  SobreNome:string; 
  Email:string;
  Telefone:string;
  Celular:string;
  SeguimentoValues: any[];
  GruposValues: any[];
  
  segmento: string;
  grupo : string;
  usuario:string;
  
  segs: any[] = [
    { 
      id: 0,
      segmento: 'Todos'      
    }    
  ];


  groupsDef: any[] = [
    { 
      id: 1,
      nome: 'Todos'      
    } 
  ];

  groups: any[] = [
    { 
      id: 1,
      nome: 'Todos'      
    } 
  ];

  users: any[] = [
    { 
      id: 0,
      usuario: 'Todos'      
    }    
  ];

  constructor(     
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService, 
    private Eventos : Events   
  ) {} 

  ngOnInit() {
    this.obterDadosDoUsuarioAtivo()
  }

  public nome:any[];
  obterDadosDoUsuarioAtivo()
  {
    
    let params1=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo;
    

    this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
        } 
        else
         {
        
          this.nome=resultado[0].nome
          console.log("grps: ",this.nome)



        
         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }


    
  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    console.log("ionViewWillEnter");
  } 
  
  
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");    
    this.PopulaSeguimento(0);
  } 
  
  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.    
    console.log("ionViewWillLeave");
  } 

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    console.log("ionViewDidLeave");
  } 
  
  setValueFieldsForm() {   
    this.Codigo = sessionStorage.getItem("SessionCodigoUsuario");  
    this.Nome = "Gilson";    
    this.SobreNome = "DeLima";    

    
    this.Email = "gilson.delima@gmail.com";
    this.Telefone = "61-98204-9030";    
    this.Celular = "61-98204-9030";  
  } 
    
  PopulaSeguimento(item : any) {
    console.log(item);
    console.log(sessionStorage.getItem('SessionCodigoUsuario'));
    console.log(sessionStorage.getItem("SessionHashkey"));
 
   let paramsSeguimentos = {
     'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
     'todos': '',
     'Hashkey': sessionStorage.getItem("SessionHashkey")
   };

this.Authorizer.QueryStoreProc('ConsultaSegmentos','spConsulta', paramsSeguimentos).then( res => {        
     let resultado: any = res;
     try{
       if(resultado.length==0){
         //nenhum modulo encontrado
         this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum segmento encontrado!'} );
       }else{
         //mostro os módulos
         console.log(resultado);
         this.segs = resultado;
         this.GruposValues = resultado;          
         //console.log(JSON.stringify(this.SeguimentoValues));
         
       }
     }catch(err){
       this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum segmento!'} );
     }
   });   
 } 
 PopulaGrupos(form :NgForm, event : Events){ 
    
   this.segmento = '';//event.detail.value;
    
  //  console.log(event.detail.value);
    //this.segs = this.segs.filter((item) => { return item.id == event })[0].segs;
    
    let params = {
      'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
      'segmento': '',//event.detail.value,
      'nivel': '',
      'grupo': '',
      'todos': '',
      'nome': '',
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    this.Authorizer.QueryStoreProc('ConsultaGrupos',"", params).then( res => {        
      let resultado: any = res;
      try{
        if(resultado.length==0){
          //nenhum modulo encontrado
          this.groups =  this.groupsDef;
          this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum grupo encontrado!'} );
        }else{
          //mostro os módulos
          console.log(resultado);
          this.groups = resultado;          
        }
      }catch(err){
        this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'',pMessage:'Nenhum grupo!'} );
      }
    });   
  }
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }
  PopulaUsuarios(form :NgForm, event : Events) {    
    console.log(event);
    this.grupo = (<any>event).detail.value;
      let params = {
     'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
     'segmento': this.segmento,
     'grupo': this.grupo,   
     'nome': '',     
     'matricula': '',
     'cpf': '',      
     'todos': '',    
     'Hashkey': sessionStorage.getItem("SessionHashkey")
   };

   this.Authorizer.QueryStoreProc('ConsultaUsuarios','', params).then( res => {        
     let resultado: any = res;
     try{
       if(resultado.length==0){
         //nenhum modulo encontrado
         this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum usuário encontrado!'} );
       }else{
         //mostro os módulos
         console.log(resultado);
         this.users = resultado;
       }
     }catch(err){
       this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum usuário!'} );
     }
   });   
 }  
 
  PesquisarGeo(form:NgForm, event : Events) {      
    //form.value.senha = Md5.hashStr(form.value.senha);

    this.Authorizer.Login(form).then( res => {        
      //console.log("Resultado Json:", res);
      let resultado: any = res[0];
      if (resultado.success == true) {            
        this.alertService.showLoader(resultado.message);        
      }      
    });
    
  }

  

}
