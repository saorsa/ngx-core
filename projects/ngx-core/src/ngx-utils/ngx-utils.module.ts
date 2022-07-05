import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyPasteService } from "./services/copy-paste.service";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CopyPasteService,
  ],
  exports: [
  ]
})
export class NgxUtilsModule { }
