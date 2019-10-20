import { Component, OnInit } from '@angular/core';

//import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsernameValidator } from  'src/app/pages/addusuario/username';
import { RouterModule, Routes } from '@angular/router';
import { cpfValidator } from  'src/app/pages/addusuario/cpfValidator';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.page.html',
  styleUrls: ['./editusuario.page.scss'],
})
export class EditusuarioPage implements OnInit {
data :any;
  public segs: any[] = [
    {
      id: 0,
      segmento: 'Todos'
    }
  ];
 public ender:string="false";
 public check: string;
 public municipio:string; 
 public submit:string;

public groups:string;
  public Per: any = [
    {
      id: 0,
      nome: 'Todos'
    }
  ];
  public s :any;
  public PerC:any;
  public ss: any;
  public segmo = "";
  public clavito: string;
  public cpf:string;
  public group:string;
  public senha;

public Perf:string;

  public hero:any[] = [
    {
      id: 0,
      name: 'Todos'
    }
  ]; 
public    form: NgForm;
  public slideOneForm:FormGroup;
  public submitAttempt;
  public signupSlider;
  public perfil :string ;


  id:any;

  status:any;


  exit()
  {
    console.log(" goBack")
    this.navCtrl.navigateRoot('/login');  
  }



 // route: ActivatedRoute,
  constructor( private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
 
    //,
   // 
   // public submitAttempt,
    ) { 
   
      this.slideOneForm = formBuilder.group({
        nome: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        
        nomeGuerra: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      

        cpfCont: ['', Validators.compose([Validators.maxLength(14), Validators.pattern('[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}'), Validators.required])],
        
        matricula:  ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[a-zA-Z-0-9]*'), Validators.required])], 

        orgao:  ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[0-9]*'), Validators.required])], 
        login:  ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[0-9]*'), Validators.required])], 
        Senha: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[0-9A-Za-z.,+*_;:]*'), Validators.required])], 
       
          ConSenha: ['', Validators.compose([Validators.maxLength(16), Validators.pattern('[0-9A-Za-z.,+*_;:]*'), Validators.required])], 
          municipio:[''],
          uf:['MA'],
          PerfilCust:[],
          activo:[],
          inactivo:[],
          Perfil:[],
          Grupo:[],
          Segmento:[],
          ConEnd:[],
          status :[]



       
    });
    
    }


    save(){

      this.submitAttempt = true;

      if(!this.slideOneForm.valid){
          this.signupSlider.slideTo(0);
      } 
     
      else {
          console.log("success!")
          console.log(this.slideOneForm.value);
          
      }

  }


  private encripta(valor: string): string {
    let retorno: string;
    let stexto: string;
    retorno = "";
    try{
      stexto = valor.trim();
    } catch (err) {
      stexto = valor;
    }
    if(stexto==null)
      stexto="";      
    if(stexto=="")
      return stexto;
    while (true)
      {
        let letra:string;
        let nnumero:number;
        let snumero:string;
        if(stexto.length>1)
          letra = stexto.substring(0, 1);
        else
          letra = stexto;
  
        nnumero = letra.toString().charCodeAt(0);
        nnumero += 166;
        snumero = nnumero.toString();
        if(snumero.length<3)
          snumero = "0" + snumero;
        if (snumero.length < 3)
            snumero = "0" + snumero;
          
        retorno += snumero;
        if(stexto.length>1)
          stexto = stexto.substring(1);
        else
          stexto = "";
        if (stexto == "")
          break;
      }
      return retorno;
  }
    
  
  get(key: string) {
    return this.data[key];
     }
  ngOnInit() {

  this.ConsultaSeg()
  this.PopulaSeguimento1()

   this.getParamValues()
 this.GetUsusarioByID()
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
  getParamValues() {
  


        this.route.params.subscribe((params) => { 
           this.id = params['id'];
             console.log(params['id']);
            });

  }

 

  Add(form: NgForm) {        

    //this.alertService.showLoader('Carregando... aguarde!!!');
    //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    //this.alertService.presentToast("Mensagem Toast: Logando...");
    //let pwd : any = Md5.hashStr(form.value.password);
                  
      }   

       
      
      PopulaSeguimento1() {
        console.log();
  

         let params1 =  "GO";
        
    
        this.Authorizer.QueryStoreProc2('ConsultaMunicipios', params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum segmento encontrado!' });
            } else {
              //mostro os módulos
              console.log(resultado);
              this.segs = resultado;
            }
          } catch (err) {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum segmento!' });
          }
        });
      }
  

      getCPFVal(event)
      {
        console.log("cpf:",event.detail.value)
        console.log(name)
      }


     
      

      getMunicipioVal(event)
      {

        console.log(event)
        this.municipio=event.detail.value
      console.log("municipio ",this.municipio)
      }


      saveEndercoVal(event){
       
        console.log(this.ender)
         
        if(event.detail.checked==true)
       { console.log("Check variable",this.ender)
        this.ender= event.detail.value
      }else 
        this.ender ="false"
        console.log(this.ender)
      }


       getValueCheck(event,a ){
        console.log(event)
        console.log(a) 
        this.check=event.detail.value
        console.log("Check variable",this.check)
       }

       ConsultaPerfisCost(item)
       {
        console.log(item);
       this.perfil=item.detail.value
        
        let params1=null;
     
         this.Authorizer.QueryStoreProc1('ConsultaPerfilCust',"", params1).then(res => {
           let resultado: any = res;
           try {
             if (resultado.length == 0) {
               //nenhum modulo encontrado
               this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
             } else {
               //mostro os módulos
               console.log(resultado);
               this.PerC = resultado;
             }
           } catch (err) {
             this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
           }
         });
       }
 
       public EditUs:any;
       public checkAtivo:any=false;
       public checkIntivo:any=false;
