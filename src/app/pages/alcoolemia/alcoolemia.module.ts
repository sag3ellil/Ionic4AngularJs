import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlcoolemiaPage } from './alcoolemia.page';

const routes: Routes = [
  {
    path: '',
    component: AlcoolemiaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlcoolemiaPage]
})
export class AlcoolemiaPageModule {}
