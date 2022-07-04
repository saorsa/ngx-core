import { NgModule } from '@angular/core';
import { InspectViewComponent } from './components/inspect-view/inspect-view.component';
import { MatButtonModule } from "@angular/material/button";
import { InspectButtonComponent } from './components/inspect-button/inspect-button.component';

import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  declarations: [
    InspectViewComponent,
    InspectButtonComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
  ],
  exports: [
    InspectViewComponent,
    InspectButtonComponent
  ]
})
export class SaorsaNgxCoreLibModule { }
