import { Injectable } from '@angular/core';
import {NgxConfigService} from "../../ngx-config-module";
import {NgxInspectConfig, NgxInspectMode, NgxInspectType} from "../ngx-inspect.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgxInspectService {

  protected readonly inspectConfigKey: string = 'saorsa.ngx.core.inspect';

  readonly config$ = new Subject<NgxInspectConfig>();

  constructor(
    private readonly configService: NgxConfigService
  ) {
  }

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
    let diff = config.enabled !== value;
    if (diff) {
      config.enabled = value;
      this.saveConfig(config);
      this.config$.next(config);
    }
  }

  saveInspectMode(mode: NgxInspectMode): void {
    let config = this.inspectConfig;
    let diff = config.mode !== mode;
    if (diff) {
      config.mode = mode;
      this.saveConfig(config);
      this.config$.next(config);
    }
  }

  saveConfig(value: NgxInspectConfig): void {
    this.configService.saveConfig<NgxInspectConfig>(this.inspectConfigKey, value);
  }

  isBoolean(arg: any): arg is boolean {
    return typeof arg === 'boolean';
  }

  isNumber(arg: any): arg is number {
    return typeof arg === 'number';
  }

  isString(arg: any): arg is string {
    return typeof arg === 'string';
  }

  isFunction(arg: any): arg is string {
    return typeof arg === 'function';
  }

  isArray(arg: any): boolean {
    return Array.isArray(arg);
  }

  isObject(arg: any): boolean {
    return !Array.isArray(arg) && typeof arg === 'object';
  }

  isArrayOrObject(arg: any): boolean {
    if (arg == null) return false;
    return this.isArray(arg) || this.isObject(arg);
  }

  getInspectType(arg: any | null): NgxInspectType {
    if (arg === null) {
      return 'null';
    }
    if (arg === undefined) {
      return 'undefined';
    }

    if (this.isFunction(arg)) {
      return 'function';
    }
    if (this.isArray(arg)) {
      return 'array';
    }
    if (this.isObject(arg)) {
      return 'object';
    }
    if (this.isBoolean(arg)) {
      return 'boolean';
    }
    if (this.isNumber(arg)) {
      return 'number';
    }
    if (this.isString(arg)) {
      return 'string';
    }

    return 'unknown'
  }
}
