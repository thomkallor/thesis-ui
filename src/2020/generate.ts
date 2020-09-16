import BASESCRIPT from "./python3.7/basescript";
import CAFFESCRIPT from "./python3.7/caffescript";
import TENSORFLOWSCRIPT from "./python3.7/tensorflowscript";
import PYTORCHSCRIPT from "./python3.7/pytorchscript";
import CONFIGSCRIPT from "./python3.7/configscript";
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import configurations from './config/config';

const generateScript= function({
    pythonVersion,
    tensorflow, 
    pytorch, 
    caffe
}):void{
        let finalScript:string=`
        ${BASESCRIPT}
        ${tensorflow?TENSORFLOWSCRIPT:''}
        ${pytorch?PYTORCHSCRIPT:''}
        ${caffe?CAFFESCRIPT:''}
        ${CONFIGSCRIPT}
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