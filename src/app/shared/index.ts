import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoaderComponent } from './loader.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [ CommonModule, NgbModule ],
  entryComponents: [ ConfirmComponent ],
  declarations: [ LoaderComponent, ConfirmComponent ],
  exports: [ LoaderComponent, ConfirmComponent ]
})
export class SharedModule {}
