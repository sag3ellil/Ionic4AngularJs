import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OcorrenciacivilPage } from './ocorrenciacivil.page';

const routes: Routes = [
  {
    path: '',
    component: OcorrenciacivilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OcorrenciacivilPage]
})
export class OcorrenciacivilPageModule {}
