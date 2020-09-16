import generate2020 from '../2020/generate'
import generate2017 from '../2017/generate'
import generate2015 from '../2015/generate'

const generateZip=function(year='2020', pythonVersion='3.7', packages){
    packages['pythonVersion']=pythonVersion;
    switch(year){
        case '2015':
            generate2015(packages);
            break;
        case '2017':
            generate2017(packages);
            break;
        default:
            generate2020(packages);
            break;
    }
}
export default generateZip;