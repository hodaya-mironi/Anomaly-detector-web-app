import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { GraphsComponent } from './graphs/graphs.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadDirective } from './directives/upload.directive';
import { MatListModule } from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxCSVtoJSONModule } from 'ngx-csvto-json';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FeaturesListComponent } from './features-list/features-list.component';
import { AnomaliesListComponent } from './anomalies-list/anomalies-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ModelsListComponent,
    GraphsComponent,
    DropOffComponent,
    UploadDirective,
    FeaturesListComponent,
    AnomaliesListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    ChartsModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    NgxCSVtoJSONModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
