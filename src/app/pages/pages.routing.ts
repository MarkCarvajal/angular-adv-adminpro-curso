import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: PagesComponent ,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'}  },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1'}  },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario'}  },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'}  },
      { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promesas'}  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'}  },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
