import { useRouteError } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

const ErrorPage = () => {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <div id="error-page" className="container">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
