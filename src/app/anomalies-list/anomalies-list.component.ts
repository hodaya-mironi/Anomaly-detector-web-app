import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anomalies-list',
  templateUrl: './anomalies-list.component.html',
  styleUrls: ['./anomalies-list.component.scss'],
})
export class AnomaliesListComponent implements OnInit {
  @Input() anomaliesList: any[];
  constructor() {
  }

  ngOnInit(): void {}
}
