import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observacoes',
  templateUrl: './observacoes.page.html',
  styleUrls: ['./observacoes.page.scss'],
})
export class ObservacoesPage implements OnInit {

  constructor( private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService,
    private navCtrl: NavController,
    private router: Router) { }
public perfil:any;
  ngOnInit() {
    this.ConsultaObs()
    this.perfil=JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil
    this.obterDadosDoUsuarioAtivo()
  }

  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }
public nome:any;
  obterDadosDoUsuarioAtivo()
  {
   
    let params1=  JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo;

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
   
        

         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }

  goTo() {
    let resultado: any ;
    
  this.alertService.showLoader("Novo Observacoe...");
  this.navCtrl.navigateRoot('/menu/addobservacoes');    

  }

  delete(id)
  {
    if(this.perfil=="U")
    {
      this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main');  
    }
    else{
      console.log("codigo",id)
      let  params1=id
      document.getElementById(""+id+"").style.display="none"
      this.Authorizer. QueryStoreProcDelete1('delete',"spDeleteObservacoesIonic","id", params1).then(res => {
        let resultado: any = res;
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Success', pMessage: 'usuário excluído com sucesso !' });
      
      });
    }
  
  }



    public ss:any;
  
  ConsultaObs() {
    let params1=null;

    
    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": ""
        };
    
  //  this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spGraphicoDeActividade","DataJson", form.value)
    this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui','spConsultaObservacoesIonic',"DataJson", params2).then(res => {
       let resultado: any = res;
       
       try {
         console.log("resultado:",resultado)
         if (resultado.length == 0) {
           //nenhum modulo encontrado
           this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum usuario encontrado!' });
         } else {
           //mostro os módulos
           console.log(resultado);
           this.ss = resultado;
         }
       } catch (err) {
         this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum usuario!' });
       }
     });
   }
 
}
