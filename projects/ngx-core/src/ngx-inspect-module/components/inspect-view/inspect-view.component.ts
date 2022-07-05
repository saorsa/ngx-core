import {Component, Input, OnInit} from '@angular/core';
import {NgxInspectMode} from "../../ngx-inspect.model";
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {ThemePalette} from "@angular/material/core";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


export interface InspectViewComponentConfig {
  mode: NgxInspectMode;
}


@Component({
  selector: 'saorsa-ng-inspect-view',
  templateUrl: './inspect-view.component.html',
  styleUrls: ['./inspect-view.component.sass']
})
export class InspectViewComponent implements OnInit {

  @Input() color: ThemePalette = 'primary';
  @Input() title: string = 'Inspect Object';
  @Input() data: any = null;
  @Input() inspectMode: NgxInspectMode = this.inspectService.inspectMode;

  readonly formGroup: FormGroup = this.formBuilder.group<InspectViewComponentConfig>( {
    mode: this.inspectService.inspectMode
  });

  get inspectModeControl(): FormControl {
    return this.formGroup.get('mode') as FormControl;
  }

  constructor(
    readonly inspectService: NgxInspectService,
    readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onToggleInspectMode(change: MatButtonToggleChange): void {
    this.inspectService.saveInspectMode(change.value);
  }
}
