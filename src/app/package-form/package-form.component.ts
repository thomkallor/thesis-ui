import { Component, OnInit, Input } from '@angular/core';
import generateZip from '../generateZip';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.scss']
})
export class PackageFormComponent implements OnInit {
  @Input() pythonVersions:Array<string>;
  versionSelected:string;
  @Input() packages:Array<object>;
  @Input() year:string;
  packageStatus:object={};
  constructor() { }
  ngOnInit(): void {
    this.versionSelected=this.pythonVersions[0];
    for (let pack of this.packages){
      let key:string = pack['value'];
      this.packageStatus[key]=false;
    }
  }
  toggleStatus(pack){
    this.packageStatus[pack]=!this.packageStatus[pack];
  }
  changeVersion(version){
    this.versionSelected=version;
  }
  onGenerate(): void{
    generateZip(this.year, this.versionSelected, this.packageStatus);
  }

}
