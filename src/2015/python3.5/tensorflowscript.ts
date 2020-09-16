const TENSORFLOWSCRIPT:string=`
## install cuda 7.0 and cudnn6.5 for tensorflow
RUN wget http://developer.download.nvidia.com/compute/cuda/7_0/Prod/local_installers/rpmdeb/cuda-repo-ubuntu1410-7-0-local_7.0-28_amd64.deb
RUN yes | dpkg -i ./cuda-repo-ubuntu1410-7-0-local_7.0-28_amd64.deb
RUN apt-get update && apt-get install -y cuda-toolkit-7-0
RUN rm cuda-repo-ubuntu1410-7-0-local_7.0-28_amd64.deb
ENV LD_LIBRARY_PATH=/usr/local/cuda-7.0/lib64:$LD_LIBRARY_PATH

RUN git clone https://github.com/thomkallor/cudnn-6.5.git /usr/local/cudnn-6.5
ENV LD_LIBRARY_PATH=/usr/local/cudnn-6.5:$LD_LIBRARY_PATH

## require bazel 0.1.1 for tensorflow build
## use if you have to build from source
## build flaky and very long not recommended use wheel file if available
# RUN wget https://github.com/bazelbuild/bazel/releases/download/0.1.1/bazel-0.1.1-installer-linux-x86_64.sh
# RUN add-apt-repository ppa:openjdk-r/ppa
# RUN apt-get update && apt-get install -y \
#     bash-completion \
#     openjdk-8-jdk \
#     zip \
#     unzip \
#     swig 
# RUN sudo bash ./bazel-0.1.1-installer-linux-x86_64.sh
# RUN rm ./bazel-0.1.1-installer-linux-x86_64.sh

##configure tensorflow
# RUN git clone https://github.com/thomkallor/tensorflow.git
# RUN cd tensorflow && git checkout "v$TENSORFLOW_VERSION"
# RUN cd tensorflow &&  git submodule update --init --recursive

# ## link no longer exists had to cahe in manually
# RUN wget http://www.ijg.org/files/jpegsrc.v9a.tar.gz && \
# 	wget https://sourceforge.net/projects/libpng/files/libpng12/older-releases/1.2.53/libpng-1.2.53.tar.gz
# RUN mkdir --parents /root/.cache/bazel/_bazel_root/68a62076e91007a7908bc42a32e4cff9/external/jpeg_archive && \
# 	mkdir --parents /root/.cache/bazel/_bazel_root/68a62076e91007a7908bc42a32e4cff9/external/png_archive
# RUN cp jpegsrc.v9a.tar.gz /root/.cache/bazel/_bazel_root/68a62076e91007a7908bc42a32e4cff9/external/jpeg_archive && \
# 	cp libpng-1.2.53.tar.gz /root/.cache/bazel/_bazel_root/68a62076e91007a7908bc42a32e4cff9/external/png_archive
# RUN rm jpegsrc.v9a.tar.gz && rm libpng-1.2.53.tar.gz
# # not needed
# RUN cd tensorflow && git pull origin "v$TENSORFLOW_VERSION"
# COPY tfsettings.txt /root
# RUN cd tensorflow && cat /root/tfsettings.txt | ./configure

# RUN cd tensorflow && bazel build --verbose_failures --local_resources 4096,4.0,1.0 -c opt --config=cuda //tensorflow/tools/pip_package:build_pip_package

# RUN cd tensorflow && bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg
# RUN python -m pip install "/tmp/tensorflow_pkg/tensorflow-0.6.0-py3-none-any.whl"

RUN git clone https://github.com/thomkallor/tensorflow-0.6.0-py3.5.git
RUN cd tensorflow-0.6.0-py3.5 && python -m pip install tensorflow-0.6.0-py3-none-any.whl
RUN rm -rf tensorflow-0.6.0-py3.5
`;
export default TENSORFLOWSCRIPT;