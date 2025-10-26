import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { KitchenSinkComponent } from '../kitchen-sink/kitchen-sink.component';
import { ForcePasswordChangeComponent } from '../force-password-change/force-password-change.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, KitchenSinkComponent, ForcePasswordChangeComponent]
})
export class ExamplesComponent {
  public config = environment;
}
