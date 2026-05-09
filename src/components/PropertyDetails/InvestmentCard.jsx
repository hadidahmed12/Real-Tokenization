import Skeleton from "react-loading-skeleton";
import { BedIcon, RentedIcon, TagenmIcon } from "../Icons/Icons";
import "react-loading-skeleton/dist/skeleton.css";
import { browserRoutes } from "../../routes/browserRoutes";
import { useNavigate } from "react-router-dom";
import StatuesBaseCard from "./StatuesBaseCard";
import { useGetUser } from "../../hooks/useProfile";
import useRole from "../../hooks/useRole";

const InvestmentCard = ({ data, isLoading }) => {
  const { user } = useGetUser();
  const role = useRole();
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    if (role === "admin") {
      navigate(`${browserRoutes.PROPERTIES_DETAILS}/${data?._id}`);
    } else if (role === "user" && user?.isKycApproved) {
      navigate(`${browserRoutes.PROPERTIES_DETAILS}/${data?._id}`);
    } else {
      navigate(browserRoutes.USER_KYC);
    }
  };

  if (isLoading) {
    return (
      <div className="investment-card">
        <Skeleton height={200} width="100%" />
        <div className="investment-card-info">
          <Skeleton height={20} width="80%" />
          <Skeleton height={20} width="60%" className="mt-2" />
          <Skeleton height={15} width="40%" className="mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="investment-card position-relative" onClick={handleClick}>
      {!user?.isKycApproved && role === "user" && (
        <div className="kyc-overlay">
          <svg
            className="lock-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 10V8C6 4.69 7 2 12 2C16.5 2 18 4 18 7"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <img
        src={data?.thumbnail}
        alt="Property"
        className="investment-card-image "
      />
      <div className={`investment-card-info`}>
        <div className="d-flex mb-3">
          {data?.type === "bed" && (
            <div className="d-flex align-items-center mr-3">
              <BedIcon />
              <p className="cart-detail-09 ml-1">{data?.numberOfBed || "-"}</p>
            </div>
          )}

          <div className="d-flex align-items-center">
            <RentedIcon />
            <p className="cart-detail-09 ml-1">{data?.status || "-"}</p>
          </div>
          <div className="d-flex align-items-center ml-3">
            <TagenmIcon />
            <p className="cart-detail-09 ml-1">
              #{data?.propertyNumber || "-"}
            </p>
          </div>
          <div className="d-flex align-items-center ml-3">
            <TagenmIcon />
            <p className="cart-detail-09 ml-1">{data?.size || "-"} Sq.Ft</p>
          </div>
        </div>
        <h3 className="investment-card-location">
          {data?.type === "bed"
            ? data?.numberOfBed + " bed in " + data?.location
            : "Studio in " + data?.location}
        </h3>
        <div className="d-flex justify-content-between mt-2">
          <p className="investment-card-price">USDT {data?.price || "-"}</p>
          <p className="investment-card-investors">
            {data?.totalInvestorCount || "0"} Investors
          </p>
        </div>
        <div className="investment-card-details mt-3">
          <StatuesBaseCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
