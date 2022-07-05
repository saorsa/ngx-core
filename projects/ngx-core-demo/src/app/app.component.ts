import {Component, ElementRef} from '@angular/core';
import {CopyPasteService} from "../../../ngx-core/src/ngx-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ngx-core-demo';

  constructor(
    readonly cp: CopyPasteService,
  ) {
  }

  copyElementValue(elementRef: HTMLElement): void {
    this.cp.copyElementContents(elementRef);
  }
}
