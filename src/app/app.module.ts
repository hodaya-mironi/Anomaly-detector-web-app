import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { DataTableComponent } from './data-table/data-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDirective } from './directives/upload.directive';
import {MatListModule} from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import {MatRadioModule} from '@angular/material/radio' 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxCSVtoJSONModule } from 'ngx-csvto-json';

@NgModule({
  declarations: [
    AppComponent,
    ModelsListComponent,
    GraphsComponent,
    DropOffComponent,
    DataTableComponent,
    UploadDirective  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    ChartsModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    NgxCSVtoJSONModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
