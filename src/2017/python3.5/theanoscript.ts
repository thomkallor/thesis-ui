const THEANOSCRIPT:string=`
RUN git clone https://github.com/Theano/libgpuarray.git /usr/local/libgpuarray
RUN cd /usr/local/libgpuarray && git checkout tags/v0.7.6 -b v0.7.6
RUN cd /usr/local/libgpuarray && mkdir Build && cd Build && \
    cmake .. -DCMAKE_BUILD_TYPE=Release && \
    make && make install
RUN cd /usr/local/libgpuarray && python setup.py build && python setup.py install 
RUN ldconfig

# Install Theano
RUN python -m pip --no-cache-dir install git+git://github.com/Theano/Theano.git@${'${THEANO_VERSION}'}

## set theano default to cuda
ENV THEANO_FLAGS=mode=FAST_RUN,device=cuda,floatX=float32
`;
export default THEANOSCRIPT;