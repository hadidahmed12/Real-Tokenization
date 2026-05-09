import React from "react";
import {
  ExplanationIcon,
  IncomeIcons,
  RentalIcons,
  TotalssIcons,
} from "../../components/Icons/Icons";
import { Tooltip } from "react-tooltip";

const KeyFinnancial = () => {
  return (
    <div className="row">
      <div className="col-xl-4">
        <div className="walltet-sub-card">
          <div className="d-flex justify-content-between">
            <div>
              <IncomeIcons />
            </div>
            <h4>USDT 3920</h4>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex align-items-center">
              <h5>Monthly income</h5>
              <span
                data-tooltip-id="explanation-tooltip"
                data-tooltip-content="This displays most recent rental income deposited into your account."
                className="ml-2 mt-1"
              >
                <ExplanationIcon />
              </span>
              <Tooltip
                id="explanation-tooltip"
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "300px",
                  textAlign: "center",
                }}
                place="top"
                effect="solid"
              />
            </div>
            <h5>June 2024</h5>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="walltet-sub-card">
          <div className="d-flex justify-content-between">
            <div>
              <RentalIcons />
            </div>
            <h4>USDT 2300</h4>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex align-items-center">
              <h5>Total Rental Income</h5>

              <span
                data-tooltip-id="rental-income"
                data-tooltip-content="The total amount of monthly rent paid into your wallet."
                className="ml-2 mt-1"
              >
                <ExplanationIcon />
              </span>
              <Tooltip
                id="rental-income"
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "300px",
                  textAlign: "center",
                }}
                place="top"
                effect="solid"
              />
            </div>
            <h5>June 2024</h5>
          </div>
        </div>
      </div>
      <div className="col-xl-4">
        <div className="walltet-sub-card">
          <div className="d-flex justify-content-between">
            <div>
              <TotalssIcons />
            </div>
            <h4>USDT 650</h4>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex align-items-center">
              <h5>Total Appreciation</h5>
              <span
                data-tooltip-id="appreciation"
                data-tooltip-content="Unrealized gains or losses from the latest valuations of the owned properties in your portfolio."
                className="ml-2 mt-1"
              >
                <ExplanationIcon />
              </span>
              <Tooltip
                id="appreciation"
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  color: "#000",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "300px",
                  textAlign: "center",
                }}
                place="top"
                effect="solid"
              />
            </div>
            <h5>June 2024</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFinnancial;
