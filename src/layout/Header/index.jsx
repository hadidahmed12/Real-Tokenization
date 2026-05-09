import React from "react";

import UserDropdown from "../../components/UserDropdown";
import { showSidebar } from "../../store/slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { HambergerIcon } from "../../components/Icons/Icons";

const Index = () => {
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="search-input">
        <HambergerIcon
          className={"hideIcon"}
          onClick={() => dispatch(showSidebar(true))}
        />
      </div>
      <div className="header-right">
        <UserDropdown />
      </div>
    </header>
  );
};

export default Index;
