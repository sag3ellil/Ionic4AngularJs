import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },  
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },  
  //{ path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },  
  { path: 'recuperasenha', loadChildren: './pages/recuperasenha/recuperasenha.module#RecuperasenhaPageModule' },
  { path: 'ocorrenciacivil', loadChildren: './pages/ocorrenciacivil/ocorrenciacivil.module#OcorrenciacivilPageModule' },
  //{ path: 'usuario', loadChildren: './pages/usuario/usuario.module#UsuarioPageModule' },
  { path: 'addusuario', loadChildren: './pages/addusuario/addusuario.module#AddusuarioPageModule' },
 // { path: 'localizacao', loadChildren: './pages/localizacao/localizacao.module#LocalizacaoPageModule' },
 // { path: 'consultainfracoes', loadChildren: './pages/consultainfracoes/consultainfracoes.module#ConsultainfracoesPageModule' },
  //{ path: 'consultausuario', loadChildren: './pages/consultausuario/consultausuario.module#ConsultausuarioPageModule' },
 // { path: 'consultaconsolidada', loadChildren: './pages/consultaconsolidada/consultaconsolidada.module#ConsultaconsolidadaPageModule' },

  { path: 'menuconsultasgeral', loadChildren: './pages/menuconsultasgeral/menuconsultasgeral.module#MenuconsultasgeralPageModule' },
  { path: 'menumapa', loadChildren: './pages/menumapa/menumapa.module#MenumapaPageModule' },
  { path: 'menuconf', loadChildren: './pages/menuconf/menuconf.module#MenuconfPageModule' },
  { path: 'menumedidas', loadChildren: './pages/menumedidas/menumedidas.module#MenumedidasPageModule' },
  { path: 'menutermos', loadChildren: './pages/menutermos/menutermos.module#MenutermosPageModule' },
  { path: 'menuvistorias', loadChildren: './pages/menuvistorias/menuvistorias.module#MenuvistoriasPageModule' },
  { path: 'editusuario/:id', loadChildren: './pages/editusuario/editusuario.module#EditusuarioPageModule' },

 // { path: 'consulta', loadChildren: './pages/consulta/consulta.module#ConsultaPageModule' },
 // { path: 'usodosistema', loadChildren: './pages/usodosistema/usodosistema.module#UsodosistemaPageModule' },
     // ./pages/editusuario/menuvistorias.module'
//  { path: 'graphicodeactividades', loadChildren: './pages/graphicodeactividades/graphicodeactividades.module#GraphicodeactividadesPageModule' },
 // graphicoinfracao
 // { path: 'graphicoinfracao', loadChildren: './pages/graphicoinfracao/graphicoinfracao.module#GraphicoinfracaoPageModule' },
 // canceladas
//  { path: 'canceladas', loadChildren: './pages/canceladas/canceladas.module#CanceladasPageModule' },
  //observacoes
//  { path: 'observacoes', loadChildren: './pages/observacoes/observacoes.module#ObservacoesPageModule' },
  { path: 'addobservacoes', loadChildren: './pages/addobservacoes/addobservacoes.module#AddobservacoesPageModule' },
 // { path: 'bairros', loadChildren: './pages/bairros/bairros.module#BairrosPageModule' },
 // { path: 'addbairros', loadChildren: './pages/addbairros/addbairros.module#AddbairrosPageModule' },
  //{ path: 'leis', loadChildren: './pages/leis/leis.module#LeisPageModule' },
 // { path: 'addleis', loadChildren: './pages/addleis/addleis.module#AddleisPageModule' },
 // { path: 'groups', loadChildren: './pages/groups/groups.module#GroupsPageModule' },
 // { path: 'addgrupos', loadChildren: './pages/addgrupos/addgrupos.module#AddgruposPageModule' },
  //messagens
  //{ path: 'messagens', loadChildren: './pages/messagens/messagens.module#MessagensPageModule' },
  //addmessagen
 // { path: 'addmessagen', loadChildren: './pages/addmessagen/addmessagen.module#AddmessagenPageModule' },
  //{ path: 'perfis', loadChildren: './pages/perfis/perfis.module#PerfisPageModule' },
  { path: 'addperfis', loadChildren: './pages/addperfis/addperfis.module#AddperfisPageModule' },

  //{ path: 'rastreio', loadChildren: './pages/rastreio/rastreio.module#RastreioPageModule' },
 // { path: 'brat', loadChildren: './pages/brat/brat.module#BratPageModule' },
 // { path: 'pontosinteresse', loadChildren: './pages/pontosinteresse/pontosinteresse.module#PontosinteressePageModule' },
  
];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }