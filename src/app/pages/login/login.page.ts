import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from "../../../environments/environment.prod"
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
// for install: https://www.npmjs.com/package/ts-md5
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  @ViewChild('login') ilogin ;
  public CodigoUsuarioSistema : string;
  public NomeUsuarioSistema : String;
  private old_senha: String;

  constructor(
    private platform: Platform
    ,private modalController: ModalController
    ,private navCtrl: NavController
    ,private alertService: AlertService
    ,private env: EnvService    
    ,private Authorizer: AuthService    
    ,private db : Storage
  ) { 
    // LSU -> LAST SESSION USER
    this.db.get('LSU').then((LSU) => {
      let SU = JSON.parse(atob(LSU));
      this.CodigoUsuarioSistema = SU[0].codigo;
      this.NomeUsuarioSistema = SU[0].nome;
      console.log('Olá, ' + SU[0].nome + '! Você foi a última pessoa a entrar no sistema nesse dispositivo.');      
    });

  }
    
  ngOnInit() {    
    
    // Uso a instrução (fetch) para pegar o ip do roteador.
    let ipAPI : any = 'https://api.ipify.org?format=json'
    fetch(ipAPI).then(response=>response.json()).then(data=>sessionStorage.setItem('SessionIP', data.ip)).catch(()=>{}
    )
    // Este método retorna ON/OFF do Serviço onde esta API.
    //this.Authorizer.EngineStatusConection(this.env.API_HOST);  
    
    // Teste de recuperação de dados
    
    // Zero a SessionConection 
    sessionStorage.setItem("SessionConection", "0");      
    sessionStorage.setItem('SessionUser', ''); 
    sessionStorage.setItem('SessionHashkey', '');   
    sessionStorage.setItem('perfil', '');    
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");    
  }
  
  
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
   // console.log("ionViewDidEnter");     
  /* setTimeout(() => {
      this.ilogin.setFocus();
    },150);*/

  }
  
  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.    
    //console.log("ionViewWillLeave");
  }
  
  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //console.log("ionViewDidLeave");
    
  } 
  
  backButtonEvent(){
    this.platform.backButton.subscribe(()=>{
      console.log ('exit');
      navigator['app'].exitApp();
    })
  }
  private encripta(valor: string): string {
    let retorno: string;
    let stexto: string;
    retorno = "";
    try{
      stexto = valor.trim();
    } catch (err) {
      stexto = valor;
    }
    if(stexto==null)
      stexto="";      
    if(stexto=="")
      return stexto;
    while (true)
      {
        let letra:string;
        let nnumero:number;
        let snumero:string;
        if(stexto.length>1)
          letra = stexto.substring(0, 1);
        else
          letra = stexto;
  
        nnumero = letra.toString().charCodeAt(0);
        nnumero += 166;
        snumero = nnumero.toString();
        if(snumero.length<3)
          snumero = "0" + snumero;
        if (snumero.length < 3)
            snumero = "0" + snumero;
          
        retorno += snumero;
        if(stexto.length>1)
          stexto = stexto.substring(1);
        else
          stexto = "";
        if (stexto == "")
          break;
      }
      return retorno;
  }

  AuthLogin(form: NgForm) {        
    //this.alertService.showLoader('Carregando... aguarde!!!');
    //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    //this.alertService.presentToast("Mensagem Toast: Logando...");
    
    //let pwd : any = Md5.hashStr(form.value.password);
console.log(form.value.senha)
    let password = this.encripta(form.value.senha);
    form.value.senha = password;


    
        this.alertService.showLoader("Welcome!", 2000);
        
        
        this.navCtrl.navigateRoot('/menu/options',form.value); 
      //  this.navCtrl.setRoot(MenuPrincipalPage,{data:this.user, data2:0, data3:'Menu Atalho'});
        //this.alertService.presentToast(resultado.message);
                        
  
  }

}