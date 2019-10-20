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
  selector: 'app-graphicodeactividades',
  templateUrl: './graphicodeactividades.page.html',
  styleUrls: ['./graphicodeactividades.page.scss'],
})
export class GraphicodeactividadesPage implements OnInit {
  @ViewChild('barChart') barChart;
  public ss:any;
  public codigo:any;
  public    form: NgForm;
   public slideOneForm:FormGroup;
   //public slideOneForm:FormGroup;
 
   exit()
   {
     console.log(" goBack")
     this.navCtrl.navigateRoot('/login');  
   }
 
 
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
         usuario:['',Validators.compose([Validators.required])],
         grupo: [],
         data1:[],
         data2:[],
        // tipo:[],
         horainicio:[],
         horafim:[]
 
      
      
 
 
      
 
 
       })
      }
 
   ngOnInit() {
    /* this.ConsultaSeg()
     this.codigo=JSON.parse(sessionStorage.getItem("SessionUser"))[0].codigo
     console.log("codigo", this.codigo)
     this.obterDadosDoUsuarioAtivo()
   this.obterTipoCC()*/
  // this.createBarChart()
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
               this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
             } else {
               //mostro os módulos
               console.log("segmentos:", resultado);
               this.ss = resultado;
             }
           } catch (err) {
             this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
           }
         });
       }
 

       public nome:any[];
       public groups:any;
       public dadosUs:any;

       public tipos:any []= new Array();;
 
        obterTipoCC()
        {
         let params1="";
      
         this.Authorizer.QueryStoreProc1('ConsultasTipoCC',"", params1).then(res => {
           let resultado: any = res;
           try {
             if (resultado.length == 0) {
               //nenhum modulo encontrado
               this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum tipo encontrado!' });
             } 
             else
              {
              
               this.tipos = resultado
              
   
                 console.log (  " tipos : "  + this.tipos);
      
               
              
       
              }
           }
            catch (err) 
           {
             this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum tipo!' });
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
                this.nome=[this.dadosUs[0].nome]
                if(this.dadosUs[0].perfil!="U")
                this.nome=[this.dadosUs[0].nome,""]
                console.log("nome: ",this.nome)
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
 
 
 
 
 public dd2:string;
 getD2(item)
 {
 console.log("dd2 :",item)
 this.dd2=item
 }  
 
  public submit : any ;
 // public barChart: Chart;
  public barCanvas :Chart;
 
        AddSubmit(form: NgForm) {        
         //this.alertService.showLoader('Carregando... aguarde!!!');
         //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
         //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
         //this.alertService.presentToast("Mensagem Toast: Logando...");
       /*  console.log("form",form.value)
         console.log(this.slideOneForm)
        console.log("validation" ,this.slideOneForm.status)
         if(this.slideOneForm.value.data1==null || this.slideOneForm.value.data2==null )
         {
           console.log("Invalid")
           this.alertService.presentAlert({pTitle:'Smtt-Sl',pSubtitle:'Erro :',pMessage:' Verifique o formulário,você precisa colocar data  !'} );
     
         }
         else
         {
 
          form.value.segmento=this.ss[0].segmento
            //form.value.tipo=this.valueGetTipo
          if(form.value.usuario=="TERESIO DOS SANTOS FERNANDES")
          form.value.usuario=this.codigo
             
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


     
          console.log("form",form.value);
         
           this.Authorizer.QueryStoreProcNgFormExec('executeBouraoui',"spGraphicoDeActividade","DataJson", params2).then(res => {
             let resultado: any = res;
             try {
               console.log("length",resultado.length)
               if (resultado.length == 0) {
                 //nenhum modulo encontrado
                 this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados encontrado!' });
               } else {
                 //mostro os módulos
                 console.log("submit:", resultado);
                 this.submit = resultado;
                 console.log(this.submit);


*/

               let  a :any=100;
               let t1:any=20;
               let t2:any=30;
               let t3:any=10;
               let t4:any=5;
               let t5:any=35;



 //t1=(this.submit[0].total/a)*100
 
 
let ti2:any;
let ti3:any;
let ti4:any;
let ti5:any;
 

 console.log("tttttttttttttttt",t1,'',t2,'',t3,'',t4,'',t5)

                 /**** */

              
              
                
                  let bars = new Chart(this.barChart.nativeElement, {
                  type: 'pie',
                  data: {
                  
                    labels: ["ss","ww","qq","eee","rrr"],
                    datasets: [{
                      label: 'Viewers in millions',
                      data: [t1, t2, t3, t4],
                      backgroundColor: ['rgb(38, 194, 129)', 'rgb(100, 100, 129)', 'rgb(100, 100, 200)', 'rgb(300, 100, 200)','rgb(300, 0, 200)'], // array should have same number of elements as number of dataset
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
             /*} catch (err) {
               this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum dados!' });
             }
           });
         }
       }*/
   bars: any;
 colorArray: any;
       createBarChart() {
       
      }
 /*   plotSimplePieChart() {
        let myChart = new Chart(this.barChart.nativeElement HighCharts.chart('simplePie', {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Browser market shares in January, 2018'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: 'black'
                }
              }
            }
          },
          series: [{
            name: 'Brands',
            colorByPoint: true,
            type: undefined,
            data: [{
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true
            }, {
              name: 'Internet Explorer',
              y: 11.84
            }, {
              name: 'Firefox',
              y: 10.85
            }, {
              name: 'Edge',
              y: 4.67
            }, {
              name: 'Safari',
              y: 4.18
            }, {
              name: 'Sogou Explorer',
              y: 1.64
            }, {
              name: 'Opera',
              y: 1.6
            }, {
              name: 'QQ',
              y: 1.2
            }, {
              name: 'Other',
              y: 2.61
            }]
          }]
        });
      }
*/
}
