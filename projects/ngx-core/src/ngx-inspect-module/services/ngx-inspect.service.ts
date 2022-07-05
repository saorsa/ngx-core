import { Injectable } from '@angular/core';
import {NgxConfigService} from "../../ngx-config-module";
import {NgxInspectConfig, NgxInspectMode} from "../ngx-inspect.model";

@Injectable({
  providedIn: 'root'
})
export class NgxInspectService {

  protected readonly inspectConfigKey: string = 'saorsa.ngx.core.inspect';

  constructor(
    private readonly configService: NgxConfigService
  ) { }

  get inspectConfig(): NgxInspectConfig {
    const config = this.configService.getConfig<NgxInspectConfig>(this.inspectConfigKey);
    return config ?? {

    };
  }

  get inspectEnabled(): boolean {
    return this.inspectConfig.enabled ?? false;
  }

  get inspectMode(): NgxInspectMode {
    return this.inspectConfig.mode ?? 'raw';
  }

  saveInspectEnabled(value: boolean): void {
    let config = this.inspectConfig;
    config.enabled = value;
    this.saveConfig(config);
  }

  saveInspectMode(mode: NgxInspectMode): void {
    let config = this.inspectConfig;
    config.mode = mode;
    this.saveConfig(config);
  }

  saveConfig(value: NgxInspectConfig): void {
    this.configService.saveConfig<NgxInspectConfig>(this.inspectConfigKey, value);
  }
}
