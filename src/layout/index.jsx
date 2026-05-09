import { Outlet } from "react-router";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Footer from "./Footer/Index";

const Layout = () => {
  return (
    <>
      <>
        <Header />
        <>
          <Sidebar />
          <Outlet />
          <Footer />
        </>
      </>
    </>
  );
};

export default Layout;
