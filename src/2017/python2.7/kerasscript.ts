const KERASSCRIPT:string=`
RUN git clone https://github.com/keras-team/keras.git
RUN cd keras && git checkout ${'${KERAS_VERSION}'} && python setup.py install
`;
export default KERASSCRIPT;