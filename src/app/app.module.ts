import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelsListComponent,
    GraphsComponent,
    DropOffComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
