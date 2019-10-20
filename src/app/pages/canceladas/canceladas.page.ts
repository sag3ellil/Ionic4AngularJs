import { Component, OnInit } from '@angular/core';
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
//import { threadId } from 'worker_threads';
//import { AnyARecord } from 'dns';

@Component({
  selector: 'app-canceladas',
  templateUrl: './canceladas.page.html',
  styleUrls: ['./canceladas.page.scss'],
})
export class CanceladasPage implements OnInit {
  public    form: NgForm;
  public slideOneForm:FormGroup;
  
  
  
  constructor(private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private db : Storage,
  )
    
    { 
       
      this.slideOneForm = formBuilder.group({
        segmento: ['',Validators.compose([Validators.required])],
        usuario:['',Validators.compose([Validators.required])],
        grupo: ['',Validators.compose([Validators.required])],
        data1:[],
        data2:[],
        //*tipo:[],
       

     
     


     


      })
    }

  ngOnInit() {
    this.ConsultaSeg()
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    this.obterDadosDoUsuarioAtivo()
  }


  public codigo:any;
  public ss:any;
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



  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }

 public dadosUs:any;
 public groups:any;
 public nome:any;
  obterDadosDoUsuarioAtivo()
  {
   
    let params1=this.codigo;
    

    this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
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
          console.log("grps: ",this.nome)



        
         }
      }
       catch (err) 
      {
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }
public g:any;
  saveGroup(items)
  {
console.log("items   :",items)
 this.g=items
  }
  public u:any=this.codigo;
  saveUsuario(items)
  {
    console.log("items.detail",items.detail.value)
this.u=items.detail.value
console.log("u", this.u)
  }


public s:any;

  saveSegmento(){
    console.log(this.dadosUs)
    this.s=this.dadosUs[0].segmento
    console.log("seg", this.s)
 
  }



public submit :any;

  pesquisar(form){

    console.log("form",form.value)
        console.log(this.slideOneForm)
       console.log("validation" ,this.slideOneForm.status)
        if(this.slideOneForm.value.data1==null || this.slideOneForm.value.data2==null )
        {
          console.log("Invalid")
          this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'Erro :',pMessage:' Verifique o formulário,você precisa colocar data  !'} );
    
        }
        else
        {
   
              form.value.segmento=this.ss[0].segmento
              //   form.value.tipo=this.valueGetTipo
              if(this.u=="")
              form.value.usuario= ""
              else
              form.value.usuario= this.codigo
              form.value.grupo= this.dadosUs[0].groupos
              form.value.segmento=this.s
             
            let d1=form.value.data1
            let d2=form.value.data2

           // let dateString = "22-04-2017"; //whatever date string u have
           let dateObject1 = moment(d1, "YYYY-MM-DD HH:mm:ss").toDate();
           form.value.data1=dateObject1
           let dateObject2 = moment(d2, "YYYY-MM-DD HH:mm:ss").toDate();
           form.value.data2=dateObject2



           let params2={
            "StatusCRUD":"",
            "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
            "Hashkey":sessionStorage.getItem("SessionHashkey"),
            "FormValue": form.value
              };
          console.log("form",form.value);
        //  this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spGraphicoDeActividade","DataJson", form.value)
          this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui','spConsultasInfracoesCanceladasIonic',"DataJson", params2).then(res => {
            let resultado: any = res;
            try {
              if (resultado.length == 0)
               {
                //nenhum modulo encontrado
                this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
              } 
              else 
              {
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
