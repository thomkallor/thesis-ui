const CAFFESCRIPT:string=`
## new environment for caffe
RUN conda create -n caffe python=${'${PYTHON_VERSION}'}
ENV CONDA_DEFAULT_ENV caffe
RUN conda install cython cmake lmdb
RUN conda install -c intel mkl boost=1.61.0 glog gflags=2.1
RUN conda install -c conda-forge protobuf=3.2.0 hdf5 openblas
RUN pip install msgpack python-dateutil pytest scikit-image
RUN conda install -c mvn libsnappy
## install opencv3 caffe doesnot support opencv 4
RUN conda install -c menpo opencv3
RUN conda install -c bnoon leveldb=1.15

RUN git clone https://github.com/BVLC/caffe.git /usr/local/caffe

RUN bin/bash -c 'source activate caffe && cd /usr/local/caffe && mkdir build && cd build && \
	cmake -DPYTHON_INCLUDE_DIR=/usr/local/miniconda${'${PYTHON}'}/envs/caffe/include/python${'${PYTHON_VERSION}'} \
	-DPYTHON_INCLUDE_DIR2=/usr/local/miniconda${'${PYTHON}'}/envs/caffe/include/python${'${PYTHON_VERSION}'} \
	-DPYTHON_LIBRARY=/usr/local/miniconda${'${PYTHON}'}/envs/caffe/lib/libpython${'${PYTHON_VERSION}'}.so \
	-Dpython_version=${'${PYTHON}'} \
	-DUSE_CUDNN=1 \
	-DBLAS=Open \
	..  && \
	make -j"$(nproc)" all && \
	make install'

# Set up Caffe environment variables
ENV CAFFE_ROOT=/usr/local/caffe
ENV PYCAFFE_ROOT=$CAFFE_ROOT/python
ENV PYTHONPATH=$PYCAFFE_ROOT:$PYTHONPATH \
	PATH=$CAFFE_ROOT/build/tools:$PYCAFFE_ROOT:$PATH
RUN echo "$CAFFE_ROOT/build/lib" >> /etc/ld.so.conf.d/caffe.conf && ldconfig
ENV CONDA_DEFAULT_ENV base
`;
export default CAFFESCRIPT;