import { NgModule } from '@angular/core';
import {InspectViewComponent} from "./components/inspect-view/inspect-view.component";
import {InspectButtonComponent} from "./components/inspect-button/inspect-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {NgxConfigModule, NgxConfigService} from "../ngx-config";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgxCoreUtilsModule} from "../ngx-core-utils";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { InspectTreeViewComponent } from './components/inspect-tree-view/inspect-tree-view.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    InspectViewComponent,
    InspectButtonComponent,
    InspectTreeViewComponent
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NgxCoreUtilsModule,
      NgxConfigModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatIconModule,
      MatTooltipModule,
      MatToolbarModule,
      MatInputModule,
      MatSelectModule,
      MatAutocompleteModule,
      MatCardModule,
      MatSnackBarModule,
      MatDialogModule,
    ],
  exports: [
    InspectViewComponent,
    InspectButtonComponent,
    InspectTreeViewComponent,
  ],
  providers: [
    NgxConfigService,
  ]
})
export class NgxInspectModule { }
