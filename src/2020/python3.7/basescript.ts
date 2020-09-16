const BASESCRIPT:string = `
FROM nvidia/cuda:10.1-cudnn7-devel-ubuntu18.04

ARG TENSORFLOW_VERSION=2.2.0
ARG TENSORFLOW_ARCH=gpu
ARG CAFFE_VERSION=master
ARG ANACONDA_VERSION=Miniconda3
ARG PYTORCH_VERSION=1.5.1

## install basic dependencies
RUN apt-get update && apt-get install -y \
	curl \
    git \
    g++ \
    libssl-dev \
    software-properties-common \
    sudo \
    wget

RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && bash Miniconda3-latest-Linux-x86_64.sh -b -p /usr/local/miniconda3\
    && rm -f Miniconda3-latest-Linux-x86_64.sh
ENV PATH="/usr/local/miniconda3/bin:${'${PATH}'}"
`;
export default BASESCRIPT;