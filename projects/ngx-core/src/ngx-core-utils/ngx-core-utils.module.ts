import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCopyPasteService } from "./services/ngx-copy-paste.service";
import { NgxScreenSizeDirective } from './directives/ngx-screen-size.directive';
import {NgxScreenSizeService} from "./services/ngx-screen-size.service";


@NgModule({
  declarations: [
    NgxScreenSizeDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NgxCopyPasteService,
    NgxScreenSizeService,
    NgxScreenSizeDirective,
  ],
  exports: [
    NgxScreenSizeDirective,
  ]
})
export class NgxCoreUtilsModule { }
