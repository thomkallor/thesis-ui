import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-python-radiobutton',
  templateUrl: './python-radiobutton.component.html',
  styleUrls: ['./python-radiobutton.component.scss']
})
export class PythonRadiobuttonComponent implements OnInit {

  constructor() { }
  @Input() pythonVersions:Array<string>;
  @Input() versionSelected:string;
  @Output() changeVersion = new EventEmitter();

  ngOnInit(): void {
  }
  onChange(value): void{
    this.versionSelected=value;
    this.changeVersion.emit(this.versionSelected);
  }

}
