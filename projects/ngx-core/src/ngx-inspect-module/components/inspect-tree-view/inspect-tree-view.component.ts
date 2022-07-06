import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {NgxInspectType, SimpleDictionary} from "../../ngx-inspect.model";
import {Subject, Subscription} from "rxjs";
import {CopyPasteService} from "../../../ngx-utils";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'saorsa-ngx-inspect-tree-view',
  templateUrl: './inspect-tree-view.component.html',
  styleUrls: ['./inspect-tree-view.component.sass']
})
export class InspectTreeViewComponent implements OnInit, OnDestroy {

  @Input() keyPath: string = "";
  @Input() data: any = null;
  @Input() depth: number = 0;
  @Input() toggle$: Subject<'collapse' | 'expand'> = new Subject<'collapse' | 'expand'>();
  @Output() onMouseOver = new EventEmitter<boolean>();

  protected toggleSubscription?: Subscription;
  readonly childrenCollapsedStates: SimpleDictionary<boolean> = {};
  isDeepestHover = false;

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

  expandChildrenForKey(key: string): void {
    this.childrenCollapsedStates[key] = false;
  }

  collapseChildrenForKey(key: string): void {
    this.childrenCollapsedStates[key] = true;
  }

  areChildrenCollapsedForKey(key: string): boolean {
    const val = this.childrenCollapsedStates[key];
    return val ?? false;
  }

  isChildArray(key: string): boolean {
    return this.getPropertyInspectType(key) === 'array';
  }

  isChildObject(key: string): boolean {
    return this.getPropertyInspectType(key) === 'object';
  }

  constructor(
    readonly inspectService: NgxInspectService,
    readonly copyPaste: CopyPasteService,
    readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.toggleSubscription = this.toggle$.subscribe(t => {
      const collapsedState = (t === 'collapse');
      if (this.inspectService.isArrayOrObject(this.data)) {
        this.propertyKeys.forEach(key => {
          this.childrenCollapsedStates[key] = collapsedState;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.toggleSubscription?.unsubscribe();
  }

  copyNode(key: string): void {
    const nodeJson = JSON.stringify(this.data[key]);
    this.copyPaste.copyText(nodeJson)
      .subscribe({
        next: () => {
          this.snackBar.open(
            `Contents for key [${this.keyPath}.${key}] copied successfully`,
            'Dismiss', {
              duration: 1200,
              verticalPosition: "top",
              horizontalPosition: "center",
              politeness: "polite",
            }
          )
        },
        error: (error) => {
          console.error('Failed to copy paste JSON data', nodeJson, error);
          this.snackBar.open(
            `Failed copy contents for key [${this.keyPath}.${key}] to document navigator.`,
            'Dismiss', {
              duration: 6000,
              verticalPosition: "top",
              horizontalPosition: "center",
              politeness: "assertive",
            }
          );
        }
      });
  }

  handleMouseOver(isHover: boolean): void {
    this.isDeepestHover = isHover;
    this.onMouseOver.emit(isHover);
  }

  handleChildMouseOver(isChildHover: boolean): void {
    this.isDeepestHover = !isChildHover;
  }
}
