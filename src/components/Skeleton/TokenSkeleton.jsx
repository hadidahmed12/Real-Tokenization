import React from "react";
import Skeleton from "react-loading-skeleton";

const TokenSkeleton = () => {
  return (
    <div className="mt-3 token-cardlidsting position-relative">
      <div>
        <Skeleton height={20} width={30} className="ml-3" />
      </div>
      <div className="d-flex">
        <div>
          <Skeleton height={60} width={60} borderRadius="50%" />
        </div>
        <div className="my-auto mx-2">
          <Skeleton height={20} width={100} />
        </div>
      </div>
      <div>
        <Skeleton height={20} width={80} />
      </div>
      <div>
        <Skeleton height={20} width={100} />
      </div>
      <div>
        <Skeleton height={20} width={150} />
      </div>
      <div>
        <h1 className="maintokensaleadmin">
          <Skeleton height={20} width={100} />
        </h1>
      </div>
      <div>
        <Skeleton height={30} width={150} />
      </div>
    </div>
  );
};

export default TokenSkeleton;
