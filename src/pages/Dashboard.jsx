import { useState } from "react";
import InvestmentCard from "../components/PropertyDetails/InvestmentCard.jsx";
import { useGetAllProperty } from "../hooks/useAuth.js";
import Input from "../components/Input";
import Paginate from "../components/Pagination/Index.jsx";
import { SearchIcon } from "../components/Icons/Icons.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStatus } from "../store/slices/propertySlice.js";

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState("available");
  const activeTab = useSelector((state) => state?.property?.activeStatus);

  const [query, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useGetAllProperty(
    activeTab,
    skip,
    10,
    query,
    false
  );

  const dispatch = useDispatch();

  const handleTabClick = (index) => {
    setSkip(0);
    dispatch(setActiveStatus(index));
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-3">Properties</h2>
        <div className="tab-buttons mt-4">
          {["available", "funded", "exited"].map((tab) => (
            <p
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={activeTab === tab ? "activess" : "nonactivetabs"}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </p>
          ))}
        </div>
        <div className="row">
          {/* {data?.data?.length > 0 && ( */}
          <div className="col-xl-4 mt-4 position-relative">
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
          {/* )} */}
        </div>
        <div className="row">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div className="col-xl-4 mt-4 " key={index}>
                <InvestmentCard isLoading />
              </div>
            ))
          ) : data?.data?.length > 0 ? (
            data?.data?.map((property, index) => (
              <div className="col-xl-4 mt-4 pointer" key={index}>
                <InvestmentCard data={property} />
              </div>
            ))
          ) : (
            <div className="col-12 d-flex align-items-center justify-content-center my-3">
              <p className="nodata">
                No properties available for this category.
              </p>
            </div>
          )}
        </div>
        <div className="row d-flex justify-content-center ">
          {data?.data?.length > 0 && (
            <div className="mt-4">
              <Paginate setSkip={setSkip} data={data} skip={skip} limit={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
