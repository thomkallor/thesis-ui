const PYTORCHSCRIPT:string=`
# Add LAPACK support for the GPU
RUN conda install -c soumith magma-cuda80

## pytorch installation
RUN git clone https://github.com/pytorch/pytorch.git
RUN cd pytorch && git checkout "v$PYTORCH_VERSION"
RUN cd pytorch && git submodule sync && git submodule update --init --recursive
RUN python -m pip install pathlib
RUN export CMAKE_PREFIX_PATH=${'${CONDA_PREFIX:-"$(dirname $(which conda))/../"}'}
RUN cd pytorch && python setup.py install
RUN rm -rf pytorch

## can be used if torchvision is needed
## RUN python -m pip install torchvision==0.1.9
`;
export default PYTORCHSCRIPT;