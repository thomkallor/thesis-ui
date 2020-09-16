import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-package-checkbox',
  templateUrl: './package-checkbox.component.html',
  styleUrls: ['./package-checkbox.component.scss']
})
export class PackageCheckboxComponent implements OnInit {

  @Input() checked: boolean;
  @Input() name: string;
  @Input() value: string;
  @Output() toggleStatus=new EventEmitter();
  ngOnInit(): void {
  }
  onClick(value):void{
    this.checked=value;
    this.toggleStatus.emit(this.value);
  }
}
