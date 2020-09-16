const LUATORCHSCRIPT:string=`
# Install Torch
RUN git clone --recursive https://github.com/torch/distro.git /usr/local/torch && \
	cd /usr/local/torch && \
	bash install-deps && \
	yes | bash ./install.sh
	
# Export the LUA evironment variables manually
ENV LUA_PATH='/usr/local/.luarocks/share/lua/5.1/?.lua;/usr/local/.luarocks/share/lua/5.1/?/init.lua;/usr/local/torch/install/share/lua/5.1/?.lua;/usr/local/torch/install/share/lua/5.1/?/init.lua;./?.lua;/usr/local/torch/install/share/luajit-2.1.0-beta1/?.lua;/usr/local/share/lua/5.1/?.lua;/usr/local/share/lua/5.1/?/init.lua' \
	LUA_CPATH='/usr/local/.luarocks/lib/lua/5.1/?.so;/usr/local/torch/install/lib/lua/5.1/?.so;./?.so;/usr/local/lib/lua/5.1/?.so;/usr/local/lib/lua/5.1/loadall.so' \
	PATH=/usr/local/torch/install/bin:$PATH \
	LD_LIBRARY_PATH=/usr/local/torch/install/lib:$LD_LIBRARY_PATH \
	DYLD_LIBRARY_PATH=/usr/local/torch/install/lib:$DYLD_LIBRARY_PATH
ENV LUA_CPATH='/usr/local/torch/install/lib/?.so;$LUA_CPATH'

# Install the latest versions of nn, cutorch, cunn, cuDNN bindings and iTorch
RUN luarocks install nn && \
	luarocks install cutorch && \
	luarocks install cunn && \
    luarocks install loadcaffe

RUN cd /usr/local && git clone https://github.com/soumith/cudnn.torch.git && cd cudnn.torch && \
	git checkout R4 && \
	luarocks make

# Install the latest version of iTorch and its dependencies
RUN	luarocks install lbase64 && \
	luarocks install luacrypto && \
	luarocks install uuid && \
	luarocks install lzmq

RUN	cd /usr/local && git clone https://github.com/facebook/iTorch.git && \
	cd iTorch && \
	luarocks make
`;
export default LUATORCHSCRIPT;