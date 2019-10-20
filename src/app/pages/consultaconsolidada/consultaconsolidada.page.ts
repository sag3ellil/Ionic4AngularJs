import { Component, OnInit } from '@angular/core';

//import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController ,NavParams} from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
//import { NgForm } from '@angular/forms';
//import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AgeValidator } from  'src/app/pages/addusuario/age';
import { ConfSenha } from  'src/app/pages/addusuario/ConSenha';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { UsernameValidator } from  'src/app/pages/addusuario/username';
import { RouterModule, Routes } from '@angular/router';
import { cpfValidator } from  'src/app/pages/addusuario/cpfValidator';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
@Component({
  selector: 'app-consultaconsolidada',
  templateUrl: './consultaconsolidada.page.html',
  styleUrls: ['./consultaconsolidada.page.scss'],
})
export class ConsultaconsolidadaPage implements OnInit {


  public ss:any;
 public codigo:any;
 public    form: NgForm;
  public slideOneForm:FormGroup;
  //public slideOneForm:FormGroup;




  public segmento:any;
 public sa:any;
  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db : Storage) {


    
       
      this.slideOneForm = formBuilder.group({
        segmento: [],
        usuario:[],
        grupo: [],
        data1:[],
        data2:[],
        tipo:[],
        horainicio:[],
        horafim:[]

     
     


     


      })
     }

  ngOnInit() {
  /*  this.ConsultaSeg()
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    console.log("codigo", this.codigo)
    this.obterDadosDoUsuarioAtivo()
  this.obterTipoCC()*/
  }

      ConsultaSeg() 
      {
        console.log("seg value :")
       let params1=null;
    
        this.Authorizer.QueryStoreProc1('ConsultaSeg',"", params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
            } else {
              //mostro os módulos
              console.log("segmentos:", resultado);
              this.ss = resultado;
            }
          } catch (err) {
            this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
          }
        });
      }






      public nome:any[];
      public groups:any;
      public dadosUs:any;

 public valueGetTipo:string;
      getTipo(item){

console.log(" tipod get ", item.details)
this.valueGetTipo=item.detail.value[0];
 for(let i :1;i<item.detail.value.length;i++)
 {
this.valueGetTipo=this.valueGetTipo+","+item.detail.value[i]
 }
console.log("get tipo value", this.valueGetTipo)
      }

public  n:any=this.codigo;
      getNome(items)
      {
        console.log("nome ",items.detail.value)
        this.n=0

      }
















      public tipos:any []= new Array();;

       obterTipoCC()
       {
        let params1="";
     
        this.Authorizer.QueryStoreProc1('ConsultasTipoCC',"", params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum tipo encontrado!' });
            } 
            else
             {
             
              this.tipos = resultado
             
  
                console.log (  " tipos : "  + this.tipos);
     
              
             
      
             }
          }
           catch (err) 
          {
            this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum tipo!' });
          }
        });
      }
       


       obterDadosDoUsuarioAtivo()
       {
        
         let params1=this.codigo;
     
         this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
           let resultado: any = res;
           try {
             if (resultado.length == 0) {
               //nenhum modulo encontrado
               this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
             } 
             else
              {
               //mostro os módulos
               console.log("segmentos:", resultado);
               this.dadosUs = resultado;
               console.log("this dados ",this.dadosUs)
               this.groups=this.dadosUs[0].groupos
               console.log("grps :",this.groups)
               this.nome=[this.dadosUs[0].nome]
                if(this.dadosUs[0].perfil!="U")
                this.nome=[this.dadosUs[0].nome,""]
               console.log("grps: ",this.nome)
              }
           }
            catch (err) 
           {
             this.alertService.presentAlert({ pTitle: 'ValParaiso', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
           }
         });
       }
       public dd1:string;
       getD(item)
{
  console.log("dd1 :",item)
  this.dd1=item
}    

exit()
{
  console.log(" goBack")
  this.navCtrl.navigateRoot('/login');  
}


public dd2:string;
getD2(item)
{
console.log("dd2 :",item)
this.dd2=item
}  

 public submit : any ;


       AddSubmit(form: NgForm) {        
        //this.alertService.showLoader('Carregando... aguarde!!!');
        //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
        //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
        //this.alertService.presentToast("Mensagem Toast: Logando...");
        console.log("form",form.value)
        console.log(this.slideOneForm)
       console.log("validation" ,this.slideOneForm.status)
        if(this.slideOneForm.value.data1==null || this.slideOneForm.value.data2==null )
        {
          console.log("Invalid")
          this.alertService.presentAlert({pTitle:'Smtt-Sl',pSubtitle:'Erro :',pMessage:' Verifique o formulário,você precisa colocar data  !'} );
    
        }
        else
        {
          console.log("n",this.n)
          if (form.value.segmento==undefined)
          this.n=this.codigo
 form.value.usuario=this.n
 console.log("form.value.usuario",form.value.usuario)
         form.value.segmento=this.ss[0].segmento
           form.value.tipo=this.valueGetTipo
           //  form.value.usuario= this.codigo.toString()
             let d1=this.dd1
             let d2=this.dd2
 console.log("date 1 ",d1)
            // let dateString = "22-04-2017"; //whatever date string u have
            let dateObject1 = moment(d1, "YYYY-MM-DD HH:mm:ss").toDate();
            form.value.data1=dateObject1
            let dateObject2 = moment(d2, "YYYY-MM-DD HH:mm:ss").toDate();
            form.value.data2=dateObject2
            if(form.value.grupo=='Suporte Técnico')
               form.value.grupo='Suporte Tecnico'
           if(form.value.grupo=='Agentes de Trânsito') 
               form.value.grupo='Agentes de Transito'

     
          console.log("form",form.value);

           let params2={
            "StatusCRUD":"",
            "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
            "Hashkey":sessionStorage.getItem("SessionHashkey"),
            "FormValue": form.value
            };
            
            this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultasConsultaIonic","DataJson", params2).then(res => {
            let resultado: any = res;
            try {
              if (resultado.length == 0) {
                //nenhum modulo encontrado
                this.alertService.presentAlert({ pTitle: 'Smtt-Sl', pSubtitle: 'Menu', pMessage: 'Favor Verifique a data' });
              } else {
                //mostro os módulos
                console.log("submit:", resultado);
                this.submit = resultado;
                console.log(this.submit);
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Smtt-Sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
            }
          });
        }
      }

















}
