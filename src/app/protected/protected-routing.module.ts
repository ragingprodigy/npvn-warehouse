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

const routes: Routes = [
  {
    path: '',
    component: ProtectedComponent,
    // canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'unbundle', component: UnbundleComponent },
      { path: 'unbundle/:imei', component: DetailsComponent },

      { path: 'allocate', component: AllocateComponent },
      { path: 'enroll', component: EnrollComponent },
      { path: 'dispatch', component: DispatchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
