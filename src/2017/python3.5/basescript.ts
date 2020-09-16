const BASESCRIPT:string=`
FROM nvidia/cuda:8.0-cudnn6-devel-ubuntu14.04

ARG THEANO_VERSION=master
ARG TENSORFLOW_VERSION=1.4.1
ARG TENSORFLOW_ARCH=gpu
ARG KERAS_VERSION=1.0.8
ARG CAFFE_VERSION=master
ARG ANACONDA_VERSION=Miniconda3-4.2.12
ARG PYTHON=3
ARG PYTHON_VERSION=3.5

## remove broken cuda links 
RUN rm /etc/apt/sources.list.d/cuda.list && \
	rm /etc/apt/sources.list.d/nvidia-ml.list

## tensorflow unable to find libcupti.so.8.0
ENV LD_LIBRARY_PATH=/usr/local/cuda/extras/CUPTI/lib64/:${'${LD_LIBRARY_PATH}'}

## install basic dependencies
RUN apt-get update && apt-get install -y \
	curl \
    git \
    g++ \
    libssl-dev \
    software-properties-common \
    sudo \
    wget

# see https://docs.anaconda.com/anaconda/packages/oldpkglists/ to get compatibility with python x.x versions
# see https://repo.anaconda.com/miniconda/
RUN wget https://repo.anaconda.com/miniconda/${'${ANACONDA_VERSION}'}-Linux-x86_64.sh \
    && bash ${'${ANACONDA_VERSION}'}-Linux-x86_64.sh -b -p /usr/local/miniconda${'${PYTHON}'} \
    && rm -f ${'${ANACONDA_VERSION}'}-Linux-x86_64.sh
ENV PATH="/usr/local/miniconda${'${PYTHON}'}/bin:${'${PATH}'}"

# change default python environment to 3.5 & update to latest compatible versions
# RUN conda install -y python=3.5

## Required by theano & some useful packages
RUN conda install cmake cython numpy scipy python-dateutil scikit-image
RUN python -m pip install msgpack pydot-ng parameterized mako jupyter
`;
export default BASESCRIPT;