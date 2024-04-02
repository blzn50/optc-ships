import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Ships } from "./ships/ships";
import { ShipDetail } from "./shipDetail/ship-detail";
import { Toaster } from "./ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Ships />
        <Toaster />
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
