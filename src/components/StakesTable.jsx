import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
import { GreenTickIcon, RedTickIcon } from "./Icons/Icons";

const stakes = [
  //   {
  //     property: "title",
  //     location: "london",
  //     investmentValue: "$100",
  //     rentalIncome: "$500",
  //     status: "success",
  //   },
];

const StatusIcon = ({ status }) => {
  return status === "success" ? <GreenTickIcon /> : <RedTickIcon />;
};

const StakesTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
  }, []);

  return (
    <div className="tablebggg" style={{ overflowX: "auto" }}>
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
              Property
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Location
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Investment Value
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "left", padding: "10px" }}
            >
              Total Rental Income
            </th>
            <th
              className="table-head-001"
              style={{ textAlign: "right", padding: "10px" }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {stakes.length > 0 ? (
            stakes.map((transaction, index) => (
              <tr key={index}>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton width={50} /> : transaction.property}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton width={50} /> : transaction.location}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? (
                    <Skeleton width={60} />
                  ) : (
                    transaction.investmentValue
                  )}
                </td>
                <td className="table-td" style={{ padding: "10px" }}>
                  {isLoading ? <Skeleton /> : transaction.rentalIncome}
                </td>
                <td style={{ padding: "10px", textAlign: "right" }}>
                  <StatusIcon status={transaction.status} />
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "45px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#252C32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="nodata">No Investment Found</p>
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StakesTable;
