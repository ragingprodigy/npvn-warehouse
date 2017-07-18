import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProtectedComponent } from './protected.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProtectedRoutingModule } from './protected-routing.module';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    ProtectedRoutingModule
  ],
  declarations: [ProtectedComponent, DashboardComponent]
})
export class ProtectedModule { }
