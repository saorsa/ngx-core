import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class NgxConfigService {
  protected readonly storage: Storage;
  protected readonly window: Window;

  constructor(
    @Inject(DOCUMENT) protected document: Document
  ) {
    if (this.document.defaultView == null) {
      throw new Error("Failed to inject DOM document instance.");
    }
    if (this.document.defaultView.localStorage == null) {
      throw new Error("Failed to inject DOM document local storage instance.");
    }
    this.window = this.document.defaultView;
    this.storage = this.window.localStorage;
  }

  getConfig<TValue>(key: string): TValue | undefined {
    const valueStringOrNull = this.storage.getItem(key);
    if (valueStringOrNull) {
      return JSON.parse(valueStringOrNull) as TValue;
    }
    return undefined;
  }

  saveConfig<TValue>(key: string, value: TValue): void {
    const json = JSON.stringify(value);
    this.storage.setItem(key, json);
  }
}
