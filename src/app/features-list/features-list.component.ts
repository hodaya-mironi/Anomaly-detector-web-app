import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.scss'],
})
export class FeaturesListComponent implements OnInit {
  @Input() featuresList: any[];
  @Output() selectedFeature: EventEmitter<string> = new EventEmitter();
  selected: string;
  public set selection(v: string) {
    this.selectedFeature.emit(v);
    console.log(v);
    this.selected = v;
  }
  constructor() {
    this.featuresList = [
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

  ngOnInit(): void {}
}
