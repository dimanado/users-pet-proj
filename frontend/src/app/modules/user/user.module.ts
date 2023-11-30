import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { UserListComponent } from '@app/modules/user/components/user-list/user-list.component';
import { UserFormComponent } from '@app/modules/user/components/user-form/user-form.component';
import { UserRoutingModule } from '@app/modules/user/user-routing.module';
import { DialogBaseHeaderComponent } from '@app/shared/components/dialog-base-header/dialog-base-header.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    DialogBaseHeaderComponent,
  ],
  providers: []
})
export class UserModule { }
