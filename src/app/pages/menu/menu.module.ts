import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { ReactiveFormsModule } from '@angular/forms';
 
const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'options',
        loadChildren: '../menuoptions/menuoptions.module#OptionsPageModule'
      },
      {
        path: 'minhaconta',
        loadChildren: '../minhaconta/minhaconta.module#MinhaContaPageModule'
      },
      {
        path: 'second/details',
        loadChildren: '../details/details.module#DetailsPageModule'
      }
      ,
      {
        path: 'consultasgeo',
        loadChildren: '../consultasgeo/consultasgeo.module#ConsultasgeoPageModule'
      }
      ,
      {
        path: 'ocorrenciacivil',
        loadChildren: '../ocorrenciacivil/ocorrenciacivil.module#OcorrenciacivilPageModule'
      }
      ,
      {
        path:'usuario',
        loadChildren: '../usuario/usuario.module#UsuarioPageModule'
      }
      ,
      {
        path:'localizacao',
        loadChildren: '../localizacao/localizacao.module#LocalizacaoPageModule'
      }
      ,
      {
        path:'consultainfracoes',
        loadChildren: '../consultainfracoes/consultainfracoes.module#ConsultainfracoesPageModule'
      }
      ,
      {
        path:'consultausuario',
        loadChildren: '../consultausuario/consultausuario.module#ConsultausuarioPageModule'
      }
      ,
      {
        path:'canceladas',
        loadChildren: '../canceladas/canceladas.module#CanceladasPageModule'
      }
      ,
      {
        path:'consulta',
        loadChildren: '../consulta/consulta.module#ConsultaPageModule'
      }
      ,
          
      {
        path:'consultaconsolidada',
        loadChildren: '../consultaconsolidada/consultaconsolidada.module#ConsultaconsolidadaPageModule'
      },
      {
        path:'usodosistema',
        loadChildren: '../usodosistema/usodosistema.module#UsodosistemaPageModule'
      }
      ,
      {
        path:'graphicodeactividades',
        loadChildren: '../graphicodeactividades/graphicodeactividades.module#GraphicodeactividadesPageModule'
      }
      ,
      {
        path:'graphicoinfracao',
        loadChildren: '../graphicoinfracao/graphicoinfracao.module#GraphicoinfracaoPageModule'
      }
      ,
      {
        path:'observacoes',
        loadChildren: '../observacoes/observacoes.module#ObservacoesPageModule'
      },
      {
        path:'bairros',
        loadChildren: '../bairros/bairros.module#BairrosPageModule'
      },
      {
        path:'leis',
        loadChildren: '../leis/leis.module#LeisPageModule'
      },
      {
        path:'groups',
        loadChildren: '../groups/groups.module#GroupsPageModule'
      },
      {
        path:'messagens',
        loadChildren: '../messagens/messagens.module#MessagensPageModule'
      },
      {
        path:'perfis',
        loadChildren: '../perfis/perfis.module#PerfisPageModule'
      }
      ,
      {
        path:'pontosinteresse',
        loadChildren: '../pontosinteresse/pontosinteresse.module#PontosinteressePageModule'
      }
      ,
      {
        path:'brat',
        loadChildren: '../brat/brat.module#BratPageModule'
      }
      ,
      {
        path:'rastreio',
        loadChildren: '../rastreio/rastreio.module#RastreioPageModule'
      }
      ,
      {
        path:'addusuario',
        loadChildren: '../addusuario/addusuario.module#AddusuarioPageModule'
      }
      ,
      
      {
        path:'addobservacoes',
        loadChildren: '../addobservacoes/addobservacoes.module#AddobservacoesPageModule'
      }
      ,
      
      {
        path:'addbairros',
        loadChildren: '../addbairros/addbairros.module#AddbairrosPageModule'
      }
      ,
      {
        path:'addleis',
        loadChildren: '../addleis/addleis.module#AddleisPageModule'
      }
      ,      
      {
        path:'addgrupos',
        loadChildren: '../addgrupos/addgrupos.module#AddgruposPageModule'
      }
      ,
      {
        path:'addmessagen',
        loadChildren: '../addmessagen/addmessagen.module#AddmessagenPageModule'
      }
      ,
      {
        
        path:'addperfis',
        loadChildren: '../addperfis/addperfis.module#AddperfisPageModule'
      }
    ]
  }
];
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }