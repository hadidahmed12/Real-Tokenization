import React from "react";

const Financials = ({ data }) => {
  return (
    <>
      <h2 className="regulteh2 pt-5">Financials</h2>
      <div className="row pt-4">
        <div className="col-xl-6">
          <h4 className="finanicialh-099">Property Cost</h4>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Property Price</p>
            <h4 className="finanicialh-099">USDT {data?.price || 0}</h4>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Transaction Costs</p>
            <h4 className="finanicialh-099">
              USDT {data?.transactionCost || 0}
            </h4>
          </div>
          <button className="btn-slider-098 mt-3">
            Includes Platform&apos;s 1.5% fee
          </button>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Investment Costs</p>
            <h4 style={{ color: "#BE170F" }} className="finanicialh-099">
              USDT{" "}
              {Number(data?.price) || 0 + Number(data?.transactionCost) || 0}
            </h4>
          </div>
        </div>
        <div className="col-xl-6">
          <h4 className="finanicialh-099">Rental Income (Year 1)</h4>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Projected gross rent</p>
            <h4 className="finanicialh-099">USDT {data?.annualRental || 0}</h4>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Service charges</p>
            <h4 className="finanicialh-099">
              USDT {data?.serviceCharges || 0}
            </h4>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Mgmt. and maintenance</p>
            <h4 className="finanicialh-099">
              (USDT {data?.maintainceCost || 0})
            </h4>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <p className="finaniciatext-098">Annual net income</p>
            <h4 style={{ color: "#BE170F" }} className="finanicialh-099">
              USDT{" "}
              {(Number(data?.annualRental) || 0) -
                (Number(data?.serviceCharges || 0) +
                  Number(data?.maintainceCost || 0))}
            </h4>
          </div>
          <button className="btn-slider-098 mt-3">
            This is an estimate for the 1st year of ownership
          </button>
        </div>
      </div>
    </>
  );
};

export default Financials;
