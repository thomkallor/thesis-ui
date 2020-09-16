import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docker-image',
  templateUrl: './docker-image.component.html',
  styleUrls: ['./docker-image.component.scss']
})
export class DockerImageComponent implements OnInit {

  template: Array<object>=[
    {
      year:'2015',
      name:"BEFORE YEAR 2015",
      pythonVersions:['2.7', '3.5'],
      packages:[
        {name:"Torch7 (lua)", value:"luatorch"},
        {name:"Theano (0.8.2)", value:"theano"},
        {name:"PyLearn2 (latest)", value:"pylearn"},
        {name:"Lasagne (latest)", value:"lasagne"},
        {name:"Pytorch (0.3.0)", value:"pytorch"},
        {name:"Tensorflow (0.6.0)", value:"tensorflow"}
      ]
    },
    {
      year:'2017',
      name:"YEAR 2015 TO 2017",
      pythonVersions:['2.7', '3.5'],
      packages:[
        {name:"Tensorflow (1.2.0)", value:"tensorflow"},
        {name:"Theano (latest)", value:"theano"},
        {name:"Keras (1.0.8)", value:"keras"},
        {name:"Caffe (latest)", value:"caffe"}
      ]
    },
    {
      year:'2020',
      name:"CURRENT",
      pythonVersions:['3.7'],
      packages:[
        {name:"Tensorflow (2.2.0)", value:"tensorflow"},
        {name:"Pytorch (latest)", value:"pytorch"},
        {name:"Caffe (latest)", value:"caffe"}
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
