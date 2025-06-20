import { useRouteError } from "react-router";
import Button from "../ui/Button";

function Error() {
  const error = useRouteError();

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold">Something went wrong!!!</h1>
      <p className="inline-block text-red-50 bg-red-400 px-2 py-1 mt-4 mb-6 rounded wrap-break-word w-auto">
        💥{error?.data ? error.data : error.message}
      </p>
      <Button to="-1" type="back">
        &larr; Go Back
      </Button>
    </div>
  );
}

export default Error;
