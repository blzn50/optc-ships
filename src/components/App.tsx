import { Outlet } from "react-router-dom";
import { Ships } from "./ships/ships";

export const App = () => {
  return (
    <>
      <Ships />
      <Outlet />
    </>
  );
};
