import React from "react";
import "./portfolio.css";

import KeyFinnancial from "./KeyFinnancial";
import StakesTable from "../../components/StakesTable";
import QuickInsights from "./QuickInsights";

const Portfolio = () => {
  return (
    <div className="container-fluid main-container">
      <div className="mt-5">
        <h2 className="main-title-09888 pt-4">Portfolio</h2>
        <div className="row">
          <div className="col-xl-12 mt-3">
            <div className="wallet-top-card">
              <h6>Portfolio Value</h6>
              <h5 className="pt-3">USDT 12500</h5>
            </div>
          </div>
        </div>
        <h4 className="wallter-sub-heading my-4">Key Financials</h4>
        <KeyFinnancial />
        <div className="d-flex justify-content-between">
          <h4 className="wallter-sub-heading my-4">Quick Insights</h4>
          <h4 className="wallter-sub-heading my-4  annualInve">
            Annual investment limit
          </h4>
        </div>

        <QuickInsights />
        <div className="mt-4">
          <h4 className="wallter-sub-heading pb-3">My Stakes</h4>
          <StakesTable />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
