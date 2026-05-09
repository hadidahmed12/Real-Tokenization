import { useState } from "react";
import { RightArrow } from "../../../../components/Icons/Icons";
import useRole from "../../../../hooks/useRole";
import { ROLES } from "../../../../constant/roles";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProperty,
  useGetSingleProperty,
} from "../../../../hooks/useProperties";
import { browserRoutes } from "../../../../routes/browserRoutes";
import Overview from "./Overview/Index";
import Calculator from "./Calculator/Calculator";
import Button from "../../../../components/Button/index";
import DeleteModal from "../../../../components/Modals/DeleteModal";
import ImageSection from "./ImageSection/Index";

const PropertyDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleProperty(id);
  const navigate = useNavigate();
  const role = useRole();
  const { mutate: deleteProperty, isLoading: isDeleting } = useDeleteProperty();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (id) {
      deleteProperty(id, {
        onSuccess: () => {
          setShowDeleteModal(false);
          navigate(browserRoutes.PROPERTIES);
        },
        onError: (error) => {
          console.error("Error deleting property:", error);
        },
      });
    } else {
      console.error("Property ID is undefined or invalid.");
    }
  };

  return (
    <div className="container-fluid main-container">
      <div className="d-flex justify-content-between">
        <div className="main-title-09888 pt-3">
          <Link to={browserRoutes.PROPERTIES} className="noStyle">
            Properties
          </Link>
          <span className="prpoperty-details-98 pl-2">
            <span>
              <RightArrow />
            </span>{" "}
            {/* 1 Bed in 15 Northside, Business Bay */}
            {data?.data?.data?.type === "bed"
              ? data?.data?.data?.numberOfBed +
                " bed in " +
                data?.data?.data?.location
              : "Studio in " + data?.data?.data?.location}
          </span>
        </div>
        {role === ROLES.ADMIN &&
          !data?.data?.data?.isTokenCreated &&
          !data?.data?.data?.isRemoved && (
            <div className="d-flex">
              <button
                type="submit"
                className="savedraftbtrn mt-4"
                onClick={() =>
                  navigate(`${browserRoutes.UPDATE_PROPERTIES}/${id}`)
                }
              >
                Edit Property
              </button>
              <div className="ml-3">
                <Button
                  className="walletbtn-0993 mt-4"
                  text={isDeleting ? "Deleting..." : "Delete Property"}
                  onClick={() => setShowDeleteModal(true)}
                />
              </div>
            </div>
          )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Property"
          description="Are you sure you want to delete this property? This action cannot be undone."
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}
      <div className="row mt-5 position-relative">
        <ImageSection data={data?.data?.data} />
      </div>

      <div className="row mt-5">
        <div className="col-xl-7">
          <Overview data={data?.data?.data} />{" "}
        </div>
        <div className="col-xl-5">
          <Calculator data={data?.data?.data} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
