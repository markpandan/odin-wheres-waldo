import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./main.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from "./routes/home";
import Highscores from "./routes/highscores";
import Games from "./routes/games";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "highscores",
        element: <Highscores />,
      },
      {
        path: "games/:gameId",
        element: <Games />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
