import { Injectable } from '@angular/core';
import { Observable, from } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NgxCopyPasteService {

  constructor() { }

  copyElementContents(element: HTMLElement): Observable<void> {
    if (element instanceof HTMLInputElement) {
      return this.copyText(element.value);
    }
    else if (element instanceof HTMLTextAreaElement) {
      return this.copyText(element.value);
    }
    else {
      return this.copyText(element.innerText);
    }
  }

  copyText(text: string): Observable<void> {
    return from(
      navigator.clipboard.writeText(text)
    );
  }
}
