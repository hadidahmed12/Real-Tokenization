import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constant/roles";
import { browserRoutes } from "../../routes/browserRoutes";
import { UserProfiletwo, HeaderProfileIcon } from "../Icons/Icons";
import useRole from "../../hooks/useRole";

const Index = () => {
  const role = useRole();
  const navigate = useNavigate();
  const refOutside = useRef(null);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleProfile = () => {
    if (role === ROLES.USER) {
      navigate(browserRoutes.PROFILE);
    } else {
      dispatch(setToken(""));
      localStorage.clear();
      navigate(browserRoutes.LOGIN);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = ({ target }) => {
    if (!refOutside?.current?.contains(target)) {
      setDropdown(false);
    }
  };

  return (
    <div>
      {role === ROLES.USER ? (
        <div className="loggedin-user" onClick={handleProfile}>
          <HeaderProfileIcon />
        </div>
      ) : (
        <div ref={refOutside} style={{ position: "relative" }}>
          <div className="loggedin-user" onClick={() => setDropdown(!dropdown)}>
            <HeaderProfileIcon />
          </div>
          {dropdown && (
            <div className="notification-expandedtwo">
              <div direction="horizontal" className="notification-header">
                <div className="d-flex justify-content-center pt-2"></div>
              </div>
              <div className="d-flex pl-3 py-1 rewrewr">
                <h2 className="profile-h2">{"Hi Admin"}</h2>
              </div>
              <div className="d-flex pl-3 py-1 rewrewr">
                <p className="profile-p">{"Email"}</p>
              </div>
              <hr />
              <div className="bottom-profile-section pb-3 pl-3">
                <p
                  onClick={handleProfile}
                  className="profile-p2 cursor-pointer"
                >
                  {" "}
                  <span className="pr-2">
                    {" "}
                    <UserProfiletwo />{" "}
                  </span>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
