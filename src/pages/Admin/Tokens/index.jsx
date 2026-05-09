import { useState } from "react";
import Tokenadmin from "../../../assets/images/tokenadmin.png";
import { useFinaliseSale, useGetAlLToken } from "../../../hooks/useToken";
import StartSaleModal from "../../../components/Modals/StartSaleModal";
import Button from "../../../components/Button";
import CountdownTimer from "../../../components/Timer";
import { handleCopyCommon } from "../../../utils/copyClipboard";
import Input from "../../../components/Input";
import TokenSkeleton from "../../../components/Skeleton/TokenSkeleton";
import "./tokenadmin.css";
import Paginate from "../../../components/Pagination/Index";
import { SearchIcon } from "../../../components/Icons/Icons";

const Index = () => {
  const [query, setSearchQuery] = useState("");
  const [loadingState, setLoadingState] = useState({});
  const [finalizedSales, setFinalizedSales] = useState({});
  const [skip, setSkip] = useState(0);
  const { data, isLoading } = useGetAlLToken(skip, query);
  const { mutate } = useFinaliseSale();
  const [startModal, setStartModal] = useState(false);
  const [details, setDetails] = useState();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFinalizeSale = (saleId) => {
    setLoadingState((prev) => ({ ...prev, [saleId]: true }));

    mutate(saleId, {
      onSuccess: () => {
        setFinalizedSales((prev) => ({ ...prev, [saleId]: true }));
      },
      onSettled: () => {
        setLoadingState((prev) => ({ ...prev, [saleId]: false }));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container-fluid main-container">
        {[...Array(5)].map((_, index) => (
          <TokenSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-xl-6 mt-4 position-relative">
          <SearchIcon />
          <Input
            htmlFor="search"
            placeholder="Search"
            type="text"
            className="pl-5"
            value={query}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="main-title-09888 pt-3">Tokens</div>
      </div>
      {!isLoading &&
        (data?.data?.data?.length > 0 ? (
          <>
            {data?.data?.data?.map((token, index) => (
              <div
                className="mt-2 token-cardlidsting position-relative"
                key={token?._id}
              >
                <div>
                  <span className="ml-3">{skip + index + 1}</span>
                </div>
                <div className="d-flex">
                  <div>
                    <img
                      src={token?.icon || Tokenadmin}
                      height={60}
                      width={60}
                    />
                  </div>
                  <div className="my-auto mx-2">
                    <h1 className="token-headingadmin">{token?.name || "-"}</h1>
                  </div>
                </div>
                <div>
                  <p className="token-textadmin">Supply</p>
                  <h1
                    style={{ fontSize: "14px" }}
                    className="token-headingadmin"
                  >
                    USDT {token?.supply || 0}
                  </h1>{" "}
                </div>
                <div>
                  <p className="token-textadmin">Associated Property</p>
                  <h1
                    style={{ fontSize: "14px" }}
                    className="token-headingadmin"
                  >
                    {token?.property?.propertyNumber || "-"}
                  </h1>
                </div>
                <div>
                  <p className="token-textadmin">Transaction Hash</p>
                  <h1
                    style={{ fontSize: "14px" }}
                    className="token-headingadmin"
                    onClick={() =>
                      handleCopyCommon(
                        token?.txHash,
                        "Transaction Hash, has been  "
                      )
                    }
                  >
                    {token?.txHash ? (
                      <>
                        {`${token?.txHash?.slice(
                          0,
                          6
                        )}...${token?.txHash?.slice(-6)}`}
                        <a
                          href={`https://sepolia.etherscan.io/tx/${token?.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: "5px" }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="external-link-icon"
                          >
                            <g id="Interface / External_Link">
                              <path
                                id="Vector"
                                d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </a>
                      </>
                    ) : (
                      "-"
                    )}
                  </h1>
                </div>
                <div>
                  <h1 className="maintokensaleadmin">
                    USDT 150
                    <span className="token-textadmin pl-2">Per Token</span>
                  </h1>
                </div>
                {token?.isSaleCreated ? (
                  // in below replace 27 with the Sale Duration in Days when sale created.

                  new Date(token?.sale?.saleEndTime * 1000) > new Date() ? (
                    <div>
                      <div>
                        <h4 className="saleEnds">Sale ends in:</h4>
                      </div>
                      <CountdownTimer
                        startDate={new Date()}
                        endDate={new Date(token?.sale?.saleEndTime * 1000)}
                      />
                    </div>
                  ) : finalizedSales[token?.sale?._id] ||
                    token?.sale?.isSaleFinalized ? (
                    <div>
                      <h4 className="saleEnds">Finalized</h4>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Button
                        className={"finaliseSale"}
                        text={"Finalize Sale"}
                        isLoading={loadingState[token?.sale?._id] || false}
                        disabled={loadingState[token?.sale?._id] || false}
                        onClick={() => handleFinalizeSale(token?.sale?._id)}
                      />
                    </div>
                  )
                ) : new Date(token?.property?.latestFundDate) > new Date() ? (
                  <div>
                    <CountdownTimer
                      startDate={new Date(
                        token?.property?.latestFundDate
                      ).getTime()}
                      endDate={new Date()}
                    />
                  </div>
                ) : (
                  <Button
                    text={"Start Sale"}
                    onClick={() => {
                      setDetails(token);
                      setStartModal(true);
                    }}
                  />
                )}
              </div>
            ))}

            <div className="d-flex justify-content-center mt-4">
              <Paginate
                setSkip={setSkip}
                data={data?.data}
                skip={skip}
                limit={10}
              />
            </div>
          </>
        ) : (
          <div className="col-12 d-flex align-items-center justify-content-center my-3">
            <p className="nodata">No tokens found</p>
          </div>
        ))}

      {startModal && (
        <StartSaleModal
          show={startModal}
          handleClose={() => setStartModal(false)}
          details={details}
        />
      )}
    </div>
  );
};

export default Index;
