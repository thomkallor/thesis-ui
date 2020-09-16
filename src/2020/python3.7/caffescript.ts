const CAFFESCRIPT:string=`
## install cuda8.0
RUN wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/local_installers/cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
RUN yes | dpkg -i ./cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb
RUN apt-get update && apt-get install -y cuda-toolkit-8-0
RUN rm cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb

ENV LIBRARY_PATH="/usr/local/cuda/lib64:$LIBRARY_PATH"
ENV LD_LIBRARY_PATH="/usr/local/cuda/targets/x86_64-linux/lib/stubs:/usr/local/cuda-8.0/lib64:$LD_LIBRARY_PATH"
ENV PATH="/usr/local/cuda/bin:$PATH"

#CuDNN installation cudnn6
RUN wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn6_6.0.21-1+cuda8.0_amd64.deb && \
	wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn6-dev_6.0.21-1+cuda8.0_amd64.deb
RUN yes | dpkg -i ./libcudnn6_6.0.21-1+cuda8.0_amd64.deb && \
	yes | dpkg -i ./libcudnn6-dev_6.0.21-1+cuda8.0_amd64.deb
RUN apt-get update && apt-get install -y libcudnn6-dev
RUN rm libcudnn6_6.0.21-1+cuda8.0_amd64.deb && \
	rm libcudnn6-dev_6.0.21-1+cuda8.0_amd64.deb

## caffe needs gcc4
RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get update && apt-get install -y gcc-4.8 g++-4.8

RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 100 && \
	update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 75

RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 100 && \
	update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-7 75

## new environment for caffe
RUN conda create -n caffe python=3.5
ENV CONDA_DEFAULT_ENV caffe
RUN conda install cython cmake
RUN conda install -c intel mkl boost=1.61.0 glog gflags=2.1
RUN conda install -c conda-forge protobuf=3.2.0 hdf5 openblas lmdb
RUN pip install msgpack python-dateutil pytest scikit-image
RUN conda install -c mvn libsnappy
## install opencv3 caffe doesnot support opencv 4
RUN conda install -c menpo opencv3

RUN conda install -c bnoon leveldb=1.15

RUN git clone https://github.com/BVLC/caffe.git /usr/local/caffe

RUN bin/bash -c 'source activate caffe && cd /usr/local/caffe && mkdir build && cd build && \
	cmake -DPYTHON_INCLUDE_DIR=/usr/local/miniconda3/envs/caffe/include/python3.5m \
	-DPYTHON_INCLUDE_DIR2=/usr/local/miniconda3/envs/caffe/include/python3.5m \
	-DPYTHON_LIBRARY=/usr/local/miniconda3/envs/caffe/lib/libpython3.5m.so \
	-Dpython_version=3 \
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

RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 75 && \
	update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-7 100

RUN update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 75 && \
	update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-7 100

ENV CONDA_DEFAULT_ENV base
`;
export default CAFFESCRIPT;