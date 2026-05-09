import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import { useAllKycRequest, useUpdateStatus } from "../../../hooks/useKyc";
import FormSelect from "../../Profile/FormSelect";
import { capitiliseFirstLetter } from "../../../utils/captiliseFirstLetter";
import Userprofile from "../../../assets/images/userprofile.png";
import KycModal from "../../../components/Modals/KycModal";
import { useState } from "react";
import Input from "../../../components/Input";
import Paginate from "../../../components/Pagination/Index";
import { SearchIcon } from "../../../components/Icons/Icons";

const KYC = () => {
  const { mutate } = useUpdateStatus();
  const [show, setShow] = useState(false);
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [query, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useAllKycRequest(skip, query);

  const handleViewImages = (data) => {
    setFrontImage(data?.kycFrontImage);
    setBackImage(data?.kycBackImage);
    setShow(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangeStatus = (status, user) => {
    if (status !== "Select status") {
      if (user?.kycStatus === "pending") {
        mutate({
          status: status
            .split("")
            .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
            .join(""),
          userId: user?._id,
        });
      } else toast.error("KYC status already updated.");
    }
  };

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
      <h2 className="main-title-09888 pt-4">KYC Status</h2>
      <div className="tablebggg mt-4" style={{ overflowX: "auto" }}>
        <table
          className="table-main"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                User ID
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                User Name
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Email
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Status
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "right", padding: "10px" }}
              >
                Action
              </th>
              <th
                className="table-head-001"
                style={{ textAlign: "left", padding: "10px" }}
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="table-td" style={{ padding: "10px" }}>
                    <Skeleton width={50} />
                  </td>
                  <td
                    className="table-td d-flex align-items-center"
                    style={{ padding: "10px" }}
                  >
                    <Skeleton circle={true} height={32} width={32} />
                    <Skeleton width={100} style={{ marginLeft: "10px" }} />
                  </td>
                  <td className="table-td" style={{ padding: "10px" }}>
                    <Skeleton width={120} />
                  </td>
                  <td className="table-td" style={{ padding: "10px" }}>
                    <Skeleton width={80} />
                  </td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    <Skeleton width={30} />
                  </td>
                </tr>
              ))}
            {!isLoading && data?.data?.length === 0 && (
              <tr>
                <td
                  className="nodata"
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No KYC requests found
                </td>
              </tr>
            )}

            {!isLoading &&
              data?.data.length > 0 &&
              data?.data.map((kyc, index) => (
                <tr key={index}>
                  <td className="table-td" style={{ padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td
                    className="table-td d-flex align-items-center"
                    style={{ padding: "10px" }}
                  >
                    <img
                      className="mr-2"
                      height="32px"
                      width="32px"
                      src={Userprofile}
                    />
                    <div>{kyc.fullName}</div>
                  </td>
                  <td className="table-td" style={{ padding: "10px" }}>
                    {kyc.email}
                  </td>
                  <td className="table-td" style={{ padding: "10px" }}>
                    <p
                      className={
                        isLoading
                          ? ""
                          : kyc.kycStatus === "approved"
                          ? "statuskycadmin"
                          : kyc.kycStatus === "pending"
                          ? "statuskycpending"
                          : "statuskycdecline"
                      }
                    >
                      {capitiliseFirstLetter(kyc.kycStatus)}
                    </p>
                  </td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    <FormSelect
                      placeholder={"Select status"}
                      onChange={(e) => handleChangeStatus(e.target.value, kyc)}
                      value={kyc.kycStatus || ""}
                      options={["Select status", "Approved", "Cancelled"]}
                    />
                  </td>
                  <td className="table-td" style={{ padding: "10px" }}>
                    <p
                      className={"statuskycadmin pointer"}
                      onClick={() => handleViewImages(kyc)}
                    >
                      View
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {data?.data.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <Paginate setSkip={setSkip} data={data} skip={skip} limit={10} />
          </div>
        )}
      </div>
      {show && (
        <KycModal
          show={show}
          handleClose={() => setShow(false)}
          fronSide={frontImage}
          backSide={backImage}
        />
      )}
    </div>
  );
};

export default KYC;
