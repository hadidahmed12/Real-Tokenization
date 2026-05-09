import React from "react";
import {
  BedIcon,
  RentedIcon,
  TagenmIcon,
} from "../../../components/Icons/Icons";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../../store/slices/cartSlice";
import { setActiveStep } from "../../../store/slices/stepSlice";

const PropertiesStep = ({
  cart,
  showDetails,
  toggleDetails,
  usdtValues,
  setUsdtValues,
}) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (index, item) => {
    dispatch(removeCartItem(item));
    const updatedValues = [...usdtValues];
    updatedValues.splice(index, 1);
    setUsdtValues(updatedValues);
  };
  const renderProgressBar = (progressPercentage) => {
    return Array(14)
      .fill(0)
      .map((_, index) => {
        const isFilled = index < Math.round(progressPercentage / 7.14); // Assuming each rect represents ~7.14% progress
        return (
          <rect
            key={index}
            x={index * 25}
            width='22'
            height='5'
            rx='2.5'
            fill='#BE170F'
            fillOpacity={isFilled ? 1 : 0.05}
          />
        );
      });
  };

  return (
    <>
      {cart?.map((ca, i) => {
        const progressPercentage =
          (ca?.totalSoldTokens / ca?.sale?.reservedTokensForSale) * 100 || 0;

        return (
          <div className='mt-4' key={ca?._id || i}>
            <div className='property-details'>
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  <img
                    src={ca?.thumbnail || "../../assets/images/property.png"}
                    alt='Property'
                    className='property-image'
                  />

                  <div>
                    <div className='d-flex mb-3 flex-wrap'>
                      <div className='d-flex align-items-center'>
                        <BedIcon />
                        <p className='cart-detail-09 ml-1'>
                          {ca?.numberOfBed || 0}
                        </p>
                      </div>
                      <div className='icon d-flex align-items-center'>
                        <RentedIcon />
                        <p className='cart-detail-09 ml-1'>
                          {ca?.status || "N/A"}
                        </p>
                      </div>
                      <div className='icon last-icon d-flex align-items-center'>
                        <TagenmIcon />
                        <p className='cart-detail-09 ml-1'>
                          #{ca?.propertyNumber || "N/A"}
                        </p>
                      </div>
                    </div>
                    <h2 className='jrifruhrty75'>
                      {/* {ca?.numberOfBed + " bed in " + ca?.location ||
                        "Property Title"} */}
                      {ca?.type === "bed"
                        ? (ca?.numberOfBed || 0) +
                          " bed in " +
                          (ca?.location || "-")
                        : "Studio in " + (ca?.location || "-")}
                    </h2>
                    <button
                      className='sdrty789765456789 pointer'
                      onClick={() => toggleDetails(i)}
                    >
                      {showDetails === i ? "Hide Details" : "Show Details"}
                      <span
                        className={`arrow-icon ${
                          showDetails === i ? "arrow-up" : "arrow-down"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>

                <div className='left-text'>
                  <h4 className='dwfr4j768594 mt-5'>
                    USDT {ca?.price?.toLocaleString() || "N/A"}
                  </h4>
                  <p className='frnvubvr789'>
                    {ca?.totalInvestorCount || 0} Investors
                  </p>
                </div>
              </div>
              <button
                className='cancel-button pointer'
                onClick={() => handleRemoveItem(i, ca)}
              >
                Remove
              </button>
            </div>
            {showDetails === i && (
              <div className='property-infoft5'>
                <div className='d-flex justify-content-between flex-wrap'>
                  <div>
                    <h2 className='jrifruhrty75'>Property Size</h2>
                    <p className='cart-detail-09 mt-2'>{ca?.size} sq feet</p>

                    <h2 className='jrifruhrty75 mt-3'>Total Tokens</h2>
                    <p className='cart-detail-09 mt-2'>
                      {ca?.sale?.reservedTokensForSale} ST
                    </p>
                  </div>
                  <div>
                    <h2 className='jrifruhrty75'>Total Property Value</h2>
                    <p className='cart-detail-09 mt-2'>
                      {ca?.price?.toLocaleString()}
                    </p>
                    <h2 className='jrifruhrty75 mt-3'>Soft Cap</h2>
                    <p className='cart-detail-09 mt-2'>
                      {ca?.sale?.minimumSoftCap.toLocaleString()} USDT
                    </p>
                  </div>
                  <div>
                    <h2 className='jrifruhrty75'>Sale Progress</h2>
                    <p className='cart-detail-09 mt-2'>
                      <svg
                        className='progress-bar-svg'
                        width='347'
                        height='5'
                        viewBox='0 0 347 5'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        {renderProgressBar(progressPercentage)}
                      </svg>
                      <br />
                      <div style={{ textAlign: "right" }}>
                        {(
                          (ca?.totalSoldTokens /
                            ca?.sale?.reservedTokensForSale) *
                          100
                        ).toFixed(2) || 0}
                        %
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <button
        className='continue-button'
        onClick={() => dispatch(setActiveStep(1))}
      >
        Continue to Tokens
      </button>
    </>
  );
};

export default PropertiesStep;
