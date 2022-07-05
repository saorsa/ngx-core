import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxConfigService {
  private _store: Storage = localStorage;

  get store(): Storage{
    return this._store;
  }

  constructor() { }

  getConfig<TValue>(key: string): TValue | undefined {
    const valueStringOrNull = this.store.getItem(key);
    if (valueStringOrNull) {
      return JSON.parse(valueStringOrNull) as TValue;
    }
    return undefined;
  }

  saveConfig<TValue>(key: string, value: TValue): void {
    const json = JSON.stringify(value);
    this.store.setItem(key, json);
  }
}
