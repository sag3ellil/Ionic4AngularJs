import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultasgeoPage } from './consultasgeo.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultasgeoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultasgeoPage]
})
export class ConsultasgeoPageModule {}
