import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  GreaterIcons,
  PrefenceIcon,
  ProfileIcon,
  ReferalIcon,
  SecuirtyIcon,
  TeSupportIcon,
} from "../../components/Icons/Icons";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";
import { useGetUser } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { browserRoutes } from "../../routes/browserRoutes";
import { emptyCart } from "../../store/slices/cartSlice";

const AccountInformation = () => {
  const { user, isLoading, error } = useGetUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    dispatch(setUser({}));
    dispatch(emptyCart());
  };

  return (
    <div className="container-fluid main-container">
      <div className="d-flex align-items-center mt-5">
        <h2
          className="main-title-09888 pt-3 mr-2 pointer"
          onClick={() => navigate(browserRoutes.PROFILE)}
        >
          Profile
        </h2>
        <div className="mt-4">
          <GreaterIcons />
          <span className="fn3rf3r4567890 ml-2">Account Information</span>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 mt-3">
          <div className="profile-info-0012">
            <div className="d-flex justify-content-between">
              <p className="profile-infoname">Name</p>
              <h5 className="profile-infoname-001">{user?.fullName || "-"}</h5>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <p className="profile-infoname">Email</p>
              <h5 className="profile-infoname-001">{user?.email || "-"}</h5>
            </div>{" "}
            <div className="d-flex justify-content-between mt-3">
              <p className="profile-infoname">Phone Number</p>
              <h5 className="profile-infoname-001">
                {user?.phoneNumber || "-"}
              </h5>
            </div>{" "}
            <div className="d-flex justify-content-between mt-3">
              <p className="profile-infoname">Investor Type</p>
              <h5 className="profile-infoname-001">Retail</h5>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mt-3">
              <div>
                <h5 className="profile-infoname-001 mt-3">
                  Need Help Updating Information?
                </h5>
              </div>
              <div>
                <button className="support-btn d-flex align-items-center">
                  {" "}
                  <span>
                    <TeSupportIcon />
                  </span>
                  <span className="ml-2"> Help And Support</span>
                </button>
              </div>
            </div>
          </div>
          <button className="logoutbtnm mt-3" onClick={logoutUser}>
            Logout
          </button>
          <button className="logoutbtnm-001 mt-3">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
