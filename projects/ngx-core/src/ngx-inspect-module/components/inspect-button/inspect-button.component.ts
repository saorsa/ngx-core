import { Component, OnInit } from '@angular/core';
import {NgxInspectService} from "../../services/ngx-inspect.service";

@Component({
  selector: 'saorsa-ng-inspect-button',
  templateUrl: './inspect-button.component.html',
  styleUrls: ['./inspect-button.component.sass']
})
export class InspectButtonComponent implements OnInit {

  constructor(
    private readonly inspectService: NgxInspectService
  ) { }

  ngOnInit(): void {
  }

}
