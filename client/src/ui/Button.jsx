import { Link, useNavigate } from "react-router";

function Button({ to, children, type, disabled, className, onClick }) {
  const navigator = useNavigate();

  const base =
    className +
    " block text-base font-bold py-2 px-4 outline-none transition-all duration-300   ";

  const style = {
    primary:
      base +
      "rounded-full text-amber-50 bg-amber-500 hover:bg-amber-600/90 hover:box-shadow-lg focus:text-amber-50 focus:bg-amber-500 focus:box-shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-amber-800",
    back:
      base +
      "rounded text-amber-50 bg-amber-400 hover:bg-amber-500 focus:ring-2 focus:ring-offset-2 focus:ring-amber-400",
    submit:
      "bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-xl  disabled:bg-amber-500 disabled:cursor-not-allowed",
  };

  if (to == "-1") {
    return (
      <button onClick={() => navigator(-1)} className={style[type]}>
        {children}
      </button>
    );
  }

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  if (type == "submit") {
    return (
      <button type="submit" className={style[type]} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={style[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
