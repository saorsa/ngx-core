import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgxInspectService} from "../../services/ngx-inspect.service";
import {ThemePalette} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {InspectViewComponent} from "../inspect-view/inspect-view.component";

@Component({
  selector: 'saorsa-ng-inspect-button',
  templateUrl: './inspect-button.component.html',
  styleUrls: ['./inspect-button.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class InspectButtonComponent implements OnInit {

  @Input() iconName?: string = 'adb';
  @Input() color: ThemePalette = 'primary';
  @Input() title: string = 'Inspect Object';
  @Input() data: any = null;
  @Input() forceVisible: boolean = false;

  constructor(
    private readonly inspectService: NgxInspectService,
    readonly matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  click(): void {
    this.matDialog.open<InspectViewComponent>(InspectViewComponent);
  }
}
