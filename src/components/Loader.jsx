export default function Loader() {
  return (
    <div className="loader-container absolute inset-0 flex justify-center items-center text-orange-500 font-bold tracking-widest text-lg">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}
