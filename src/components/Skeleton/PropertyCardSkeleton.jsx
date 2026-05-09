import React from "react";
import Skeleton from "react-loading-skeleton";

const PropertyCardSkeleton = () => {
  return (
    <div className="container-fluid main-container">
      <div className="row">
        {[...Array(5)].map((_, index) => (
          <div
            className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mt-4 position-relative"
            key={index}
          >
            <div className="investment-card">
              <Skeleton height={200} width="100%" />
              <div className="investment-card-info">
                <Skeleton height={20} width="80%" />
                <Skeleton height={20} width="60%" className="mt-2" />
                <Skeleton height={15} width="40%" className="mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
