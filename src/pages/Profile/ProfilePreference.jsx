import { GreaterIcons } from "../../components/Icons/Icons";
import FormSelect from "./FormSelect";
import { useGetUser } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { browserRoutes } from "../../routes/browserRoutes";
import "./profile.css";

const ProfilePreference = () => {
  const { user } = useGetUser();
  // const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     const languageData = user?.language;

  //     if (Array.isArray(languageData)) {
  //       setLanguages(languageData);
  //     } else if (typeof languageData === "string") {
  //       setLanguages([languageData]);
  //     } else {
  //       console.error("Unexpected data format for languages:", languageData);
  //       setLanguages([]);
  //     }
  //   }
  // }, [user]);

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
          <span className="fn3rf3r4567890 ml-2">Preferences</span>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 mt-3">
          <div className="profile-info-0012">
            <div className="row">
              <div className="col-xl-7">
                <p className="profile-infoname mt-2">
                  <span></span>Language
                </p>
              </div>
              <div className="col-xl-5">
                <FormSelect value={"English"} options={["English"]} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-xl-7">
                <p className="profile-infoname mt-2">
                  <span></span>Currency
                </p>
              </div>
              <div className="col-xl-5">
                <FormSelect value={"USDT"} options={["USDT"]} />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-xl-7">
                <p className="profile-infoname mt-2">
                  <span></span>Investment Preferences
                </p>
              </div>
              <div className="col-xl-5">
                <FormSelect
                  value={"Unselected"}
                  options={["Selected", "Unselected"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreference;
