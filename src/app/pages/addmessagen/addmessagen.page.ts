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
import { from } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-addmessagen',
  templateUrl: './addmessagen.page.html',
  styleUrls: ['./addmessagen.page.scss'],
})
export class AddmessagenPage implements OnInit {

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
        segmento: [],
        grupo: [],
        usuario: [],
        mensagem:[],
        tipo:[]
      })

    }
    exit()
    {
      console.log(" goBack")
      this.navCtrl.navigateRoot('/login');  
    }
public codigo:any;
  ngOnInit() {
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.obterDadosDoUsuarioAtivo()
  }

 public dadosUs:any;
 public nome:any;
 public groups:any;
 public seg:any;
 public g:any;
  obterDadosDoUsuarioAtivo()
  {
   
    let params1=this.codigo;

    this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
        } 
        else
         {
          //mostro os módulos
          console.log("segmentos:", resultado);
          this.dadosUs = resultado;
          console.log("this dados ",this.dadosUs)
          this.groups=this.dadosUs[0].groupos
          console.log("grps :",this.groups)
          this.nome=this.dadosUs[0].nome
          console.log("nome: ",this.nome)
          this.seg=this.dadosUs[0].segmento
          this.g=this.dadosUs[0].grupo
         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
      }
    });
  }


  goBack() {let resultado: any ;
    
   
    this.navCtrl.navigateRoot('/menu/bairros');    
  
    }

  public submit:any;

  AddSubmit(form: NgForm) {        
    //this.alertService.showLoader('Carregando... aguarde!!!');
    //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    //this.alertService.presentToast("Mensagem Toast: Logando...");
   
   
    console.log("form",form.value)
   console.log("validation" ,this.slideOneForm.status)
   form.value.codigo=this.codigo
   form.value.grup=this.g
   let d=moment().format();
   form.value.date =d
   console.log("form",form.value)
     if(form.value.mensagem==null||form.value.mensagem=="")
     {
      
     
this.alertService.presentAlert({pTitle:'STTM-SL',pSubtitle:'Erreur',pMessage:'por favor coloque mensagem'} );
     }else{
    
      console.log("form",form.value);
    
      this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"","DataJson", form.value).then(res => {
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
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
        }
      });
    }
  }
}
