import React from "react";
import "./reward.css";
import { ComingSoon } from "../../components/Icons/Icons";
import {
  CopyLinkIocns,
  ExplanationIcon,
  GiftIconss,
  GreaterrrIconss,
  IncomeIcons,
  LineRwardsIconss,
  PromotionalIconss,
  ReferalIconss,
  StartIconss,
  TickIconss,
} from "../../components/Icons/Icons";

const Rewards = () => {
  const hideDetails = true;
  return hideDetails ? (
    <>
      <div className="container-fluid main-container">
        <div className="mt-5">
          <h2 className="main-title-09888 pt-4">Reward</h2>
          <div className="row">
            <div className="col-xl-12">
              <div className="empty-cardhefnfd">
                <div>
                  <div className="d-flex justify-content-center mb-3">
                    <ComingSoon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container-fluid main-container">
        <div className="mt-5">
          <h2 className="main-title-09888 pt-4">Reward</h2>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="rewardssscard-009 mt-4">
              <div className="row ">
                <div className="col-xl-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6>
                        Reward Balance{" "}
                        <span className="ml-2">
                          <ExplanationIcon />
                        </span>
                      </h6>
                      <h5 className="pt-3">USDT 0</h5>
                      <div className="d-flex align-items-center pt-2">
                        <h4 className="">View Current Balance </h4>
                        <span className="mt-2 ml-2">
                          <GreaterrrIconss />
                        </span>
                      </div>
                    </div>
                    <div>
                      <StartIconss />
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 d-flex justify-content-center">
                  <LineRwardsIconss />
                </div>
                <div className="col-xl-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <IncomeIcons />
                      <p className="pl-2 reward-next-title">Monthly income</p>
                      <span className="ml-2 mt-1">
                        <ExplanationIcon />
                      </span>
                    </div>
                    <div>
                      <h4>USDT 0</h4>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                      <ReferalIconss />
                      <p className="pl-2 reward-next-title">Referrals</p>
                      <span className="ml-2 mt-1">
                        <ExplanationIcon />
                      </span>
                    </div>
                    <div>
                      <h4>USDT 0</h4>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="d-flex align-items-center">
                      <PromotionalIconss />
                      <p className="pl-2 reward-next-title">Promotionals</p>
                      <span className="ml-2 mt-1">
                        <ExplanationIcon />
                      </span>
                    </div>
                    <div>
                      <h4>USDT 0</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 mt-4">
            <div className="rewardssscard-009">
              <h3>Real Tokenization</h3>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="pt-3">USDT 0</h5>
                <h6 className="pt-3">Invested In Last 12 Months</h6>
              </div>
              <div className="progress mt-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "40%" }}>
                  <span className="sr-only">70% Complete</span>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <p className="rewards-centertext">
                  Invest <span className="fewr356543">USDT 25,000</span> To
                  Reach Plus
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="rewardssscard-009">
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div>
                    <GiftIconss />
                  </div>
                  <h2 className="weri8765 pl-3">Refer and Earn</h2>
                </div>
                <div>
                  <GreaterrrIconss />
                </div>
              </div>
              <p className="efwrg565 pt-3">
                Invite your friends and you’ll both receive a rewards balance to
                invest in our properties!
              </p>
              <div className="d-flex pt-3">
                <TickIconss />
                <p className="rewards-ceefrt34t56 pl-2">
                  Friends Get
                  <span className="px-1" style={{ fontWeight: "600" }}>
                    USDT 200
                  </span>
                  Upon Signing Upt
                </p>
              </div>
              <div className="d-flex pt-3">
                <TickIconss />
                <p className="rewards-ceefrt34t56 pl-2">
                  You Get
                  <span className="px-1" style={{ fontWeight: "600" }}>
                    USDT 200
                  </span>
                  After They Invest{" "}
                  <span className="px-1" style={{ fontWeight: "600" }}>
                    USDT 2000
                  </span>
                </p>
              </div>
              <div className="">
                <p className="reward-fv65432 pt-3">Share Your Link</p>
                <div className="d-flex mt-3">
                  <button className="refferal-button34">
                    https://app/realtokenization.com/rewards?cqwerttq
                  </button>
                  <button className="refferal-buttonfefr d-flex align-items-center ml-3">
                    <span>
                      <CopyLinkIocns />
                    </span>
                    <span className="ml-2"> Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rewards;
