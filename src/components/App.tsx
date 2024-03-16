import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Ships } from "./ships/ships";
import { ShipDetail } from "./shipDetail/ship-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Ships />
        {/* Outlet needs to be inside root path to work*/}
        <Outlet />
      </>
    ),
    children: [
      {
        path: "view/:shipId",
        element: <ShipDetail />,
      },
    ],
  },
]);

export default () => <RouterProvider router={router} />;
