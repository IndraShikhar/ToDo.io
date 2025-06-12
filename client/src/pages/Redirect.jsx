import { useEffect } from "react";
import { useNavigate } from "react-router";

function Redirect({ page }) {
  const navigator = useNavigate();

  useEffect(() => {
    navigator(`/${page}`);
  }, [navigator, page]);

  return (
    <div className=" w-full h-screen bg-amber-50 flex justify-center items-center">
      <p className="text-4xl font-bold">Redirecting...</p>
    </div>
  );
}

export default Redirect;
