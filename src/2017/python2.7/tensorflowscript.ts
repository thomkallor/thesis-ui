const TENSORFLOWSCRIPT:string=`
#Install tensorflow
RUN pip --no-cache-dir install https://storage.googleapis.com/tensorflow/linux/${'${TENSORFLOW_ARCH}'}/tensorflow_${'${TENSORFLOW_ARCH}'}-${'${TENSORFLOW_VERSION}'}-cp27-none-linux_x86_64.whl
`;
export default TENSORFLOWSCRIPT;