GetUsusarioByID() {
 // console.log(item);
 
 // this.Perf=item.detail.value;
  console.log("id :",this.id)
  let params1=this.id;

  this.Authorizer.QueryStoreProc1('GetUsuarioByID',"id", params1).then(res => {
    let resultado: any = res;
    try {
      if (resultado.length == 0) {
        //nenhum modulo encontrado
        this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum usuario encontrado!' });
      } else {
        //mostro os módulos
        console.log(resultado);
        this.EditUs = resultado;
       if(resultado[0].status='A')
       {
          this.checkAtivo=true
       }else{
         this.checkIntivo=true;
       }
        if(resultado[0].perfil='S')
        this.Perf='SUPERVISOR'
        
        if(resultado[0].perfil='A')
        this.Perf='ADMINISTRATOR'
        if(resultado[0].perfil='U')
        this.Perf='ADMINISTRATOR'
       // this.perfil=resultado[0].perfiscostum;
        this.group=resultado[0].groupos;
      }
    } catch (err) {
      this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum usuario!' });
    }
  });
} 


radioGroupChange($event)
{
  
}


      ConsultaPerfis(item) {
        console.log(item);
       
        this.Perf=item.detail.value;
       let params1=null;
    
        this.Authorizer.QueryStoreProc1('ConsultaPerfis',"", params1).then(res => {
          let resultado: any = res;
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
            } else {
              //mostro os módulos
              console.log(resultado);
              this.Per = resultado;
            }
          } catch (err) {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
          }
        });
      }

    goBack()
    {
      console.log(" goBack")
      this.navCtrl.navigateRoot('/menu/usuario'); 
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

   
   showSelectValue(i,event) {
        console.log("select value ",i);
     
      console.log("select value ",event.detail.value);

this.s =event.detail.value;
      
    }
    
      ConsultaGroups(item: any) 
      {

        let a =this.s;
        console.log("segmento:", item);
        this.group=item.detail.value;
       
      
  console.log("grp:",this.groups)
      if(this.s==undefined)
      a=this.EditUs[0].segmento
      console.log("s :",this.s)
    
            this.Authorizer.QueryStoreProc1('ConsultaGroups',"seg",a).then(res => {
          let resultado: any = res;
          console.log("resultado",resultado)
          try {
            if (resultado.length == 0) {
              //nenhum modulo encontrado
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Grupo encontrado!' });
            } else {
              //mostro os módulos
              console.log(resultado);
              this.groups = resultado;
            }
          } catch (err) {
            this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Grupo!' });
          }
        });
      }

      AddSubmit(form: NgForm) {        
        //this.alertService.showLoader('Carregando... aguarde!!!');
        //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
        //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
        //this.alertService.presentToast("Mensagem Toast: Logando...");
        console.log("form",form.value)
       console.log("validation" ,this.slideOneForm.status)
       

         if(form.value.Senha!=form.value.ConSenha)
         {
   console.log("senha",form.value.senha)
   console.log("ConsSenha",form.value.ConSenha)

   this.alertService.presentAlert({pTitle:'Smtt-sl',pSubtitle:'erro',pMessage:'a senha e a senha de confirmação não são as'} );
         }else{

          if(form.value.nome==undefined ||  form.value.nomeGuerra==undefined || form.value.municipio== undefined||form.value.Perfil== undefined)
          {
            form.value.codigo=this.id
            form.value.Senha=this.encripta(form.value.Senha)
            console.log("form",form.value);
            this.Authorizer.QueryStoreProcNgForm('updateUsuario',"DataJson", form.value).then(res => {
            let resultado: any = res;
            try {
              if (resultado.length == 0) {
                //nenhum modulo encontrado
                this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
              } else {
                //mostro os módulos
                console.log("submit:", resultado);
                this.submit = resultado;
                console.log(this.submit);
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
            }
          });
        
          }else 
        {this.alertService.presentAlert({ pTitle: 'Smtt-sl', pSubtitle: 'Form', pMessage: 'complete a forma !' });

        }
      }
   }
      
        //let pwd : any = Md5.hashStr(form.value.password);
       
       
    
      /*  this.Authorizer.Login(form).then( res => {        
          //console.log("Resultado Json:", res);
          let resultado: any = res[0];
         // form.value.senha = this.old_senha;
          if (resultado.success == true) { 
            this.db.set('SessionUser', resultado.results); 
            this.db.get('SessionUser').then((Usuario) => {
              //console.log('Usuario Logado:' + JSON.stringify( Usuario ) );      
            });
            this.alertService.showLoader(resultado.message, 2000); 
            this.navCtrl.navigateRoot('/menu/options'); 
            //this.alertService.presentToast(resultado.message);
                            
          }      
        });*/
      


}
