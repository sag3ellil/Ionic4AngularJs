import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaconsolidadaPage } from './consultaconsolidada.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaconsolidadaPage
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
  declarations: [ConsultaconsolidadaPage]
})
export class ConsultaconsolidadaPageModule {}
