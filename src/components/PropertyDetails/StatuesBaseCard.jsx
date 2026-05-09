import React from "react";
import { fundedDateFormate } from "../../utils/date";
import {
  netYieldinPercentage,
  yearInvestmentReturn,
} from "../../utils/calculations";
const StatuesBaseCard = ({ data }) => {
  return (
    <div>
      {data?.status === "available" ? (
        <>
          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              5 year total return
            </span>
            <p className="investment-card-detail">
              {(yearInvestmentReturn(data).toFixed(2) * 5).toFixed(2)}%
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Yearly Investment Return:
            </span>
            <p className="investment-card-detail">
              {yearInvestmentReturn(data).toFixed(2)}%
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Projected net yield:
            </span>
            <p className="investment-card-detail">
              {netYieldinPercentage(
                data?.annualRental,
                data?.maintainceCost,
                data?.serviceCharges,
                data?.price
              )?.toFixed(3)}
              %
            </p>
          </div>
        </>
      ) : data?.status === "funded" ? (
        <>
          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Yearly Investment Returns:
            </span>
            <p className="investment-card-detail">
              {yearInvestmentReturn(data).toFixed(2)}%
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">Funded Date:</span>
            <p className="investment-card-detail">
              {fundedDateFormate(data?.latestFundDate) || "-"}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Current valuation:
            </span>
            <p className="investment-card-detail">
              {data?.currentValuation || "-"}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">Funded Date:</span>
            <p className="investment-card-detail">
              {fundedDateFormate(data?.latestFundDate) || "-"}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Purchase Price:
            </span>
            <p className="investment-card-detail">
              {data?.currentValuation || "-"}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <span className="investment-card-detail-label">
              Total rental income:
            </span>
            <p className="investment-card-detail">
              {data?.annualRental || "-"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default StatuesBaseCard;
