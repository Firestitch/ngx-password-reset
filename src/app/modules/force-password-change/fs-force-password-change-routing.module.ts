import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForcePasswordChangeComponent } from './components';


const routes: Routes = [
  { path: '', component: ForcePasswordChangeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FsForcePasswordChangeRoutingModule { }
