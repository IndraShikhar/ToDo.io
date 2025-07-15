import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

function Protected({ children }) {
  const { isLoggedIn } = useAuth();

  const navigator = useNavigate();

  useEffect(
    function () {
      if (!isLoggedIn) {
        navigator("/login");
      }
    },
    [isLoggedIn, navigator]
  );

  return <>{children}</>;
}

export default Protected;
