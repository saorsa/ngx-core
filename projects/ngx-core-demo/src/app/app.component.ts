import {Component, ElementRef} from '@angular/core';
import {NgxCopyPasteService} from "../../../ngx-core/src/ngx-core-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ngx-core-demo';

  data: any = { title: 'Hello World', truth: true,
    lie: false, nullRef: null, undefinedRef: undefined, answer: 42, pi: 3.15,
    nested: { ref: 12, name: 'Atanas',
      array: [1, 2, 3, 4, { x: 42, y: 'Sample', z: 3.12 }],
      array2: [ 'one', true, 1341, {
        'x': 123,
        'y': 3424.3,
        'z': 754,
        'r': undefined,
        'f': this.copyElementValue
      }]
    }};

  constructor(
    readonly cp: NgxCopyPasteService,
  ) {
  }

  copyElementValue(elementRef: HTMLElement): void {
    this.cp.copyElementContents(elementRef);
  }
}
