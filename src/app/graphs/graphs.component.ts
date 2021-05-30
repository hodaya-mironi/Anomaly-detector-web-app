import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit, OnChanges {
  @Input() normalData: [{ x: number; y: number }] = [{ x: 0, y: 0 }];
  @Input() anomalyData: [{ x: number; y: number }] = [{ x: 0, y: 0 }];
  @Input() correlativeFeature: string;
  ngOnChanges(changes: SimpleChanges): void {
    this.scatterChartData = [
      {
        data: [...changes.anomalyData.currentValue],
        label: 'Anomaly Data',
        pointRadius: 4,
        backgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointBackgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointHoverBackgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointHoverBorderColor: 'black',
      },
      {
        data: [...changes.normalData.currentValue],
        label: 'Normal Data',
        pointRadius: 3,
        backgroundColor: '#d3d3d3',
        pointBackgroundColor: '#d3d3d3',
        pointHoverBackgroundColor: '#d3d3d3',
        pointHoverBorderColor: 'rgba(0, 139, 139, 0.7)',
      },
    ];
  }
  public scatterChartData: ChartDataSets[];
  ngOnInit(): void {
    this.scatterChartData = [
      {
        data: [...this.anomalyData],
        label: 'Anomaly Data',
        pointRadius: 4,
        backgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointBackgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointHoverBackgroundColor: 'rgba(0, 139, 139, 0.7)',
        pointHoverBorderColor: 'black',
      },
      {
        data: [...this.normalData],
        label: 'Normal Data',
        pointRadius: 3,
        backgroundColor: '#d3d3d3',
        pointBackgroundColor: '#d3d3d3',
        pointHoverBackgroundColor: '#d3d3d3',
        pointHoverBorderColor: 'rgba(0, 139, 139, 0.7)',
      },
    ];
  }
  public scatterChartOptions: ChartOptions = {
    responsive: false,
  };
  public scatterChartType: ChartType = 'scatter';
}
