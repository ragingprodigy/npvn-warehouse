import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';

import { ProtectedComponent } from './protected.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllocateComponent } from './allocate/allocate.component';
import { DispatchComponent } from './dispatch/dispatch.component';
import { EnrollComponent } from './enroll/enroll.component';
import { UnbundleComponent } from './unbundle/unbundle.component';
import { DetailsComponent } from './unbundle/details/details.component';

const getTitle = (name) => {
  return { title: name + ' - NPVN Warehouse' }
};

const routes: Routes = [
  {
    path: '',
    component: ProtectedComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: getTitle('Dashboard') },

      { path: 'unbundle', component: UnbundleComponent, data: getTitle('Create Device') },
      { path: 'unbundle/:identifier', component: DetailsComponent, data: getTitle('Unpack Device') },

      { path: 'allocate', component: AllocateComponent, data: getTitle('Allocate Device') },
      { path: 'enroll', component: EnrollComponent, data: getTitle('Enroll Device') },
      { path: 'dispatch', component: DispatchComponent, data: getTitle('Dispatch Device') },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
