import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InvestmentCard from "../../../components/PropertyDetails/InvestmentCard.jsx";
import Input from "../../../components/Input";
import PropertyCardSkeleton from "../../../components/Skeleton/PropertyCardSkeleton.jsx";
import Paginate from "../../../components/Pagination/Index.jsx";
import { useGetAllProperty } from "../../../hooks/useAuth.js";
import { browserRoutes } from "../../../routes/browserRoutes.js";
import { SearchIcon } from "../../../components/Icons/Icons.jsx";

const Properties = () => {
  const [activeTab, setActiveTab] = useState("Listed");
  const [query, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useGetAllProperty(
    "available",
    skip,
    10,
    query,
    activeTab === "Removed" ? true : false
  );

  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <PropertyCardSkeleton />;
  }

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-xl-6 mt-4 position-relative">
          <SearchIcon />
          <Input
            htmlFor="search"
            placeholder="Search"
            type="text"
            className="pl-5"
            value={query}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div className="main-title-09888 pt-3">Properties</div>
          <div className="">
            <button
              className="creat-tokenadmin0 pointer mt-3 mr-3"
              onClick={() => navigate(browserRoutes.CREATE_PROPERTIES)}
            >
              Create Property
            </button>
            {/* <button
              className="creat-tokenadmin0 pointer mt-3"
              onClick={() => navigate(browserRoutes.DRAFT_PROPERTIES)}
            >
              Draft Properties
            </button> */}
          </div>
        </div>
        <div className="tab-buttons mt-4">
          <p
            onClick={() => {
              handleTabClick("Listed");
              setSkip(0);
            }}
            className={activeTab === "Listed" ? "activess" : "nonactivetabs"}
          >
            {" "}
            Listed
          </p>

          <p
            onClick={() => {
              handleTabClick("Removed");
              setSkip(0);
            }}
            className={activeTab === "Removed" ? "activess" : "nonactivetabs"}
          >
            Removed
          </p>
        </div>

        {!isLoading && (
          <>
            <div className="row">
              {data?.data?.length > 0 ? (
                data?.data?.map((property, index) => (
                  <div className="col-xl-4 mt-4 pointer" key={index}>
                    <div className="tab-content">
                      <InvestmentCard data={property} isLoading={isLoading} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 my-3">
                  <p className="nodata">
                    No properties available for this category.
                  </p>
                </div>
              )}
            </div>
            <div className="row d-flex justify-content-center ">
              {data?.data?.length > 0 && (
                <div className="mt-4">
                  <Paginate
                    setSkip={setSkip}
                    data={data}
                    skip={skip}
                    limit={10}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
