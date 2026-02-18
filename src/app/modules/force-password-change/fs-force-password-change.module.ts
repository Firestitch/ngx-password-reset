import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { FsCommonModule } from '@firestitch/common';
import { FsFormModule } from '@firestitch/form';
import { FsPasswordModule } from '@firestitch/password';

import { ForcePasswordChangeComponent } from './components';
import { FsForcePasswordChangeRoutingModule } from './fs-force-password-change-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FsFormModule,
    FsPasswordModule,
    FsCommonModule,
    FsForcePasswordChangeRoutingModule,
    ForcePasswordChangeComponent,
  ],
  exports: [
    ForcePasswordChangeComponent,
  ],
})
export class FsForcePasswordChangeModule {
}
