/* eslint-disable react/prop-types */
import { useState } from "react";
import useRole from "../../../../../hooks/useRole";
import { ROLES } from "../../../../../constant/roles";
import { setCartItem } from "../../../../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import CountdownTimer from "../../../../../components/Timer";
import { useClaiming } from "../../../../../hooks/useProperties";
import StatuesBaseCard from "../../../../../components/PropertyDetails/StatuesBaseCard";

const Calculator = ({ data }) => {
  const role = useRole();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { mutate } = useClaiming(setIsLoading, setWalletAddress);

  const handleClaiming = (event) => {
    event.preventDefault();
    // const userAddress = "0x1234567890abcdef1234567890abcdef12345678"; //
    const saleId = data?.sale?._id;
    const claimData = {
      userAddress: walletAddress,
      saleId,
    };
    setIsLoading(true);
    mutate({ claimData });
  };

  const saleEndTime = new Date(data?.sale?.saleEndTime * 1000);
  const claimAvailableTime = new Date(saleEndTime);
  claimAvailableTime.setDate(claimAvailableTime.getDate() + 0);
  console.log(data);

  return (
    <div
      style={{ position: "sticky", zIndex: "999", top: "80px" }}
      className="propertyscard-009"
    >
      <div className="d-flex justify-content-center">
        <p className="redgultedettxt">Property price</p>
      </div>
      <div className="d-flex justify-content-center">
        <h5>USDT {data?.price || "-"}</h5>
      </div>
      {data?.token?.isSaleCreated && (
        <>
          <div className="progress mt-3">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{
                width: `${
                  ((data?.totalSoldTokens / data?.token?.supply) * 100).toFixed(
                    2
                  ) || 0
                }%`,
              }}
            >
              <span className="sr-only">70% Complete</span>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <p className="redgultedettxt">
              {((data?.totalSoldTokens / data?.token?.supply) * 100).toFixed(
                2
              ) || 0}
              % Funded
            </p>
            <p className="redgultedettxt">
              {/* here subtract the total usdt investment of the invesetors */}
              USDT {(data?.token?.supply - data?.totalSoldTokens) * 150 ||
                0}{" "}
              available
            </p>
          </div>
          <h4 className="dweft5432 d-flex mt-3">
            {data?.totalInvestorCount || 0}
            <p className="redgultedettxt pl-1">Investors</p>
          </h4>{" "}
        </>
      )}
      <div className="innercardproperty mt-3">
        <StatuesBaseCard data={data} />
      </div>
      {role === ROLES.USER ? (
        <>
          {!data?.isTokenCreated ||
          (data?.isTokenCreated &&
            new Date(data?.latestFundDate) < new Date() &&
            !data?.token?.isSaleCreated) ? (
            <div className="d-flex flex-column align-items-center">
              {/* <p className="regulteh2 mt-2">Sale will start soon!</p> */}
            </div>
          ) : new Date(data?.latestFundDate) > new Date() &&
            data?.isTokenCreated ? (
            <p className="mt-2 " style={{ color: "red" }}>
              <CountdownTimer
                startDate={new Date(data?.latestFundDate).getTime()}
                endDate={new Date()}
              />
            </p>
          ) : data?.token?.isSaleCreated &&
            !data?.sale?.isSaleFinalized &&
            saleEndTime > new Date() ? (
            <div className="d-flex mt-3">
              <div className="ml-2">
                <button
                  type="submit"
                  className="walletbtn-0993"
                  onClick={() => {
                    if (data) dispatch(setCartItem(data));
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ) : data?.token?.isSaleCreated &&
            !data?.sale?.isSaleFinalized &&
            saleEndTime < new Date() ? (
            <div className="d-flex flex-column align-items-center">
              <p className="regulteh2 mt-2">Tokens will be claimable soon!</p>
            </div>
          ) : data?.token?.isSaleCreated &&
            data?.sale?.isSaleFinalized &&
            new Date() >= claimAvailableTime ? (
            data?.sale?.isSoftCapReached &&
            !data?.sale?.purchase[0]?.isClaimed ? (
              <div className="d-flex mt-3">
                <div>
                  <input
                    className="proeprtyinputt678"
                    placeholder="Wallet Address"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={handleClaiming}
                    className={`walletbtn-0993 ${
                      isLoading || !walletAddress ? "disableBtn" : ""
                    }`}
                    disabled={isLoading || !walletAddress}
                  >
                    Claim Tokens{" "}
                    {isLoading && <div className="spinner ml-3"></div>}
                  </button>
                </div>
              </div>
            ) : data?.totalInvestorCount === 0 &&
              data?.sale?.isSaleFinalized &&
              !data?.sale?.isSoftCapReached ? (
              <div className="d-flex flex-column align-items-center">
                <p className="regulteh2 mt-2">
                  Soft cap is not reached, Property sale is closed!
                </p>
              </div>
            ) : data?.token?.isSaleCreated &&
              data?.sale?.isSaleFinalized &&
              !data?.sale?.isSoftCapReached &&
              data?.sale?.purchase[0]?.isClaimed ? (
              <div className="d-flex flex-column align-items-center">
                <p className="regulteh2 mt-2">USDT Claimed!</p>
              </div>
            ) : data?.token?.isSaleCreated &&
              data?.sale?.isSaleFinalized &&
              data?.sale?.isSoftCapReached &&
              data?.sale?.purchase[0]?.isClaimed ? (
              <div className="d-flex flex-column align-items-center">
                <p className="regulteh2 mt-2">Tokens Claimed!</p>
              </div>
            ) : (
              <>
                {data?.sale?.purchase?.length > 0 ? (
                  <>
                    <div>
                      <p className="regulteh4 mt-2">
                        Soft cap is not reached, you can claim your usdts!
                      </p>
                    </div>
                    <div className="d-flex mt-3">
                      <div>
                        <input
                          className="proeprtyinputt678"
                          placeholder="Wallet Address"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                        />
                      </div>
                      <div className="ml-2">
                        <div>
                          <button
                            className={`walletbtn-0993 ${
                              isLoading || !walletAddress ? "disableBtn" : ""
                            }`}
                            onClick={handleClaiming}
                            disabled={isLoading || !walletAddress}
                          >
                            Claim USDT{" "}
                            {isLoading && <div className="spinner ml-3"></div>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <p className="regulteh2 mt-2">
                      Soft cap is not reached, Property sale is closed!
                    </p>
                  </div>
                )}
              </>
            )
          ) : data?.token?.isSaleCreated &&
            data?.sale?.isSaleFinalized &&
            new Date() < claimAvailableTime ? (
            <div className="d-flex flex-column align-items-center">
              <p className="regulteh2 mt-2">Tokens will be Claimable in!</p>
              <CountdownTimer
                startDate={new Date().getTime()}
                endDate={claimAvailableTime.getTime()}
              />
            </div>
          ) : null}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Calculator;
