import { EventEmitter, Input, Output } from '@angular/core';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'drop-off',
  templateUrl: './drop-off.component.html',
  styleUrls: ['./drop-off.component.scss'],
})
export class DropOffComponent implements OnInit {
  @Input() fileType: string;
  @Output() fileContentEmitter: EventEmitter<any> = new EventEmitter();
  fileToUpload: any;
  fileContent: any;

  constructor() {}

  ngOnInit(): void {}

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.fileBrowseHandler($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    this.fileToUpload = event.target.files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result;
    this.fileContentEmitter.emit(this.fileContent);
    };
    fileReader.readAsText(this.fileToUpload);
  }

  public deleteFile() {
    this.fileToUpload = undefined;
    this.fileContentEmitter.emit(undefined);
  }
}
