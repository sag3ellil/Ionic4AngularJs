import { Component, OnInit, ɵConsole } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-messagens',
  templateUrl: './messagens.page.html',
  styleUrls: ['./messagens.page.scss'],
})
export class MessagensPage implements OnInit {
 public codigo :any;
  constructor( private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService,
    private navCtrl: NavController,
    private router: Router) 
    { }
public perfil:any
  ngOnInit() {
    this.ConsultaBairros()
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.perfil=JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil
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
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }

  goTo() {
    let resultado: any ;
    this.alertService.showLoader("Novo Messagen...");
    this.navCtrl.navigateRoot('/menu/addmessagen');    
    }


    public ss:any;
  
  ConsultaBairros() {
    //=this.codigo;
    let params1= this.codigo
    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": params1
        };
    

  
 this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaMensagensIonic","DataJson", params2).then(res => {
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

    if(this.perfil=="U"){

    }else{
      console.log("codigo",id)
      let  params1=id
      document.getElementById(""+id+"").style.display="none"
      this.Authorizer. QueryStoreProcDelete1('delete',"spDeleteMessagemIonic","id", params1).then(res => {
        let resultado: any = res;
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Success', pMessage: 'Messagem excluído com sucesso !' });
      
      });
    }
   
  }



}
