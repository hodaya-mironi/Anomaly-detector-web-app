import { Component, EventEmitter, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  public selected: string
  public set selection(v : string) {
    this.changeSelection.emit(v);
    console.log(v);
    this.selected = v;
  }
  
  @Output() public changeSelection: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }


  anomalyAlgorithms: string[] = ['Regression','Hybrid'];
  
  
}
