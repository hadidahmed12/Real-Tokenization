import { useGetAlLToken } from "../../../hooks/useToken";
import Skeleton from "react-loading-skeleton";

const Payments = () => {
  const { data, isLoading } = useGetAlLToken();

  return (
    <div className="container-fluid main-container">
      <div className="d-flex justify-content-between">
        <div className="main-title-09888 pt-3">Transactions</div>
      </div>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <div className="mt-5 token-cardlidsting" key={i}>
            <div className="d-flex">
              <div className="ml-2">
                <Skeleton width={50} height={20} />
              </div>
            </div>
            <div>
              <p className="token-textadmin">Sender</p>
              <Skeleton width={80} height={20} />
            </div>
            <div>
              <p className="token-textadmin">Sent From</p>
              <Skeleton width={120} height={20} />
            </div>
            <div>
              <p className="token-textadmin">Sent To</p>
              <Skeleton width={120} height={20} />
            </div>
            <div>
              <p className="token-textadmin">Transaction Hash</p>
              <Skeleton width={150} height={20} />
            </div>
            <div>
              <p className="token-textadmin">Payment</p>
              <Skeleton width={100} height={20} />
            </div>
          </div>
        ))
      ) : data?.data?.data?.length > 0 ? (
        data.data.data.map((transaction, i) => (
          <div className="mt-5 token-cardlidsting" key={i}>
            <div className="d-flex">
              <div className="ml-2">
                <h1 style={{ fontSize: "14px" }} className="token-headingadmin">
                  {i + 1}
                </h1>
              </div>
            </div>
            <div>
              <p className="token-textadmin">Sender</p>
              <h1
                style={{ fontSize: "14px" }}
                className="token-headingadmin pt-2"
              >
                {transaction.sender || "N/A"}
              </h1>
            </div>
            <div>
              <p className="token-textadmin">Sent From</p>
              <h1
                style={{ fontSize: "14px" }}
                className="token-headingadmin pt-2"
              >
                {transaction.sentFrom || "N/A"}
              </h1>
            </div>
            <div>
              <p className="token-textadmin">Sent To</p>
              <h1
                style={{ fontSize: "14px" }}
                className="token-headingadmin pt-2"
              >
                {transaction.sentTo || "N/A"}
              </h1>
            </div>
            <div>
              <p className="token-textadmin">Transaction Hash</p>
              <h1
                style={{ fontSize: "14px" }}
                className="maintokensaleadmin pt-2"
              >
                {transaction.transactionHash || "N/A"}
              </h1>
            </div>
            <div>
              <p className="token-textadmin">Payment</p>
              <h1
                style={{ fontSize: "14px" }}
                className="token-headingadmin pt-2"
              >
                {transaction.payment || "N/A"}
              </h1>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3 nodata">No transactions found</p>
      )}
    </div>
  );
};

export default Payments;
