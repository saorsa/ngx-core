import {Component, Input, OnInit} from '@angular/core';
import {NgxInspectMode} from "../../ngx-inspect.model";

@Component({
  selector: 'saorsa-ng-inspect-view',
  templateUrl: './inspect-view.component.html',
  styleUrls: ['./inspect-view.component.sass']
})
export class InspectViewComponent implements OnInit {

  @Input() data: any = null;
  @Input() inspectMode: NgxInspectMode = 'raw';

  constructor() { }

  ngOnInit(): void {
  }

}
