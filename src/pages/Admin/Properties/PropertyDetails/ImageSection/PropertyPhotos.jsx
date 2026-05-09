import { Link, useLocation } from "react-router-dom";
import { RightArrow } from "../../../../../components/Icons/Icons";
import { browserRoutes } from "../../../../../routes/browserRoutes";

const PropertyDetailsPhotos = () => {
  const state = useLocation();
  const data = state?.state?.data;
  return (
    <>
      <div className="container-fluid main-container">
        <div className="main-title-09888 pt-3">
          <Link to={browserRoutes.PROPERTIES} className="noStyle">
            Properties
          </Link>
          <span className="prpoperty-details-98 pl-2">
            <span>
              <RightArrow />
            </span>{" "}
            <Link
              to={`${browserRoutes.PROPERTIES_DETAILS}/${data?._id}`}
              className="noStyle"
            >
              {" "}
              {data?.type === "bed"
                ? data?.numberOfBed + " bed in " + data?.location
                : "Studio in " + data?.location}
            </Link>
            <span>
              <RightArrow />
            </span>{" "}
            Photos
          </span>
        </div>
        <div className="row mt-3">
          <div className="col-lg-6 col-md-12 mb-3">
            <img
              style={{ borderRadius: "5px" }}
              width="100%"
              height="100%"
              className="img-fluid"
              src={data?.thumbnail}
              alt="Property Thumbnail"
            />
          </div>

          {data?.images?.map((imgg, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 col-12 mb-3"
              key={index}
            >
              <img
                style={{ borderRadius: "5px" }}
                width="100%"
                height="100%"
                className=""
                src={imgg}
                alt={`Property Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyDetailsPhotos;
