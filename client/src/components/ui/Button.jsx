function Button({ content, icon, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-amber-900 bg-amber-100 shadow-sm 
        hover:bg-amber-200 active:scale-95 transition-all duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{content}</span>
    </button>
  );
}

export default Button;
