import {
  Component, Input, OnInit
} from '@angular/core';
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {NgxInspectStructuredState, NgxInspectType} from "../../ngx-inspect.model";

@Component({
  selector: 'saorsa-ngx-inspect-tree-view',
  templateUrl: './inspect-tree-view.component.html',
  styleUrls: ['./inspect-tree-view.component.sass']
})
export class InspectTreeViewComponent implements OnInit {

  @Input() data: any = null;
  @Input() depth: number = 0;
  @Input() structureOverride: NgxInspectStructuredState = 'mixed';

  internalStructuredState: NgxInspectStructuredState = 'mixed';

  get isUndefined(): boolean {
    return this.data === undefined;
  }

  get isNull(): boolean {
    return this.data === null;
  }

  get isArray(): boolean {
    return Array.isArray(this.data);
  }

  get isObject(): boolean {
    return !this.isArray && typeof this.data === 'object';
  }

  get inspectType(): NgxInspectType {
    return this.inspectService.getInspectType(this.data);
  }

  get propertyKeys(): string[] {
    if (this.isArray) {
      const arr = this.data as [];
      return Array.from(arr.keys()).map(item => item.toString());
    }
    if (this.isObject) {
      return Object.getOwnPropertyNames(this.data);
    }
    return [];
  }

  getPropertyValue(key: string): any {
    if (this.isArray) {
      const index:number = +key;
      const arr = this.data as [];
      if (arr.length > index) {
        return arr[index];
      }
      return undefined;
    }
    if (this.isObject) {
      return this.data[key];
    }
    throw new Error(
      `Invalid usage. The current data is nighter an array, nor an object. Key = ${key}, Data = ${this.data}`);
  }

  getPropertyInspectType(key: string): NgxInspectType {
    const propertyValue = this.getPropertyValue(key);
    return this.inspectService.getInspectType(propertyValue);
  }

  getPropertyIconName(key: string): string {
    const inspectType = this.getPropertyInspectType(key);
    switch (inspectType){
      case 'null': return 'block';
      case 'undefined': return 'block';
      case 'boolean': return 'check';
      case 'number': return '123';
      case 'string': return 'subject';
      case 'function': return 'functions';
      case 'array': return 'data_array';
      case 'object': return 'data_object';
      case 'unknown': return 'question_mark';
      default: return 'question_mark';
    }
  }

  isArrayOrObject(key: string): boolean {
    const value = this.getPropertyValue(key);
    return this.inspectService.isArrayOrObject(value);
  }

  setStructuredState(state: NgxInspectStructuredState): void {
    if (this.internalStructuredState !== state) {
      this.internalStructuredState = state;
    }
    if (this.internalStructuredState != this.structureOverride) {
      this.structureOverride = 'mixed';
    }
  }

  constructor(
    readonly inspectService: NgxInspectService,
  ) { }

  ngOnInit(): void {
  }
}
