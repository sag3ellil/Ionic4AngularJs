import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Chart } from "chart.js";
@Component({
  selector: 'app-graphicoinfracao',
  templateUrl: './graphicoinfracao.page.html',
  styleUrls: ['./graphicoinfracao.page.scss'],
})
export class GraphicoinfracaoPage implements OnInit {
  @ViewChild('barChart') barChart;
  public ss:any;
  public codigo:any;
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
    private db : Storage) {


    
       
      this.slideOneForm = formBuilder.group({
       
        data1:[],
        data2:[],
       // tipo:[],
 
      })
     }

  ngOnInit() {
   
    this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
    console.log("codigo", this.codigo)
   // this.obterDadosDoUsuarioAtivo()
  //this.obterTipoCC()
  //this.createBarChart()

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
// public barChart: Chart;
public barCanvas :Chart;
bars: any;
public t1:any=0;
public  grop1:any=["Support Technico"];
public  grop2:any=["Agentes"];




public  a :any=0;
     
public t2:any=0;


public m1:any=0;
public m2:any=0;
public m11:any=0;
public m22:any=0;
public m3:any=0;


public to:any=0;
public tt1:any=0;
public tt2:any=0;
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
     this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'erro :',pMessage:' Verifique o formulário,você precisa colocar data  !'} );

   }
   else
   {

    //form.value.segmento=this.ss[0].segmento
      //form.value.tipo=this.valueGetTipo
        form.value.usuario= this.codigo.toString()
        let d1=this.dd1
        let d2=this.dd2
console.log("date 1 ",d1)
       // let dateString = "22-04-2017"; //whatever date string u have
       let dateObject1 = moment(d1, "YYYY-MM-DD HH:mm:ss").toDate();
       form.value.data1=dateObject1
       let dateObject2 = moment(d2, "YYYY-MM-DD HH:mm:ss").toDate();
       form.value.data2=dateObject2


     console.log("form",form.value);
     let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo,
      "Hashkey":sessionStorage.getItem("SessionHashkey"),
      "FormValue": form.value
        };
     this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spConsultaInfracoesEstadisticaIonic","DataJson", params2).then(res => {
       let resultado: any = res;
       try {
         if (resultado.length == 0) {
           //nenhum modulo encontrado
           this.alertService.presentAlert({ pTitle: 'SMTT-SL', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
         } else {
           //mostro os módulos
           console.log("submit:", resultado);
           this.submit = resultado;
           console.log(this.submit);
      
      for(var i=0;i<this.submit.length;i++)
      {
           this.a=this.a+this.submit[i].total
           console.log(this.submit[i].grupo)
          if(this.submit[i].grupo==1)
              {
              this.m1=this.m1+(this.submit[i].valor_infracao)

              this.t1= this.t1+(this.submit[i].total)
              }
          if(this.submit[i].grupo==2)
              {
                this.m2=this.m2+(this.submit[i].valor_infracao)

                this.t2= this.t2+(this.submit[i].total)
              }
      }

this.tt1=[this.t1]

this.tt2=[this.t2]

this.to=[this.a]

this.m11=[this.m1]
this.m22=[this.m2]
this.m3= [this.m1+this.m2]

console.log(this.t1,'',this.t2,'',this.m1,'',this.m2)
document.getElementById("tb").style.display="block";

let v1=0
v1=(this.t1/(this.a))*100

let v2=0
v2=(this.t2/(this.a))*100

           /**** */
          
           this.bars = new Chart(this.barChart.nativeElement, {
            type: 'pie',
            data: {
            
              labels: ['Support Technique','Agentes'],
              datasets: [{
                label: 'Viewers in millions',
                data: [v1, v2],
                backgroundColor: ['rgb(38, 194, 129)', 'rgb(100, 100, 129)'], // array should have same number of elements as number of dataset
                borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });


           /***** */
         }
       } catch (err) {
         this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
       }
     });
   }
 }

}
