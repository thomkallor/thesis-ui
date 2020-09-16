const PYLEARN2SCRIPT:string=`
## install pylearn2
RUN git clone git://github.com/lisa-lab/pylearn2.git && \
     cd pylearn2 && \
     python setup.py develop && \
	 mkdir data

## data path for pylearn
ENV PYLEARN2_DATA_PATH=/usr/local/pylearn2/data
`;
export default PYLEARN2SCRIPT;