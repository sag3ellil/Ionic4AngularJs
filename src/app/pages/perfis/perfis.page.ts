import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.page.html',
  styleUrls: ['./perfis.page.scss'],
})
export class PerfisPage implements OnInit {

  constructor( private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService,
    private navCtrl: NavController,
    private router: Router) 
    { }
public perfil:any;
  ngOnInit() {
    this.ConsultaBairros()
    this.perfil=JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil
    this.obterDadosDoUsuarioAtivo()
  }
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
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
  goTo() {

    if(this.perfil=="U")
    {
      this.alertService.presentAlert({ pTitle: 'SSMT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main');  
    }
     
    
    else{

    let resultado: any ;
    
    this.alertService.showLoader("Novo Perfis...");
    this.navCtrl.navigateRoot('/menu/addperfis');    
  
    }
  }


    public ss:any;
  
  ConsultaBairros() {
    let params1=null;
    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": params1
        };
    

  
 this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaPerfisIonic","DataJson", params2).then(res => {
       let resultado: any = res;
       
       try {
         console.log("resultado:",resultado)
         if (resultado.length == 0) {
           //nenhum modulo encontrado
           this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum usuario encontrado!' });
         } else {
           //mostro os módulos
           console.log(resultado);
           this.ss = resultado;
         }
       } catch (err) {
         this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum usuario!' });
       }
     });
   }



   delete(id)
  {

    if(this.perfil=="U"||this.perfil=="S")
    {
      this.alertService.presentAlert({ pTitle: 'SSMT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main');  
    }
     

    else{

    console.log("codigo",id)
    let  params1=id
    document.getElementById(""+id+"").style.display="none"
    this.Authorizer. QueryStoreProcDelete1('delete',"spDeleteGrupoIonic","id", params1).then(res => {
      let resultado: any = res;
      this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Success', pMessage: 'Bairro excluído com sucesso !' });
    
    });
  }
}
}