import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bairros',
  templateUrl: './bairros.page.html',
  styleUrls: ['./bairros.page.scss'],
})
export class BairrosPage implements OnInit {

  constructor( private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService,
    private navCtrl: NavController,
    private router: Router) 
    { }

  ngOnInit() {
    this.ConsultaBairros()
    this.obterDadosDoUsuarioAtivo()
  }

  goTo() {
    let resultado: any ;
    
    this.alertService.showLoader("Novo Bairros...");
    this.navCtrl.navigateRoot('/menu/addbairros');    
 
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
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
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

    public ss:any;
  
  ConsultaBairros() {
    let params1=null;
    this.Authorizer.QueryStoreProcNoParams('ConsultaTbNoParams', "spConsultaBairrosIonic").then(res => {
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
    console.log("codigo",id)
    let  params1=id
    document.getElementById(""+id+"").style.display="none"
    this.Authorizer. QueryStoreProcDelete1('delete',"spDeleteBairrosIonic","id", params1).then(res => {
      let resultado: any = res;
      this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Success', pMessage: 'Bairro excluído com sucesso !' });
    
    });
  }
}
