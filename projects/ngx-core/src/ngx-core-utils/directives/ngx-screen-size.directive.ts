import { Directive, HostListener } from '@angular/core';
import { NgxScreenSizeService } from "../services/ngx-screen-size.service";

@Directive({
  selector: '[saorsaNgxScreenSize]'
})
export class NgxScreenSizeDirective {

  constructor(
    private readonly screenSizeService: NgxScreenSizeService
  ) { }

  @HostListener('window:load', ['$event']) onLoad(event: any) {
    console.warn('load event', event);
    this.sendSize(event.currentTarget!.innerWidth);
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    console.warn('resize event', event);
    this.sendSize(event.currentTarget.innerWidth);
  }

  sendSize(width: number) {
    console.info('----', width);
  }
}
