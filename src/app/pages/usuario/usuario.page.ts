import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import {  } from 'src/app/app.component';


//mport { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  jsonData: any;
  selector: any;
  timeresult: string;
  id_1: string;
   ss:string;

  constructor(
     
   
    private alertService: AlertService,
    private env: EnvService,    
    private Authorizer: AuthService,
    private navCtrl: NavController,
    private router: Router,

  
        
  ) { 

  }

  public perfil :any;
  public grupo:any;
  
  public codigo:any;
  public prfil:any;
  public g1:any;
  ngOnInit() {
  /*  this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.prfil=JSON.parse(sessionStorage.getItem("SessionUser"))[0].perfil
    this.g1=JSON.parse(sessionStorage.getItem("SessionUser"))[0].grupo
    this.ConsultaUsuario() ;
    this.obterDadosDoUsuarioAtivo()*/
  }


  public nome:any[];
  obterDadosDoUsuarioAtivo()
  {
   /*
    let params1=this.codigo;
    

    this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Smtt-Sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
        } 
        else
         {
        
          this.nome=resultado[0].nome
          console.log("grps: ",this.nome)



        
         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-Sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });*/
  }
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }

  goTo(){
    let resultado: any ;
    /*if(this.prfil=="U")
    {
      this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main'); 
    }
    else{    */
      this.alertService.showLoader("Novo usuario...");
      this.navCtrl.navigateRoot('/menu/addusuario'); 
  //  }   
  }

  Edit(id)
  {


  /*  let resultado: any ;
    if(this.prfil=="U")
    {*/
      this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main');  
 /*   }
    else 
    if(this.prfil=="S")
    {
      this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaUsuarioForPermission","DataJson", id).then(res => {
        let resultado: any = res;
        console.log("resultado",resultado)
        if(resultado[0].perfil=='A' && this.prfil!="A")
        {
          this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main'); 

        }else if(resultado[0].perfil=='S' && resultado[0].grupo!=this.g1){
          this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
          this.navCtrl.navigateRoot('/menu/options/tabs/main'); 
        }else
        
        {
       
      this.alertService.showLoader("Editar usuario...");
      // this.navCtrl.navigateForward("/editusuario/"+id);
   
       let navigationExtras: NavigationExtras = {
         state: {
           id: id
         }
       };
       
        this.router.navigate(['/editusuario/' + id]);
   
        }
        
      
      });}
    else{

    
      this.alertService.showLoader("Editar usuario...");
   // this.navCtrl.navigateForward("/editusuario/"+id);

    let navigationExtras: NavigationExtras = {
      state: {
        id: id
      }
    };
    
     this.router.navigate(['/editusuario/' + id]);

console.log("codigo",id)
    }*/   
 
  }


  delete(id)
  {
    /*if(this.prfil=="U")
    {*/
      this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main');  
    /*}
    else 
    if(this.prfil=="S")
    {
      this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaUsuarioForPermission","DataJson", id).then(res => {
        let resultado: any = res;
        console.log("resultado",resultado)
        if(resultado[0].perfil=='A' && this.prfil!="A")
        {
          this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
      this.navCtrl.navigateRoot('/menu/options/tabs/main'); 

        }else if(resultado[0].perfil=='S' && resultado[0].grupo!=this.g1){
          this.alertService.presentAlert({ pTitle: 'SMTT SL', pSubtitle: 'Attencao', pMessage: ' nenhuma permissão permitida !' });
          this.navCtrl.navigateRoot('/menu/options/tabs/main'); 
        }else
        
        {
          console.log("codigo",id)
        let  params1=id
        document.getElementById(""+id+"").style.display="none"
          this.Authorizer.QueryStoreProcDelete1('deleteUsario','spDeleteUsuario',"id", params1).then(res => {
            let resultado: any = res;
            console.log("resultado",resultado)
            this.alertService.presentAlert({ pTitle: 'Smtt-Sl', pSubtitle: 'Success', pMessage: 'usuário excluído com sucesso !' });
          
          });
        }
        
      
      });
    }
  else
    {
        console.log("codigo",id)
        let  params1=id
        document.getElementById(""+id+"").style.display="none"
          this.Authorizer.QueryStoreProcDelete1('deleteUsario','spDeleteUsuario',"id", params1).then(res => {
            let resultado: any = res;
            console.log("resultado",resultado)
            this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Success', pMessage: 'usuário excluído com sucesso !' });
          
          });
        
    }

*/
 
 
  }
   
  ConsultaUsuario() {
    
   
  /*  
   let params1={
    "StatusCRUD":"",
    "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
    "Hashkey":sessionStorage.getItem("SessionHashkey")
   };

   this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaUsuarioTable","DataJson", params1).then(res => {
      let resultado: any = res;
      
      try {
        console.log("resultado:",resultado)
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum usuario encontrado!' });
        }
        else
        {
          //mostro os módulos
          console.log(resultado);
          this.ss = resultado;
        }
      }
       catch (err) {
        this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum usuario!' });
      }
    });
  */}






}
