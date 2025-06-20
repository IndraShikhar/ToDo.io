function OverLay({ onClick }) {
  return (
    <div
      className=" fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 flex justify-center items-center"
      onClick={onClick}
    ></div>
  );
}

export default OverLay;
