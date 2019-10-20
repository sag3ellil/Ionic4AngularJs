import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
@Component({
  selector: 'app-ocorrenciacivil',
  templateUrl: './ocorrenciacivil.page.html',
  styleUrls: ['./ocorrenciacivil.page.scss'],
})
export class OcorrenciacivilPage implements OnInit {

  private SrcPhotoAvatar: any = "assets/imgs/perfil.png";
  Codigo : String  
  Nome: string;     
  SobreNome:string; 
  Email:string;
  Telefone:string;
  Celular:string;
  segs: any[] = [
    { 
      id: 1,
      segmento: 'Bombeiros'
      
    },
    {
      id: 2,
      segmento: 'Policia Militar'
    }    
  ];
  GruposValues: any;


  constructor(     
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService
  ) {} 
    
  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    console.log("ionViewWillEnter");
  } 
  
  
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
    //this.setValueFieldsForm();
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

  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
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

   this.Authorizer.QueryStoreProc('ConsultaMunicipios','', paramsSeguimentos).then( res => {        
     let resultado: any = res;
     console.log("resultado")
     console.log(resultado)
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
  PopulaGrupos( event : Events){ 
    
    console.log((<any>event).detail.value);
    //this.segs = this.segs.filter((item) => { return item.id == event })[0].segs;
    
    let paramsGrupo = {
      'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
      'segmento': '',
      'nivel': '',
      'grupo': (<any>event).detail.value,
      'todos': '',
      'nome': '',
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    this.Authorizer.QueryStoreProc('ConsultaGrupos','', paramsGrupo).then( res => {        
      let resultado: any = res;
      try{
        if(resultado.length==0){
          //nenhum modulo encontrado
          this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum segmento encontrado!'} );
        }else{
          //mostro os módulos
          console.log(resultado);
         //this.segs = resultado;
          //this.SeguimentoValues = resultado;          
          //console.log(JSON.stringify(this.SeguimentoValues));
          
        }
      }catch(err){
        this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Menu',pMessage:'Nenhum segmento!'} );
      }
    });   
  }
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

  pesquisar(form: NgForm) {        

    //this.alertService.showLoader('Carregando... aguarde!!!');
    //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    //this.alertService.presentToast("Mensagem Toast: Logando...");
    //let pwd : any = Md5.hashStr(form.value.password);
    
    this.Authorizer.Login(form).then( res => {        
      //console.log("Resultado Json:", res);
      let resultado: any = res[0];
      if (resultado.success == true) {    
        //this.env.UserSession.codigo = resultado.codigo;    
        //this.env.UserSession.nome = resultado.nome;    
        //this.env.UserSession.perfil = resultado.perfil;    

        this.alertService.showLoader(resultado.message);
        this.navCtrl.navigateRoot('/menu/options');                 
      }      
    });
  }
   
 
  UsuarioUpdate(form: NgForm) {      
    //form.value.senha = Md5.hashStr(form.value.senha);

    this.Authorizer.Login(form).then( res => {        
      //console.log("Resultado Json:", res);
      let resultado: any = res[0];
      if (resultado.success == true) {    
        //this.env.UserSession.codigo = resultado.codigo;    
        //this.env.UserSession.nome = resultado.nome;    
        //this.env.UserSession.perfil = resultado.perfil;    

        this.alertService.showLoader(resultado.message);
        this.navCtrl.navigateRoot('/menu/options');                 
      }      
    });
    
  }


}
