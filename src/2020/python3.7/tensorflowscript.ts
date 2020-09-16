const tensorflow_script:string=`
RUN python -m pip install https://storage.googleapis.com/tensorflow/linux/${'${TENSORFLOW_ARCH}'}/tensorflow_${'${TENSORFLOW_ARCH}'}-${'${TENSORFLOW_VERSION}'}-cp37-cp37m-manylinux2010_x86_64.whl
`;
export default tensorflow_script;