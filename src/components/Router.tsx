import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Ships } from "./ships/ships";
import { ShipDetail } from "./shipDetail/ship-detail";

const routes = [
  {
    path: "/",
    element: <Ships />,
    children: [
      {
        path: "view/:shipId",
        element: <ShipDetail />,
      },
    ],
  },
];

const clientRouter = createBrowserRouter(routes);

export const CSRApp = () => {
  if (typeof document === "undefined") {
    return <StaticRouter location={"/"} />;
  }

  return <RouterProvider router={clientRouter} />;
};
