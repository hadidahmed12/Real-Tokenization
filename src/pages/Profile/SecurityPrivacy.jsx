import { GreaterIcons } from "../../components/Icons/Icons";
import { useNavigate } from "react-router-dom";
import { browserRoutes } from "../../routes/browserRoutes";
import Button from "../../components/Button/index";
import "./profile.css";

const SecurityAndPrivacy = () => {
  const navigate = useNavigate();

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
          <span className="fn3rf3r4567890 ml-2">Security and Privacy</span>
        </div>
      </div>
      <div className="col-md-7">
        <div className="my-2">
          <h2 className="privachead">Privacy</h2>
          <div className="profile-infoname-001 view-poli p-2">
            View Privacy Polciy
          </div>
        </div>
        <div>
          <h2 className="privachead">Security</h2>
          <div className="view-privacy my-2">
            <div>
              <svg
                width="53"
                height="53"
                viewBox="0 0 53 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="53" height="53" rx="8" fill="#00A3FF" />
                <path
                  d="M26.998 16C23.99 16 22.04 18.019 19.734 18.755C18.796 19.055 18.327 19.204 18.137 19.415C17.947 19.625 17.892 19.934 17.781 20.55C16.591 27.146 19.191 33.244 25.391 35.618C26.056 35.873 26.389 36 27.001 36C27.613 36 27.947 35.872 28.613 35.617C34.812 33.244 37.409 27.146 36.219 20.55C36.108 19.934 36.052 19.625 35.862 19.414C35.672 19.203 35.204 19.054 34.266 18.755C31.959 18.019 30.006 16 26.998 16Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25.2501 23.959C25.2501 23.899 25.2581 23.553 25.2601 23.119C25.2601 22.721 25.2261 22.339 25.4161 21.989C26.1261 20.575 28.1661 20.719 28.6701 22.159C28.7571 22.396 28.7631 22.771 28.7601 23.119C28.7571 23.562 28.7661 23.959 28.7661 23.959M25.3371 24.38C24.2571 24.38 23.7171 25.16 23.5971 25.64C23.4771 26.12 23.4771 27.86 23.5491 28.58C23.7891 29.48 24.3891 29.852 24.9771 29.972C25.5171 30.02 27.7971 30.002 28.4571 30.002C29.4171 30.02 30.1371 29.66 30.4371 28.58C30.4971 28.22 30.5571 26.24 30.4071 25.64C30.0891 24.68 29.2971 24.38 28.6971 24.38H25.3371Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h2 className="profile-infoname-001">
                Your security is our priority
              </h2>
              <p className="profile-infoname">
                We employ stringent measures, ensuring your money remains secure
                at all times.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="privachead">Enable Multi Factor Authentication</h2>
          <div className="">
            Each time you login, you will need an authenticator app to generate
            an one time code.
          </div>
          <Button text={"Setup 2FA"} className={"mt-2"} />
        </div>
      </div>
    </div>
  );
};

export default SecurityAndPrivacy;
