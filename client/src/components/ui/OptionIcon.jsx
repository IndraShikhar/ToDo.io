function OptionIcon({ icon }) {
  return (
    <div className="cursor-pointer scale-80 hover:scale-105 bg-amber-500 p-2 rounded-full transform transition-all duration-300 active:scale-100">
      {icon}
    </div>
  );
}

export default OptionIcon;
