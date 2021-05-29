import { Component } from '@angular/core';
import { ControllerService } from './services/controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  chosenAlgorithm: string;
  anomalyString: File;
  normalString: File;
  public loading: boolean;
  public isDetected: boolean = false;
  title = 'Anomaly Detection Server';
  constructor(private controllerService: ControllerService) { }
  public onAlgorithmSelectedChange(selected: string) {
    this.chosenAlgorithm = selected;
  }
  public onLearnAnomalyFileUpload(fileString: any) {
    this.anomalyString = fileString;
  }
  public onDetectAnomalyFileUpload(fileString: any) {
    this.normalString = fileString;
  }

  public sendPayload() {
    this.isDetected = true;
    this.loading = true;
    const payload = {
      normalString: this.normalString,
      anomalyString: this.anomalyString,
      chosenAlgorithm: this.chosenAlgorithm,
    };
     this.controllerService.LearnNormal(payload)
       .subscribe(res => {
         this.loading = false;
          console.log(res);
      }, (err) => {
         console.log(err);
       });
  }
}
