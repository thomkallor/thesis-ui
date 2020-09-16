const CAFFESCRIPT:string=`
RUN conda install -c intel boost=1.61.0
RUN conda install -c conda-forge protobuf=3.2.0 hdf5 openblas
RUN python -m pip install --upgrade msgpack python-dateutil pytest
RUN conda install -c mvn libsnappy
## install opencv3 caffe doesnot support opencv 4
RUN conda install -c menpo opencv3

RUN git clone https://github.com/BVLC/caffe.git /usr/local/caffe

RUN cd /usr/local/caffe && mkdir build && cd build && \
	cmake -DPYTHON_INCLUDE_DIR=/usr/local/miniconda${'${PYTHON}'}/include/python${'${PYTHON_VERSION}'}m \
	-DPYTHON_INCLUDE_DIR2=/usr/local/miniconda${'${PYTHON}'}/include/python${'${PYTHON_VERSION}'}m \
	-DPYTHON_LIBRARY=/usr/local/miniconda${'${PYTHON}'}/lib/libpython${'${PYTHON_VERSION}'}m.so \
	-Dpython_version=${'${PYTHON}'} \
	-DUSE_CUDNN=1 \
	-DBLAS=Open \
	..  && \
	make -j"$(nproc)" all && \
	make install

# Set up Caffe environment variables
ENV CAFFE_ROOT=/usr/local/caffe
ENV PYCAFFE_ROOT=$CAFFE_ROOT/python
ENV PYTHONPATH=$PYCAFFE_ROOT:$PYTHONPATH \
	PATH=$CAFFE_ROOT/build/tools:$PYCAFFE_ROOT:$PATH
RUN echo "$CAFFE_ROOT/build/lib" >> /etc/ld.so.conf.d/caffe.conf && ldconfig
`;
export default CAFFESCRIPT;