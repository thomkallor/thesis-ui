import * as python3_5 from "./python3.5/main";
import * as python2_7 from "./python2.7/main";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import configurations from './config/config';

const generateScript= function({
    pythonVersion,
    tensorflow,
    pytorch,
    caffe,
    luatorch,
    theano,
    pylearn2,
    lasagne,
}):void{
    let dockerImage;
    if (pythonVersion == '2.7'){
        dockerImage = python2_7;
    }else{
        dockerImage = python3_5;
    }
    let finalScript:string=`
    ${dockerImage.BASESCRIPT}
    ${pytorch?dockerImage.PYTORCHSCRIPT:''}
    ${luatorch?dockerImage.LUATORCHSCRIPT:''}
    ${theano | lasagne | pylearn2?dockerImage.THEANOSCRIPT:''}
    ${lasagne?dockerImage.LASAGNESCRIPT:''}
    ${pylearn2?dockerImage.PYLEARN2SCRIPT:''}
    ${caffe?dockerImage.CAFFESCRIPT:''}
    ${tensorflow?dockerImage.TENSORFLOWSCRIPT:''}
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