import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
//import { NgForm } from '@angular/forms';
//import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AgeValidator } from  'src/app/pages/addusuario/age';
import { ConfSenha } from  'src/app/pages/addusuario/ConSenha';
import { ReactiveFormsModule, FormsModule,FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-addperfis',
  templateUrl: './addperfis.page.html',
  styleUrls: ['./addperfis.page.scss'],
})
export class AddperfisPage implements OnInit {

  public    form: NgForm;
  public slideOneForm:FormGroup;
  public submitAttempt;
  public signupSlider;

  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder) 
    { 

      this.slideOneForm = formBuilder.group({
        perfis: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9,.+]*'), Validators.required])]
      })

    }
    exit()
    {
      console.log(" goBack")
      this.navCtrl.navigateRoot('/login');  
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
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
        } 
        else
         {
        
          this.nome=resultado[0].nome
          console.log("grps: ",this.nome)



        
         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
      }
    });
  }
  goBack() {let resultado: any ;
    
   
    this.navCtrl.navigateRoot('/menu/perfis');    
  
    }

  public submit:any;

  AddSubmit(form: NgForm) {        
    //this.alertService.showLoader('Carregando... aguarde!!!');
    //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    //this.alertService.presentToast("Mensagem Toast: Logando...");
   
   
    console.log("form",form.value)
   console.log("validation" ,this.slideOneForm.status)
   
     if(form.value.obs==null)
     {
      console.log("obs",form.value.obs)
     
this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Erreur',pMessage:'a senha e a senha de confirmação não são as'} );
     }else{
    
      console.log("form",form.value);
    
      this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spManutencaoPerfisIonic","DataJson", form.value).then(res => {
        let resultado: any = res;
        try {
          if (resultado.length == 0) {
            //nenhum modulo encontrado
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
            } else {
              //mostro os módulos
              console.log("submit:", resultado);
              this.submit = resultado;
              console.log(this.submit);
            }
        } 
        catch (err) 
        {
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
        }
      });
    }
  }
}
