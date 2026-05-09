import { useNavigate } from "react-router-dom";
import Mainpropertyimg from "../../../../../assets/images/mainpropty.png";
import { browserRoutes } from "../../../../../routes/browserRoutes";

const Index = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-xl-6 mt-3">
        <img
          style={{ borderRadius: "5px" }}
          width="100%"
          height="100%"
          src={data?.thumbnail || Mainpropertyimg}
        />
      </div>
      <div className="col-xl-6">
        <div className="row">
          {data?.images?.slice(0, 4)?.map((imgg, i) => (
            <div className="col-xl-6 mt-3" key={i}>
              <img
                style={{ borderRadius: "5px" }}
                width="100%"
                height="100%"
                src={imgg}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="morePicture">
        <div
          className="d-flex justify-content-end virtualTour pointer"
          onClick={() =>
            navigate(
              `${browserRoutes.PROPERTIES_DETAILS}/${data?._id}/photos`,
              {
                state: {
                  data: data,
                },
              }
            )
          }
        >
          <span>{data?.images.length + 1} Images</span>
        </div>
        <div className="d-flex justify-content-end virtualTour pointer">
          <a target="_blank" href="https://realestatesamad.netlify.app/">
            Virtual Tour
          </a>
        </div>
      </div>
    </>
  );
};

export default Index;
