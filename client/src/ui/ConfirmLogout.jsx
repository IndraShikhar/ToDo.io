import { useNavigate } from "react-router";
import OverLay from "./OverLay";
import Cookie from "js-cookie";
import { useAuth } from "../contexts/AuthContext";

function ConfirmLogout({ handleLogoutCancle }) {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  function handleConfirmLogout() {
    Cookie.remove("jwt");
    dispatch({ type: "logout" });
    // setLoggedIn(false);
    navigate("/");
  }

  return (
    <>
      <OverLay onClick={handleLogoutCancle} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white rounded-3xl shadow-xl p-8 w-[90%] max-w-md flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-amber-900 text-center">
          Are you sure you want to logout?
        </h2>
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleLogoutCancle}
            className="px-4 py-2 rounded-lg border-2 border-amber-900 text-amber-900 font-semibold hover:bg-amber-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLogout}
            className="px-4 py-2 rounded-lg bg-amber-900 text-white font-semibold hover:bg-amber-800 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmLogout;
