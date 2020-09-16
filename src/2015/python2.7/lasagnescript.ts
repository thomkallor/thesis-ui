const LASAGNESCRIPT:string=`
# Install lasagne
RUN pip --no-cache-dir install git+git://github.com/Lasagne/Lasagne.git@${'${LASAGNE_VERSION}'}
`;
export default LASAGNESCRIPT;
