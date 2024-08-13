function Error({errorName}) {
  return (
    <p className=" ring ring-white ring-offset-8 ring-offset-orange-300 text-center  font-bold py-4 px-12 tracking-wide bg-white rounded-full text-orange-300
  sm:ring-offset-4
  md:ring-offset-6 md:ring-offset-orange-300
  lg:text-xl lg:px-16
  xl:text-2xl xl:px-20">
    {errorName}
    </p>
  );
}

export default Error;


