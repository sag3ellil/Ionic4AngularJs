import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { rootRoute } from '@angular/router/src/router_module';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menuconsultasgeral',
  templateUrl: './menuconsultasgeral.page.html',
  styleUrls: ['./menuconsultasgeral.page.scss'],
})
export class MenuconsultasgeralPage implements OnInit {
 
  public items :any ; 
  public MenuOptions : any;
  public AppName : String = 'VALPARAISO';
  public AppVersion : String = '0.0.1';
  public AppGreetings : String = 'Bem-Vindos ao VALPARAISO!';
  constructor(public navCtrl: NavController,    
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService ) {
     }

     ngOnInit() {    
      if (!sessionStorage.SessionHashkey) {       
        this.navCtrl.navigateRoot('/login');
      }

      
      this.items  =  [      
          {
            id : 1,
            name : "Consulta",
            icon : "assets/imgs/fa-search-minus.jpg",
            details: "Procure aqui o que você precisa encontrar.",
            route :"/usuario"
          }
      ];
      this.items.push( {
        id : 2,
        name : "Consulta Consolidada",
        icon : "assets/imgs/fa-street-view.jpg",      
        details: "Consulte os preços de forma rápido usando a camera do seu celular.",
        route :"/localizacao"
      });        
     /* this.items.push( {
        id : 4,
        name : "Promoções",
        icon : "assets/imgs/Promocoes.png",      
        details: "Encontre todas as promoções e aproveite.",
        route :"/login"
      });*/
      this.items.push( {
        id : 5,
        name : "Consulta Usuario",
        icon : "assets/imgs/fa-search-minus.jpg",      
        details: "Produtos marcados como favoritos.",
        route :"/consultaconsolidada"
      });
      this.items.push({
        id : 6,
        name : "Uso do Sistema",
        icon : "assets/imgs/fa-file-text.jpg",
        details: "Tudo que você colocou no carrinho, salvou ou comprou antes.",
        route :"/consultausuario"
      });    
      this.items.push({
        id : 6,
        name : "Conuslta Infracaos",
        icon : "assets/imgs/fa-file-text-o.jpg",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/consultainfracoes"
      });    
      
      this.items.push({
        id : 6,
        name : "Graphico Infracaos",
        icon : "assets/imgs/fa-file-text-o.jpg",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/consultainfracoes"
      });  
      this.items.push({
        id : 6,
        name : "Canceladas",
        icon : "assets/imgs/fa-file-text-o.jpg",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/consultainfracoes"
      });  
      this.items.push({
        id : 6,
        name : "Ultimo Acesso",
        icon : "assets/imgs/fa-file-text-o.jpg",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/consultainfracoes"
      });  
      this.items.push({
        id : 6,
        name : "AIT Transporte",
        icon : "assets/imgs/fa-file-text-o.jpg",
        details: "Atendimento no Caixa, Expedição ou OnLine.",
        route :"/consultainfracoes"
      });  

    let dataMenu = {
      'usuario': sessionStorage.getItem('SessionCodigoUsuario'),
      'menu': '0',
      'Hashkey': sessionStorage.getItem("SessionHashkey")
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
