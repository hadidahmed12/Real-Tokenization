import React from "react";
import {
  ExplanationIcon,
  Occupancy,
  Properties,
  TotalssIcons,
} from "../../components/Icons/Icons";
import { Tooltip } from "react-tooltip";

const QuickInsights = () => {
  return (
    <div className="row">
      <div className="col-md-8 col-xl-8 col-12 qicknsig">
        <div className="col-xl-4 col-md-4 col-12">
          <div className="walltet-sub-card">
            <div className="d-flex justify-content-between">
              <div>
                <Properties />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex align-items-center">
                <h5>Number of properties</h5>
              </div>
            </div>
            <h4>2</h4>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 col-12">
          <div className="walltet-sub-card">
            <div className="d-flex justify-content-between">
              <div>
                <Occupancy />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="d-flex align-items-center">
                <h5>Occupancy rate</h5>

                <span
                  data-tooltip-id="rental-income"
                  data-tooltip-content="The is the percentage of your properties that are currently generating income.
                  In some cases a property will temporarily stop genrating income."
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
                    zIndex: "1",
                  }}
                  place="top"
                  effect="solid"
                />
              </div>
            </div>
            <h4>45%</h4>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 col-12">
          <div className="walltet-sub-card">
            <div className="d-flex justify-content-between">
              <div>
                <TotalssIcons />
              </div>
            </div>
            <div className="d-flex justify-content-between mt-1">
              <div className="d-flex align-items-center">
                <h5>Annual rental yield</h5>
                <span
                  data-tooltip-id="appreciation"
                  data-tooltip-content="Your portofolio's annualised property yeild % is based on the realised rental income that the property genrated over the last 12 months."
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
                    zIndex: "1",
                  }}
                  place="top"
                  effect="solid"
                />
              </div>
            </div>
            <h4>6 %</h4>
          </div>
        </div>
      </div>
      <h4 className="wallter-sub-heading my-4  annualInvemobile">
        Annual investment limit
      </h4>
      <div className="col-md-4 col-xl-4 col-12 walltet-sub-card">
        <p className="limituse">
          <strong>4 %</strong> of limit use
        </p>
        <div className="progress my-2">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: `${4}%`,
            }}
          >
            <span className="sr-only">70% Complete</span>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <span className="investment-card-limit">Annual Limit</span>
          <p className="investment-card-detail">USDT 183,500</p>
        </div>

        <div className="d-flex justify-content-between">
          <span className="investment-card-limit">
            Invested In Last 12 Months
          </span>
          <p className="investment-card-detail">USDT 13000</p>
        </div>

        <div className="d-flex justify-content-between">
          <span className="investment-card-limit">Available to Invest</span>
          <p className="investment-card-detail">USDT 170,500</p>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;
