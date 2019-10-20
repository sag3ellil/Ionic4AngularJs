import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
  selecteMenu = '';
  shouldShow()
  {
    return true
  }

  goMenu()
  {
    this.navCtrl.navigateRoot('/menu/options'); 
  }
  

  constructor(
      private router: Router,
      private env: EnvService,
      private Authorizer: AuthService,
      private alertService: AlertService,
      public navCtrl: NavController) {
     this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
    this.ConsultaMenu()
   
  }

 public module1:any
 public module2:any
 public module3:any
 public module4:any
 public module5:any

 public pages:any
 public pages1:any
 public pages2:any
 public pages3:any
 public pages4:any
 public pages5:any
  public ss:any;
  ConsultaMenu() {
    let params1=null;
    let params2={
      "StatusCRUD":"",
      "CodigoUsuarioSistema":'',
      "Hashkey":'',
      "FormValue": ''
        };
    






           this.pages = [
            {
              title: 'Menu Principal',
              url: '/menu/options',
              icon : 'menu'
            },
            {
              title: 'Minha Conta',
              url: '/menu/minhaconta',
              icon : 'person'
            }
          ];
         
           this.module1=[ {
            title: 'CONSULTAS GERAL',
           
            
          }]
          this.pages1 = [
            {
              title: 'Consulta',
              url:"/menu/consulta",
              icon : 'search'
            },
            {
              title: 'Consulta Consolidada',
              url: "/menu/consultaconsolidada",
              icon : 'search'
            },
            {
              title: 'Consulta Usuário',
              
              url: "/menu/consultausuario",
              icon : 'paper'
            },
            {
              title: 'Uso Do Sistema',
             url:"/menu/usodosistema",
              icon : 'list'
            },
            {
              title: 'Gráfico Consulta',
              url:"/menu/graphicodeactividades",
              icon : 'pie'
            },
            {
              title: 'Consulta Infrações',
              url:"/menu/consultainfracoes",
              icon : 'search'
            },
          
          
           
          ];
        
    
        
   }
 
}
