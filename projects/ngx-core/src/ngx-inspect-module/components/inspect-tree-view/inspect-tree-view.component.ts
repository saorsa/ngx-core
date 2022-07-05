import {
  Component, Input, OnInit
} from '@angular/core';
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {NgxInspectType} from "../../ngx-inspect.model";


@Component({
  selector: 'saorsa-ngx-inspect-tree-view',
  templateUrl: './inspect-tree-view.component.html',
  styleUrls: ['./inspect-tree-view.component.sass']
})
export class InspectTreeViewComponent implements OnInit {

  @Input() data: any = null;
  @Input() depth: number = 0;

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
  }

  constructor(
    readonly inspectService: NgxInspectService,
  ) { }

  ngOnInit(): void {
  }

}
