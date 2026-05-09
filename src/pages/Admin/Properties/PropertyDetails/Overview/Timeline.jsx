import { fundedDateFormate, guaranteedDate } from "../../../../../utils/date";

const Timeline = ({ data }) => {
  return (
    <>
      <div>
        <h2 className="regulteh2 pt-5">Funding Timeline</h2>
        {data?.isTokenCreated && (
          <p className="df3nffmer4u78 mt-3">
            The timeline is an estimate. Actual dates may vary
          </p>
        )}
      </div>
      {!data?.isTokenCreated ? (
        <div className="gapp comingCont">
          <div>
            <svg
              width="65"
              height="59"
              viewBox="0 0 65 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.3962 1.93877V3.87754H34.4601H36.5239V5.4911V7.10465L36.1862 7.1797C35.9861 7.20472 35.4982 7.27977 35.0855 7.31729C33.8597 7.44238 31.5957 7.99273 30.0447 8.53059C23.8531 10.657 18.4621 15.3851 15.6603 21.1639L14.9473 22.6273H7.4799L0 22.6398V24.5786V26.5174H6.82947C12.9585 26.5174 13.6589 26.5424 13.5839 26.7175C13.4463 27.0677 13.0085 29.7945 13.0085 30.2823V30.7701H9.13098H5.25344V32.7089V34.6477H9.11847H12.971L13.0585 35.6108C13.1336 36.4489 13.3212 37.5496 13.5714 38.6128L13.6339 38.9005H6.81696H0V40.8392V42.778H7.4799H14.9598L15.2975 43.566C16.6734 46.7306 19.7504 50.5831 22.7399 52.8846C27.1428 56.2743 31.9959 58.038 37.5246 58.2506C41.8774 58.4132 45.8425 57.5752 49.7326 55.6739C57.4001 51.9215 62.616 44.7543 63.8543 36.2612C64.0919 34.5476 64.1045 30.8952 63.8543 29.1691C63.2414 24.8413 61.6028 20.8637 59.0011 17.3489C58.1005 16.1231 55.9616 13.8966 54.6983 12.8584C51.2335 10.0316 46.9057 8.08029 42.6529 7.45488C41.8649 7.3298 41.0269 7.21723 40.8142 7.1797L40.4014 7.11716V5.50361V3.87754H42.5278H44.6542V1.93877V3.8147e-06H38.5252H32.3962V1.93877ZM36.5239 18.4246V25.8544L35.4357 26.3923C33.572 27.3054 32.2086 28.9439 31.7083 30.8327C31.4706 31.7708 31.4706 33.622 31.7083 34.5226C32.3212 36.8241 34.0348 38.6128 36.3988 39.4008C37.437 39.751 39.2632 39.776 40.3389 39.4758C42.6279 38.8004 44.4166 37.0993 45.1921 34.8603C45.2671 34.6602 45.7424 34.6477 52.7095 34.6477H60.1394L60.0768 35.173C59.0011 44.254 52.3718 51.6588 43.3659 53.8478C42.703 54.0104 41.7523 54.1855 41.277 54.2355L40.4014 54.3231V51.1085V47.9064H38.4627H36.5239V51.1085V54.3231L35.7484 54.2355C32.6714 53.8853 29.2817 52.6094 26.3923 50.6957C24.5786 49.4824 21.9519 46.9057 20.7386 45.1546C19.2501 43.0032 18.1994 40.7767 17.574 38.4627C17.2363 37.2619 16.8861 35.4232 16.8861 34.9229V34.6477H20.1382H23.3903V32.7089V30.7701H20.1257H16.8485L16.9361 29.9821C17.499 24.9038 20.4009 19.5628 24.4535 16.1606C27.7807 13.3587 31.7083 11.6576 36.0861 11.0948C36.2988 11.0697 36.4739 11.0322 36.4989 11.0197C36.5114 11.0197 36.5239 14.3469 36.5239 18.4246ZM42.703 11.395C44.6167 11.7827 46.1802 12.3206 48.094 13.2712C50.408 14.4094 51.884 15.4851 53.7852 17.3864C57.4001 21.0012 59.1762 24.6286 60.1018 30.3073L60.1769 30.7701L52.722 30.7451L45.2671 30.7076L44.992 30.0197C44.2915 28.2935 42.8781 26.8801 41.1519 26.1796L40.464 25.9045L40.4265 18.4621L40.4014 11.0322L40.9268 11.0948C41.227 11.1323 42.015 11.2699 42.703 11.395ZM39.8511 29.8696C40.9768 30.4449 41.5772 31.4456 41.5897 32.7089C41.5897 33.4469 41.5397 33.6846 41.252 34.1599C40.6141 35.2481 39.6885 35.8109 38.5252 35.8109C36.1862 35.8235 34.6852 33.3844 35.7234 31.2955C36.4864 29.7695 38.3751 29.1191 39.8511 29.8696Z"
                fill="#BE170F"
              />
            </svg>
          </div>
          <div>
            <h2 className="comingsoon">Coming Soon</h2>
          </div>
        </div>
      ) : (
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot red"></div>
            <div className="timeline-content">
              <h4>Latest funding date</h4>
              <p className="date">
                {fundedDateFormate(data?.latestFundDate) || "-"}
              </p>
              <p className="description">
                This is a conservative estimate for the closing date of the
                property funding.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot gray"></div>
            <div className="timeline-content">
              <h4>Ownership documents distributed</h4>
              <p className="date">
                {fundedDateFormate(data?.documentsDistribution) || "-"}
              </p>
              <p className="description">
                Your Property Share Certificates will be issued 2 weeks after
                the property is funded.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot gray"></div>
            <div className="timeline-content">
              <h4>Expected first rental payment</h4>
              <p className="date">
                {" "}
                {fundedDateFormate(data?.expectRentalPayment) || "-"}{" "}
              </p>
              <div className="guaranteed">
                <span className="badge">
                  Guaranteed by{" "}
                  {guaranteedDate(data?.expectRentalPayment, 30) || "-"}
                </span>
              </div>
              <p className="description">
                We project that the first rental payment will be paid by{" "}
                {fundedDateFormate(data?.expectRentalPayment) || "-"}, with a
                guaranteed payment date no later than{" "}
                {guaranteedDate(data?.expectRentalPayment, 30) || "-"}.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
