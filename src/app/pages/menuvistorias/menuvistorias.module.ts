import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuvistoriasPage } from './menuvistorias.page';

const routes: Routes = [
  {
    path: '',
    component: MenuvistoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuvistoriasPage]
})
export class MenuvistoriasPageModule {}
