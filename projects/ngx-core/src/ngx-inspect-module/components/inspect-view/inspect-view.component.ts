import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxInspectMode} from "../../ngx-inspect.model";
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {ThemePalette} from "@angular/material/core";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CopyPasteService} from "../../../ngx-utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Subject } from 'rxjs';


export interface InspectViewComponentConfig {
  mode: NgxInspectMode;
}


@Component({
  selector: 'saorsa-ng-inspect-view',
  templateUrl: './inspect-view.component.html',
  styleUrls: ['./inspect-view.component.sass']
})
export class InspectViewComponent implements OnInit, OnDestroy {

  @Input() iconName?: string = 'adb';
  @Input() color: ThemePalette = 'primary';
  @Input() title: string = 'Inspect Object';
  @Input() data: any = null;
  @Input() inspectMode: NgxInspectMode = this.inspectService.inspectMode;

  readonly expandCollapse: Subject<'collapse' | 'expand'> = new Subject<"collapse" | "expand">();

  @ViewChild('dataJsonPreview') dataJsonPreviewElement?: ElementRef;

  get inspectModeControl(): FormControl {
    return this.formGroup.get('mode') as FormControl;
  }

  readonly formGroup: FormGroup = this.formBuilder.group<InspectViewComponentConfig>( {
    mode: this.inspectService.inspectMode
  });

  constructor(
    readonly copyPaste: CopyPasteService,
    readonly inspectService: NgxInspectService,
    readonly formBuilder: FormBuilder,
    readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onToggleInspectMode(change: MatButtonToggleChange): void {
    this.inspectMode = change.value;
  }

  copyRaw(): void {
    const json = JSON.stringify(this.data);
    this.copyPaste.copyText(json)
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Contents copied successfully',
            'Dismiss', {
              duration: 1200,
              verticalPosition: "top",
              horizontalPosition: "center",
              politeness: "polite",
            }
          )
        },
        error: (error) => {
          console.error('Failed to copy paste JSON data', json, error);
          this.snackBar.open(
            'Failed copy to document navigator.',
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

  copyElementContents(element: HTMLElement): void {
    this.copyPaste.copyElementContents(element)
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Contents copied successfully',
            'Dismiss', {
              duration: 1200,
              verticalPosition: "top",
              horizontalPosition: "center",
              politeness: "polite",
            }
          )
        },
        error: (error) => {
          console.error('Failed copy paste element contents', element, error);
          this.snackBar.open(
            'Failed copy to document navigator.',
            'Dismiss', {
              duration: 6000,
              verticalPosition: "top",
              horizontalPosition: "center",
              politeness: "assertive",
            }
          );
        }
      }
    )
  }
}
