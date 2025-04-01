import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navigation";
import c from "./Layout.module.css";

export const Layout = () => {
  return (
    <div id={c.layout}>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
