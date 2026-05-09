import React from "react";
import {
  MyBitcoinIcon,
  MyEtherIcon,
  RedRippleIcon,
  RippleIcon,
} from "../Icons/Icons"; // Import different icons

const CurrencyTable = () => {
  const data = [
    {
      currency: "Bitcoin",
      price: "$40,000",
      change: "+5%",
      icon: <MyBitcoinIcon />,
      icons: <RippleIcon />,
    },
    {
      currency: "Ethereum",
      price: "$2,500",
      change: "-3%",
      icon: <MyEtherIcon />,
      icons: <RedRippleIcon />,
    },
    {
      currency: "Ripple",
      price: "$0.90",
      change: "+2%",
      icon: <MyBitcoinIcon />,
      icons: <RedRippleIcon />,
    },
    // Add more data as needed
  ];

  return (
    <div className="container">
      <table className="table table-responsive">
        <thead className="thead-dark">
          <tr>
            <th className="text-left pl-0" scope="col">
              Currency
            </th>{" "}
            {/* Left align header */}
            <th className="text-left pl-0" scope="col">
              Price
            </th>{" "}
            {/* Left align header */}
            <th className="text-left" scope="col">
              24H Change
            </th>{" "}
            {/* Left align header */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="namemaincrncy-table">
                <div className="d-flex">
                  <span className="mt-1">{item.icon}</span>{" "}
                  <span className="ml-2">{item.currency}</span>
                </div>
              </td>
              <td className="text-left ricecolnmn-table">
                <span>{item.price}</span>
              </td>{" "}
              <td className="text-left">
                <div className="d-flex align-items-center btnccmfkrkr-001">
                  <span>
                    <span>{item.icons}</span>{" "}
                    {/* Display the respective icon */}
                  </span>
                  <span className="ml-1">{item.change}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
