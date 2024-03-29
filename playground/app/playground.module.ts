import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsLabelModule } from '@firestitch/label';
import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  KitchenSinkComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { KitchenSinkConfigureComponent } from './components/kitchen-sink-configure';
import { FsPasswordResetModule } from '@firestitch/password-reset';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FsPasswordResetModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        FsLabelModule,
        FsExampleModule.forRoot(),
        FsMessageModule.forRoot(),
        ToastrModule.forRoot({ preventDuplicates: true }),
        RouterModule.forRoot(routes),
    ],
    declarations: [
        AppComponent,
        ExamplesComponent,
        KitchenSinkComponent,
        KitchenSinkConfigureComponent,
    ]
})
export class PlaygroundModule {
}
