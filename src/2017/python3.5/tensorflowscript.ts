const TENSORFLOWSCRIPT:string=`
# Install tensorflow, needs protobuf=3.2.0
RUN python -m pip --no-cache-dir install https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow_gpu-${'${TENSORFLOW_VERSION}'}-cp35-cp35m-linux_x86_64.whl
`;
export default TENSORFLOWSCRIPT;