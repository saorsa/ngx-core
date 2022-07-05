import { Injectable } from '@angular/core';
import {NgxConfigService} from "../../ngx-config-module";

@Injectable({
  providedIn: 'root'
})
export class NgxInspectService {

  constructor(
    private readonly configService: NgxConfigService
  ) { }
}
