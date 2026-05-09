import React, { useEffect } from "react";
import {
  BackArrow,
  BedIcon,
  RentedIcon,
  TagenmIcon,
} from "../../../components/Icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveStep } from "../../../store/slices/stepSlice";

const TokenStep = ({
  cart,
  incrementValue,
  decrementValue,
  usdtValues,
  setTotalAmount,
  setTokenAmount,
  setTransactionAmount,
  transactionAmount,
}) => {
  const calculateSecurityTokens = (usdtValue) => Math.floor(usdtValue / 150);
  const totalAmount = usdtValues.reduce((total, value) => total + value, 0);
  const tokensAmount = usdtValues.reduce(
    (total, value) => total + calculateSecurityTokens(value),
    0,
  );

  const tCost = useSelector((state) => state.cart.cart[0]);

  const dispatch = useDispatch();
  useEffect(() => {
    setTotalAmount(totalAmount);
  }, [usdtValues, setTotalAmount]);

  useEffect(() => {
    setTokenAmount(tokensAmount);
  }, [usdtValues, setTokenAmount]);

  useEffect(() => {
    const tokens = tCost?.price / 150;
    const TCost = tCost?.transactionCost / tokens;
    setTransactionAmount(Math.round(TCost * tokensAmount));
  }, [tokensAmount]);

  return (
    <div>
      {cart.map((property, index) => (
        <div className='property-details mt-4' key={property._id || index}>
          <div className='d-flex justify-content-between'>
            <div className='d-flex'>
              <img
                src={property.thumbnail || "../../assets/images/property.png"}
                alt='Property'
                className='property-image'
              />
              <div>
                <div className='d-flex mb-3'>
                  <div className='d-flex align-items-center'>
                    <BedIcon />
                    <p className='cart-detail-09 ml-1'>
                      {property.numberOfBed || 1}
                    </p>
                  </div>
                  <div className='d-flex align-items-center ml-3'>
                    <RentedIcon />
                    <p className='cart-detail-09 ml-1'>
                      {property.status || "rented"}
                    </p>
                  </div>
                  <div className='d-flex align-items-center ml-3'>
                    <TagenmIcon />
                    <p className='cart-detail-09 ml-1'>
                      #{property.propertyNumber || "ferfe"}
                    </p>
                  </div>
                </div>
                <h2 className='jrifruhrty75'>
                  {/* {property?.numberOfBed + " bed in " + property?.location ||
                    "Property Title"} */}
                  {property?.type === "bed"
                    ? (property?.numberOfBed || 0) +
                      " bed in " +
                      (property?.location || "-")
                    : "Studio in " + (property?.location || "-")}
                </h2>
                <div className='counter mt-3'>
                  <button
                    onClick={() => decrementValue(index)}
                    className='minimisetheValue'
                  >
                    -
                  </button>
                  <span className='theValue'>USDT {usdtValues[index]}</span>
                  <button
                    onClick={() => incrementValue(index)}
                    className='minimisetheValue'
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4 className='dwfr4j768594 mt-4'>
                Price: USDT {property?.price || "N/A"}
              </h4>
              <p className='frnvubvr789'>
                Total Tokens: {property?.sale?.reservedTokensForSale}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className='mt-4 totalsecuirty-09'>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='cart-detail-09 ml-1'>Total Security Tokens</p>
          <p className='cart-detail-09 ml-1'> {tokensAmount} ST</p>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='cart-detail-09 ml-1'>Transaction Cost</p>
          <p className='cart-detail-09 ml-1'> {transactionAmount} USDT</p>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='jrifruhrty75 pl-1'>Total Amount</h2>
          <h4 className='important-text-style'>
            USDT {totalAmount + transactionAmount}
          </h4>
        </div>
      </div>

      <div className='d-flex align-items-center gapbetwrs'>
        <span
          className='backBtn pointer'
          onClick={() => dispatch(setActiveStep(0))}
        >
          <BackArrow />
        </span>
        <button
          className='continue-button'
          onClick={() => dispatch(setActiveStep(2))}
        >
          Continue to Wallet Selection
        </button>
      </div>
    </div>
  );
};

export default TokenStep;
