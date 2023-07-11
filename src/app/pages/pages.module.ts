import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Module
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ComponentsModule,
    SharedModule
  ],
  exports:[
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent
  ]
})
export class PagesModule { }
