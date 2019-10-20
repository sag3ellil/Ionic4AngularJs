import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuconfPage } from './menuconf.page';
//import { MenuconsultasgeralPage } from './menuconsultasgeral.page';
const routes: Routes = [
  {
    path: '',
    component: MenuconfPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [MenuconfPage]
})
export class MenuconfPageModule {}
