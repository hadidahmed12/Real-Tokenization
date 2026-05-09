import {
  PrefenceIcon,
  ProfileIcon,
  ReferalIcon,
  SecuirtyIcon,
} from "../../components/Icons/Icons";
import ProfileCard from "./ProfileCard";
import { browserRoutes } from "../../routes/browserRoutes";
import "./profile.css";

const Profile = () => {
  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-3">Profile</h2>
      </div>
      <div className="row">
        <div className="col-xl-4 mt-3">
          <ProfileCard
            path={browserRoutes.ACCOUNT_INFORMATION}
            icon={<ProfileIcon />}
            title={"Account Information"}
            description={"View and Manage Your Personal Details"}
          />
        </div>
        <div className="col-xl-4 mt-3">
          <ProfileCard
            path={browserRoutes.ACCOUNT_PREFERENCE}
            icon={<PrefenceIcon />}
            title={"Preferences"}
            description={"Customize Language, Currency and Notification"}
          />
        </div>
        <div className="col-xl-4 mt-3">
          <ProfileCard
            path={browserRoutes.SECURITY_PRIVACY}
            icon={<SecuirtyIcon />}
            title={"Security and Privacy"}
            description={"Setup Additional Security For Your Account"}
          />
        </div>
        <div className="col-xl-4 mt-3">
          <ProfileCard
            path={browserRoutes.RAFER_A_FRIEND}
            icon={<ReferalIcon />}
            title={"Refer a Friend"}
            description={"Refer a Friend & Earns Rewards"}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
