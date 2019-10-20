import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { rootRoute } from '@angular/router/src/router_module';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
//import { Session } from 'inspector';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class principalPage implements OnInit {

  public items :any ; 
  public MenuOptions : any;
  public AppName : String = 'SMTT-SL';
  public AppVersion : String = '0.0.1';
  public AppGreetings : String = 'Bem-Vindos ao SMTT-SL!';

  constructor(            
    public navCtrl: NavController,    
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService
    ) { }

    itemSelected(item: { modulo_nome: string ,name : string, caminho:string ,icon:string, details:string,route:string}){
      //if(item.name ==='Produtos'){
      this.alertService.presentToast("Acessando...: "+item.name);
      this.navCtrl.navigateRoot(item.route);
      //}
    }
    exit()
    {
      console.log(" goBack")
      this.navCtrl.navigateRoot('/login');  
    }
    public nome:any;
    ngOnInit() {    
     /* if (!sessionStorage.SessionHashkey) {       
        this.navCtrl.navigateRoot('/login');
      }*/
   
    this.nome='anyone'
      
      this.items  =  [      
          {
            id : 1,
            name : "Usuários",
            icon : "assets/imgs/smttsl/consulta-condutor.png",
            details: "Procure aqui o que você precisa encontrar.",
            route :"/menu/usuario"
          }
      ];
      this.items.push({
        id : 2,
        name : "Localização",
        icon : "assets/imgs/smttsl/mapear.png",      
        details: "Consulte os preços de forma rápido usando a camera do seu celular.",
        route :"/menu/localizacao"
      });        
     /* this.items.push( {
        id : 4,
        name : "Promoções",
        icon : "assets/imgs/Promocoes.png",      
        details: "Encontre todas as promoções e aproveite.",
        route :"/login"
      });*/
      this.items.push({
        id : 5,
        name : "Consulta Consolidada",
        icon : "assets/imgs/smttsl/historico.png",      
        details: "Produtos marcados como favoritos.",
        route :"/menu/consultaconsolidada"
      });
      this.items.push({
        id : 6,
        name : "Consulta Usuário",
        icon : "assets/imgs/smttsl/tabelas.png",
        details: "Tudo que você colocou no carrinho, salvou ou comprou antes.",
        route :"/menu/consultausuario"
      });    
      this.items.push({
        id : 6,
        name : "Consulta Infrações",
        icon : "assets/imgs/smttsl/Termo-de-Acordo.png",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/menu/consultainfracoes"
      });    
      

    let dataMenu = {
      'usuario': '',
      'menu': '0',
      'Hashkey': ''
    };

   /* this.Authorizer.QueryStoreProc('ConsultaMenu', dataMenu).then( res => {        
      let resultado: any = res;
      try{
        if(resultado.length==0){
          //nenhum modulo encontrado
          this.alertService.presentAlert({pTitle:'MOP',pSubtitle:'Menu',pMessage:'Nenhum módulo encontrado!'} );
        }else{
          //mostro os módulos
          this.items = resultado;
        }
      }catch(err){
        this.alertService.presentAlert({pTitle:'MOP',pSubtitle:'Menu',pMessage:'Nenhum módulo encontrado!'} );
      }
    });  */  


  }
 
}
