import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { FsCodeInputModule } from '@firestitch/code-input';
import { FsCommonModule } from '@firestitch/common';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsPasswordModule } from '@firestitch/password';

import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { StackedButtonsComponent } from './components/stacked-buttons/stacked-buttons.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatInputModule,
    MatButtonModule,

    FsFormModule,
    FsPasswordModule,
    FsCodeInputModule,
    FsLabelModule,
    FsCommonModule,
  ],
  declarations: [
    PasswordResetComponent,
    StackedButtonsComponent,
  ],
  exports: [
    PasswordResetComponent,
  ],
})
export class FsPasswordResetModule {
}
