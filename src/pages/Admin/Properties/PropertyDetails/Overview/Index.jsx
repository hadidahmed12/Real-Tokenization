/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  AmenitiesIcon,
  BedIcon,
  DocumentIcon,
  DonwloadIcon,
  RentalIcons2,
  RentedIcon,
} from "../../../../../components/Icons/Icons";
import Regularpc from "../../../../../assets/images/regular.png";
import Regularpc2 from "../../../../../assets/images/grosss.png";
import StackedBarChart from "../../../../../components/StackedBarchart";
import Timeline from "./Timeline";
import { firstLetterCaps } from "../../../../../utils/isEmpty";
import DraggableProgressBar from "../../../../../components/DraggleAbleBar";
import Location from "./Location";
import {
  grossYieldinPercentage,
  netYieldinPercentage,
} from "../../../../../utils/calculations";
import ChatSection from "./ChatSection";
import Financials from "./Financials";

const Overview = ({ data }) => {
  const [initialInvestment, setInitialInvestment] = useState(
    data?.initialInvestment
  );
  const [propertyValueGrowth, setPropertyValueGrowth] = useState(
    data?.propertyValueGrowth
  );
  const [annualRentalYeild, setAnnualRentalYeild] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (data) {
      setInitialInvestment(data?.initialInvestment);
      setPropertyValueGrowth(data?.propertyValueGrowth);
    }
  }, [data]);

  useEffect(() => {
    const grossRent =
      data?.annualRental -
      (data?.serviceCharges || 0 + data?.maintainceCost || 0);
    const netYeild = (grossRent / data?.price) * 100;
    const clampedNetYield = Math.max(1, Math.min(10, netYeild));
    setAnnualRentalYeild(clampedNetYield.toFixed(2));
  }, [data]);

  return (
    <div className={` ${"prpoertycarleft09big"}`}>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="propertyleftcrdh1">
          {/* 1 Bed in 15 Northside, Business Bay */}
          {data?.type === "bed"
            ? (data?.numberOfBed || 0) + " bed in " + (data?.location || "-")
            : "Studio in " + (data?.location || "-")}
        </h1>
      </div>
      <div className="d-flex mt-3">
        <div className="d-flex align-items-center">
          <span>
            <BedIcon />
          </span>
          <p className="sdfgyh654 ml-2">
            {data?.type === "bed" ? data?.numberOfBed + " Bed" : data?.type}
          </p>
        </div>
        <div className="d-flex align-items-center ml-3">
          <span>
            <RentedIcon />
          </span>
          <p className="sdfgyh654 ml-2">
            {data?.status
              ? data.status.charAt(0).toUpperCase() +
                data.status.slice(1).toLowerCase()
              : ""}
          </p>
        </div>
        <div className="d-flex align-items-center ml-3">
          <span>
            <RentedIcon />
          </span>
          <p className="sdfgyh654 ml-2">{data?.size} Sq.Ft</p>
        </div>
        <div className="d-flex align-items-center ml-3">
          <span>
            <RentalIcons2 />
          </span>
          <p className="sdfgyh654 ml-2">#{data?.propertyNumber || "#B206"}</p>
        </div>
        <div className="d-flex align-items-center ml-3">
          <span>
            {/* <RentalIcons2 /> */}
            <svg
              width="14"
              height="16"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0.5C6.81276 0.50258 4.71584 1.3726 3.16922 2.91922C1.62261 4.46584 0.752586 6.56276 0.750005 8.75C0.747994 10.5373 1.33179 12.276 2.41201 13.7C2.41201 13.7 2.63701 13.9963 2.67376 14.039L9 21.5L15.3293 14.0353C15.3623 13.9955 15.588 13.7 15.588 13.7L15.5888 13.6978C16.6682 12.2743 17.2517 10.5365 17.25 8.75C17.2474 6.56276 16.3774 4.46584 14.8308 2.91922C13.2842 1.3726 11.1872 0.50258 9 0.5ZM9 11.75C8.40666 11.75 7.82664 11.5741 7.33329 11.2444C6.83995 10.9148 6.45543 10.4462 6.22837 9.89805C6.0013 9.34987 5.94189 8.74667 6.05765 8.16473C6.1734 7.58279 6.45913 7.04824 6.87868 6.62868C7.29824 6.20912 7.83279 5.9234 8.41473 5.80764C8.99668 5.69189 9.59988 5.7513 10.1481 5.97836C10.6962 6.20542 11.1648 6.58994 11.4944 7.08329C11.8241 7.57664 12 8.15666 12 8.75C11.999 9.54535 11.6826 10.3078 11.1202 10.8702C10.5578 11.4326 9.79535 11.749 9 11.75Z"
                fill="gray"
              />
            </svg>
          </span>
          <p className="sdfgyh654 ml-2">{data?.location}</p>
        </div>
      </div>
      <hr className="solid" />
      <div className="d-flex">
        <div>
          <img src={Regularpc} />
        </div>
        <div className="ml-3">
          <h2 className="regulteh2">Regulated in UAE by the DFSA</h2>
          <p className="redgultedettxt">
            A mature real estate market with a high return on investment
          </p>
        </div>
      </div>
      <div className="d-flex mt-3">
        <div>
          <img src={Regularpc2} />
        </div>
        <div className="ml-3">
          <h2 className="regulteh2">
            {grossYieldinPercentage(data?.annualRental, data?.price)?.toFixed(
              4
            )}{" "}
            % annual gross yield
          </h2>
          <p className="redgultedettxt">
            With a net yield of{" "}
            {netYieldinPercentage(
              data?.annualRental,
              data?.maintainceCost,
              data?.serviceCharges,
              data?.price
            )?.toFixed(3)}
            % and a price per square foot of USDT{" "}
            {Math.round(data?.price / data?.size) || 0}
          </p>
        </div>
      </div>
      <hr className="solid" />

      {data?.status === "available" ? ( //Ready status
        <div>
          <h2 className="regulteh2 pt-1">Investment strategy</h2>
          <div className="ml-3">
            <h2 className="regulteh3">Capital Growth</h2>
            <p className="redgultedettxt">
              High appreciation potential due to market trends, upcoming
              infrastructure, or prime locations.
            </p>
          </div>{" "}
          <div className="ml-3">
            <h3 className="regulteh3">Proximity to Downtown Dubai</h3>

            <p className="redgultedettxt">
              Enhanced property value and appeal, providing a unique selling
              point and potential for tourism related benefits.
            </p>
          </div>{" "}
          <div className="ml-3">
            <h2 className="regulteh3">Booming neighborhood</h2>
            <p className="redgultedettxt">
              Benefit from a growing community with major infrastructure and
              development works under way.
            </p>
          </div>
        </div>
      ) : data?.status === "funded" ? (
        //Rented status
        <div>
          <h2 className="regulteh2 pt-1">Investment strategy</h2>
          <div className="ml-3">
            <h2 className="regulteh3">Capital Growth</h2>
            <p className="redgultedettxt">
              High appreciation potential due to market trends, upcoming
              infrastructure, or prime locations.
            </p>
          </div>{" "}
          <div className="ml-3">
            <h3 className="regulteh2">Reputable building and community</h3>

            <p className="redgultedettxt">
              Located in an eco-conscious community, Al Barari, developed around
              lush landscapes and resort-like amenities.
            </p>
          </div>{" "}
          <div className="ml-3">
            <h2 className="regulteh2">High-end amenities</h2>
            <p className="redgultedettxt">
              Luxurious amenities enhance lifestyle and justify premium rents,
              attracting high-end tenants.
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
      <hr className="solid" />
      <div>
        <div className="d-flex align-content-center justify-content-between">
          <h2 className="regulteh2">Investment calculator</h2>
        </div>
        <div className="d-flex justify-content-center">
          <div className="mt-3">
            <p className="redgultedettxt">Projected investment return of</p>
            <h2 className="regulteh2">
              USDT{" "}
              {Number(
                (
                  Number(initialInvestment || 0) +
                  Number(((initialInvestment * annualRentalYeild) / 100) * 5) +
                  Number((initialInvestment * propertyValueGrowth) / 100)
                ).toFixed(2)
              )}{" "}
              in 5 years
            </h2>
          </div>
        </div>
      </div>
      <>
        <div className="d-flex justify-content-between sumOfthre mt-3">
          <div className="mt-3">
            <p className="redgultedettxt">
              <span className="pr-1">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="#1F0303" />
                </svg>
              </span>
              Investment
            </p>
            <h2 className="regulteh23">
              USDT {Math.round(initialInvestment) || 0}
            </h2>
          </div>
          <div className="mt-3">
            <p className="redgultedettxt">
              <span className="pr-1">
                <svg
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4.5" r="4" fill="#FEB241" />
                </svg>
              </span>{" "}
              Total Rental Income
            </p>
            <h2 className="regulteh23">
              USDT{" "}
              {Number(
                ((initialInvestment * annualRentalYeild) / 100) * 5
              )?.toFixed(2)}
            </h2>
          </div>
          <div className="mt-3">
            <p className="redgultedettxt">
              <span className="pr-1">
                <svg
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4.5" r="4" fill="#BE170F" />
                </svg>
              </span>
              Value Appreciation
            </p>
            <h2 className="regulteh23">
              USDT{" "}
              {(
                Number(initialInvestment * propertyValueGrowth)?.toFixed(2) /
                100
              )?.toFixed(2)}
            </h2>
          </div>
        </div>{" "}
        <div>
          <StackedBarChart
            data={data}
            max={Number(
              (
                Number(initialInvestment || 0) +
                Number(((initialInvestment * annualRentalYeild) / 100) * 5) +
                Number((initialInvestment * propertyValueGrowth) / 100)
              ).toFixed(2)
            )}
            appreciation={(
              Number(initialInvestment * propertyValueGrowth)?.toFixed(2) / 100
            )?.toFixed(2)}
            totalRental={Number(
              ((initialInvestment * annualRentalYeild) / 100) * 5
            )?.toFixed(2)}
            investment={Math.round(initialInvestment) || 0}
          />
        </div>
        <div>
          <div className="mt-5">
            <DraggableProgressBar
              label="Initial Investment"
              value={initialInvestment}
              setValue={setInitialInvestment}
              min={150}
              max={55000}
            />
            <DraggableProgressBar
              label="Property value growth (5 year)"
              value={propertyValueGrowth}
              setValue={setPropertyValueGrowth}
              min={1}
              max={100}
            />
            <DraggableProgressBar
              label="Expected annual rental yield"
              value={annualRentalYeild}
              setValue={setAnnualRentalYeild}
              min={1}
              max={10}
            />
          </div>
          <button className="btn-slider-098 mt-3">
            Default values are based on property numbers
          </button>
          <h2 className="regulteh2 pt-5">Property Overview</h2>

          {/* <p className="redgultedettxt pt-3">
            {showFullDescription || data?.description?.length <= 200
              ? data?.description
              : `${data?.description?.slice(0, 200)}...`}
          </p>
          {data?.description?.length > 200 && (
            <span
              style={{
                fontSize: "12px",
                color: "#BE170F",
                cursor: "pointer",
              }}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "See Less" : "See More"}
            </span>
          )} */}

          <p className="redgultedettxt pt-3" style={{ display: "inline" }}>
            {showFullDescription || data?.description?.length <= 200
              ? data?.description
              : `${data?.description?.slice(0, 200)}`}
            {data?.description?.length > 200 && !showFullDescription && "... "}
            {data?.description?.length > 200 && (
              <span
                style={{
                  fontSize: "12px",
                  color: "#BE170F",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? " See Less" : " See More"}
              </span>
            )}
          </p>

          {data?.status === "available" ? ( //Ready status
            <div>
              <h2 className="regulteh2 pt-3">Leasing strategy</h2>
              <div className="ml-3">
                <h2 className="regulteh3">Long term rental</h2>
                <p className="redgultedettxt">
                  This property&apos;s leasing strategy is to generate
                  consistent monthly income through annual contracts with long
                  term tenants
                </p>
              </div>{" "}
              <div className="ml-3">
                <h3 className="regulteh2">Property status</h3>
                <h2 className="regulteh3">Ready for rent</h2>

                <p className="redgultedettxt">
                  This property is vacant and we will be actively searching for
                  a tenant after the transfer of title deed
                </p>
              </div>{" "}
              <div className="ml-3">
                <h2 className="regulteh3">Expected annual rent</h2>
                <p className="redgultedettxt">AED {data?.annualRental}</p>
              </div>
            </div>
          ) : data?.status === "funded" ? (
            <div>
              <h2 className="regulteh2 pt-2">Leasing strategy</h2>
              <div className="ml-3">
                <h2 className="regulteh2">Long term rental</h2>
                <p className="redgultedettxt">
                  This property's leasing strategy is to generate consistent
                  monthly income through annual contracts with long term tenants
                </p>
              </div>{" "}
              <div className="ml-3">
                <h3 className="regulteh2">Property status</h3>
                <h2 className="regulteh2">Rented</h2>

                <p className="redgultedettxt">
                  This property is rented and will start paying rent once
                  transfer is complete.
                </p>
              </div>{" "}
              <div className="ml-3">
                <h2 className="regulteh2">Projected annual rent</h2>
                <p className="redgultedettxt">AED 57,000</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            <Financials data={data} />
          </div>
          <div>
            <Timeline data={data} />
          </div>
          <Location location={data?.location} />
          <div>
            <h2 className="regulteh2 pt-5">Amenities</h2>
            <div className="d-flex mt-3">
              {data?.amenities.map((ame, i) => (
                <div className="d-flex mr-2" key={i}>
                  <AmenitiesIcon />
                  <div className="ml-2">
                    <h4 className="oiuytre34567">{firstLetterCaps(ame)}</h4>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="regulteh2 pt-5">
              Documents ({data?.documents?.length || 0})
            </h2>
            {data?.documents.map((docs, i) => (
              <div
                key={i}
                className="d-flex justify-content-between align-items-center xdhtkuj678i8675 mt-3"
              >
                <>
                  <div className="d-flex">
                    <DocumentIcon />
                    <p className="dfgtyui876543 pl-2 pt-1">
                      Projections - Sobha Creek Vista B1010 (Listing)
                    </p>
                  </div>
                  <div>
                    <a className="pointer" href={docs} target="_blank" download>
                      <DonwloadIcon />
                    </a>
                  </div>
                </>
              </div>
            ))}
          </div>
          <>
            <ChatSection />
          </>
        </div>
      </>
    </div>
  );
};

export default Overview;
