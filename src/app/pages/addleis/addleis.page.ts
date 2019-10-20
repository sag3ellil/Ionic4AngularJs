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
  selector: 'app-addleis',
  templateUrl: './addleis.page.html',
  styleUrls: ['./addleis.page.scss'],
})
export class AddleisPage implements OnInit {
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
    {this.slideOneForm = formBuilder.group({
      codigo: [],
      digito:[],
      tipo:[],
      Categoria:[],
      Valor:[],
      moeda:['R$'],
      fator:[],
      veiculo:[],
      infrator:[],
      Tipov:[],
      Artigo:[],
      afericao:[],
      descricao:[],
      medidasA:[],
      MBFT:[],
      inativio:[]

    }) }

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
  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }

  goTo() {
    let resultado: any ;
    
    this.alertService.showLoader("Novo leis...");
    this.navCtrl.navigateRoot('/menu/leis');    
  
    }


    public submit:any;
    AddSubmit(form){
      console.log(form)

 if (form.value.inativio=="" || form.value.inativio==undefined)
 form.value.inativio='N'
 if (form.value.inativio==true || form.value.inativio=='true')
 form.value.inativio='S'

         
      this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spInsertLeisIonic","DataJson", form.value).then(res => {
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

            this.alertService.presentAlert({ pTitle: 'SMTT-sl', pSubtitle: 'Success', pMessage: 'Success!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
        }
      });
    }



    goBack() {let resultado: any ;
    
   
      this.navCtrl.navigateRoot('/menu/leis');    
    
      }

}
