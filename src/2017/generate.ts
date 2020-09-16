import * as python3_5 from "./python3.5/main";
import * as python2_7 from "./python2.7/main";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import configurations from './config/config';

const generateScript= function({
    pythonVersion,
    tensorflow, 
    caffe, 
    theano, 
    keras
}):void{
    let dockerImage;
    if (pythonVersion == '2.7'){
        dockerImage = python2_7;
    }else{
        dockerImage = python3_5;
    }
    let finalScript:string=`
    ${dockerImage.BASESCRIPT}
    ${theano?dockerImage.THEANOSCRIPT:''}
    ${tensorflow?dockerImage.TENSORFLOWSCRIPT:''}
    ${keras?dockerImage.KERASSCRIPT:''}
    ${caffe?dockerImage.CAFFESCRIPT:''}
    ${dockerImage.CONFIGSCRIPT}
    `;
    let zip: JSZip = new JSZip();
    for(let config of configurations){
        zip.file(config['name'], config['config']);
    }

    zip.file('Dockerfile', finalScript);
    zip.generateAsync({type:"blob"})
    .then(function (blob) {
        saveAs(blob, "docker.zip");
    });
}

export default generateScript;