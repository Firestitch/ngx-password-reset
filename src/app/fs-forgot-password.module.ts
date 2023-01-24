import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FsPasswordModule } from '@firestitch/password';
import { FsFormModule } from '@firestitch/form';
import { FsCodeModule } from '@firestitch/code';
import { FsLabelModule } from '@firestitch/label';
import { FsCommonModule } from '@firestitch/common';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { StackedButtonsComponent } from './components/stacked-buttons/stacked-buttons.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule,
    MatButtonModule,

    FsFormModule,
    FsPasswordModule,
    FsCodeModule,
    FsLabelModule,
    FsCommonModule,
  ],
  declarations: [
    ForgotPasswordComponent,
    StackedButtonsComponent
  ],
  exports: [
    ForgotPasswordComponent,
  ],
})
export class FsForgotPasswordModule {
}
