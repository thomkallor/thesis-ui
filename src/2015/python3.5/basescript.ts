const BASESCRIPT:string=`
FROM nvidia/cuda:8.0-cudnn6-devel-ubuntu14.04
ENV DEBIAN_FRONTEND=noninteractive

ARG THEANO_VERSION=rel-0.8.2
ARG TENSORFLOW_VERSION=0.6.0
ARG TENSORFLOW_ARCH=gpu
ARG LASAGNE_VERSION=master
ARG TORCH_VERSION=latest
ARG CAFFE_VERSION=latest
ARG PYTORCH_VERSION=0.3.0
ARG ANACONDA_VERSION=Miniconda3-4.2.12
ARG PYTHON=3
ARG PYTHON_VERSION=3.5

## remove broken cuda links 
RUN rm /etc/apt/sources.list.d/cuda.list && \
	rm /etc/apt/sources.list.d/nvidia-ml.list

## install basic dependencies
RUN apt-get update && apt-get install -y \
	curl \
    git \
    g++ \
    libssl-dev \
    software-properties-common \
    sudo \
    wget

## Dependencies of caffe and torch
RUN apt-get update && apt-get install -y \
		libgflags-dev \
		libgoogle-glog-dev \
		libleveldb-dev \
		liblmdb-dev \
		&& \
	apt-get clean && \
	apt-get autoremove && \
	rm -rf /var/lib/apt/lists/*

# conda required for pytorch installation
# see https://docs.anaconda.com/anaconda/packages/oldpkglists/ to get compatibility with python x.x versions
## https://repo.anaconda.com/miniconda/Miniconda3-4.2.12-Linux-x86_64.sh
RUN wget https://repo.anaconda.com/miniconda/${'${ANACONDA_VERSION}'}-Linux-x86_64.sh \
    && bash ${'${ANACONDA_VERSION}'}-Linux-x86_64.sh -b -p /usr/local/miniconda${'${PYTHON}'} \
    && rm -f ${'${ANACONDA_VERSION}'}-Linux-x86_64.sh
ENV PATH="/usr/local/miniconda${'${PYTHON}'}/bin:${'${PATH}'}"

# Add SNI support to Python
# install useful packages if not present
RUN python -m pip install \
		pyopenssl \
		ndg-httpsclient \
		pyasn1 \
		Cython \
		path.py \
		Pillow \
		jupyter \
		pygments \
		sphinx \
        wheel


# change default python environment to 3.5 & update to latest compatible versions
# RUN conda install -y python=3.5
# RUN conda update conda anaconda

## pytorch dependencies & useful softwares
RUN conda install -y numpy ninja scipy pyyaml mkl setuptools cmake cffi mkl-include scikit-image
`;
export default BASESCRIPT;