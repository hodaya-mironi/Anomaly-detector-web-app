import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-anomalies-list',
  templateUrl: './anomalies-list.component.html',
  styleUrls: ['./anomalies-list.component.scss']
})
export class AnomaliesListComponent implements OnInit {

  @Input() anomaliesList: any[];
  constructor() {
    this.anomaliesList = [
      'feature1',
      'feature2',
      'feature3',
      'feature4',
      'feature5',
      'feature6',
      'feature7',
      'feature8',
      'feature9',
      'feature10',
      'feature11',
      'feature12',
      'feature13',
      'feature14',
    ];
  }

  ngOnInit(): void {
  }

}
