import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ icon, text, href }) => {
  const [isOpen, setIsOpen] = useState(true);

  let location = useLocation();

  return (
    <NavLink
      style={{ display: isOpen ? "block" : "none" }}
      to={href}
      className={` ${
        location.pathname.includes(href)
          ? "sidebar-item-active"
          : "sidebar-item"
      }`}
    >
      {icon}

      <li className="" style={{ display: isOpen ? "block" : "none" }}>
        {text}
      </li>
      <li>444</li>
    </NavLink>
  );
};

export default SidebarItem;
