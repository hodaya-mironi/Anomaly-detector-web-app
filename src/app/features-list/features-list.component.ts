import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.scss'],
})
export class FeaturesListComponent implements OnInit {
  @Input() featuresList: any;
  @Output() selectedFeature: EventEmitter<string> = new EventEmitter();
  selected: string;
  public set selection(v: string) {
    this.selectedFeature.emit(v);
    console.log(v);
    this.selected = v;
  }
  constructor() {}

  ngOnInit(): void {}
}
